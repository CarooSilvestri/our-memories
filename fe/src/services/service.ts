const API_URL = 'http://localhost:5001/memo'; // Cambia esto por la URL correcta de tu API si es otro puerto

export const getDailyMemories = async () => {
  try {
    const response = await fetch(`${API_URL}`);
    if (!response.ok) {
      throw new Error('Error al obtener los usuarios');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error; 
  }
};



export const uploadImage = async (event) =>{
  const file = event.target.files[0];
  if (!file) return;

  const fileName = `${Date.now()}-${file.name}`; // Nombre único

  const { data, error } = await supabase.storage
    .from('images') // Nombre de tu bucket en Supabase
    .upload(fileName, file);

  if (error) {
    console.error("Error al subir la imagen:", error);
  } else {
    console.log("Imagen subida con éxito:", data);
  }
}
