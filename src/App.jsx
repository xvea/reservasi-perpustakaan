import { useEffect, useMemo, useState } from "react";
import { fetchBooks } from "./services/bookService";

function App() {
  const [books, setBooks] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchBooks();
        setBooks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  const categories = useMemo(() => {
    return [
      "Semua",
      ...new Set(books.map((book) => book.kategori)),
    ];
  }, [books]);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchSearch = book.nama
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        category === "Semua" || book.kategori === category;

      return matchSearch && matchCategory;
    });
  }, [books, search, category]);

  const totalReserved = reservations.reduce(
    (total, book) => total + book.jumlah,
    0
  );

  const handleAdd = (book) => {
    if (book.stok === 0) {
      setError("Buku tersebut tidak tersedia");
      return;
    }

    if (totalReserved >= 3) {
      setError("Maksimal reservasi 3 eksemplar");
      return;
    }

    const existingReservation = reservations.find(
      (item) => item.id === book.id
    );

    if (existingReservation) {
      if (existingReservation.jumlah >= book.stok) {
        setError("Jumlah reservasi melebihi stok buku");
        return;
      }

      setReservations((prev) =>
        prev.map((item) =>
          item.id === book.id
            ? {
                ...item,
                jumlah: item.jumlah + 1,
              }
            : item
        )
      );

      setError("");
      return;
    }

    setReservations((prev) => [
      ...prev,
      {
        ...book,
        jumlah: 1,
      },
    ]);

    setError("");
  };

  const handleIncrease = (bookId) => {
    if (totalReserved >= 3) {
      setError("Maksimal reservasi 3 eksemplar");
      return;
    }

    setReservations((prev) =>
      prev.map((item) => {
        if (item.id !== bookId) {
          return item;
        }

        if (item.jumlah >= item.stok) {
          setError("Jumlah reservasi melebihi stok buku");
          return item;
        }

        return {
          ...item,
          jumlah: item.jumlah + 1,
        };
      })
    );

    setError("");
  };

  const handleDecrease = (bookId) => {
    setReservations((prev) =>
      prev
        .map((item) =>
          item.id === bookId
            ? {
                ...item,
                jumlah: item.jumlah - 1,
              }
            : item
        )
        .filter((item) => item.jumlah > 0)
    );

    setError("");
  };

  const handleRemove = (bookId) => {
    setReservations((prev) =>
      prev.filter((item) => item.id !== bookId)
    );

    setError("");
  };

  return null;
}

export default App;