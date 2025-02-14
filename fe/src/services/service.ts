const API_URL = 'http://localhost:5001'; // Cambia esto por la URL correcta de tu API si es otro puerto

export const getDailyMemories = async () => {
  try {
    const response = await fetch(`${API_URL}/memo`);
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

// En tu servicio `uploadImage`
export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error al subir la imagen.");
    }

    return await response.json(); // Devuelve el JSON ya procesado
  } catch (error) {
    console.error("Error en la subida:", error);
    return null;
  }
};
