import { Request, Response } from 'express';
import supabase from './supabase';

export const getDailyMemories = async (req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('daily_memory')
      .select('id, title, description, day, img, month_id(id, number, label)'); 

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    const groupedData = data.reduce((acc, item) => {
      const monthKey = item.month_id.number; // Clave del mes (ej: "01", "02")
    
      if (!acc[monthKey]) {
        acc[monthKey] = {
          month: item.month_id, // Guardar datos del mes
          dates: [],
        };
      }
    
      // Agregar fecha sin `month_id`
      const { month_id, ...dateWithoutMonth } = item;
      acc[monthKey].dates.push(dateWithoutMonth);
    
      return acc;
    }, {});
    
    // Convertir a array y ordenar
    const sortedData = Object.values(groupedData)
      .sort((a, b) => a.month.number - b.month.number) // Ordenar meses
      .map((monthData) => ({
        ...monthData,
        dates: monthData.dates.sort((a, b) => a.day - b.day), // Ordenar fechas dentro del mes
      })); 

    res.json(Object.values(sortedData));
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


export async function uploadImage(file: File) {
  if (!file) return null;
  const fileName = `${Date.now()}-${file.name}`
  const { data, error } = await supabase
    .storage
    .from('images')
    .upload(fileName, file);

  if (error) {
    console.error("Error al subir la imagen:", error);
    return null;
  }

  return data.path;
}

export async function getImageUrl(filePath: string) {
  const { data } = supabase.storage.from('images').getPublicUrl(filePath);
  return data.publicUrl;
}
