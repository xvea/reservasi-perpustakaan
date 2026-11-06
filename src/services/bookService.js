export const fetchBooks = async () => {
  try {
    const response = await fetch("/data/perpustakaan.json");

    if (!response.ok) {
      throw new Error("Data buku gagal diambil");
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Data buku tidak valid");
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};