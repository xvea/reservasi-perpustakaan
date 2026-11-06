import { useEffect, useMemo, useState } from "react";
import { fetchBooks } from "./services/bookService";
import Header from "./components/Header";
import SearchFilter from "./components/SearchFilter";
import BookList from "./components/BookList";
import ReservationList from "./components/ReservationList";
import Summary from "./components/Summary";

function App() {
  const [books, setBooks] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");

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

  useEffect(() => {
    loadBooks();
  }, []);

  const categories = useMemo(() => {
    return [
      "Semua",
      ...new Set(books.map((book) => book.kategori)),
    ];
  }, [books]);

  const totalReserved = reservations.reduce(
    (total, book) => total + book.jumlah,
    0
  );

  const filteredBooks = useMemo(() => {
    return books
      .map((book) => {
        const reservation = reservations.find(
          (item) => item.id === book.id
        );

        const jumlahDipilih = reservation
          ? reservation.jumlah
          : 0;

        return {
          ...book,
          stok: book.stok - jumlahDipilih,
        };
      })
      .filter((book) => {
        const matchSearch = book.nama
          .toLowerCase()
          .includes(search.toLowerCase());

        const matchCategory =
          category === "Semua" || book.kategori === category;

        return matchSearch && matchCategory;
      });
  }, [books, reservations, search, category]);

  const handleAddReservation = (book) => {
    const originalBook = books.find(
      (item) => item.id === book.id
    );

    if (!originalBook) {
      return;
    }

    const existingReservation = reservations.find(
      (item) => item.id === book.id
    );

    const currentQuantity = existingReservation
      ? existingReservation.jumlah
      : 0;

    if (originalBook.stok === 0) {
      setError("Buku tersebut tidak tersedia.");
      return;
    }

    if (totalReserved >= 3) {
      setError("Maksimal reservasi adalah 3 eksemplar.");
      return;
    }

    if (currentQuantity >= originalBook.stok) {
      setError("Jumlah reservasi melebihi stok buku.");
      return;
    }

    if (existingReservation) {
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
    } else {
      setReservations((prev) => [
        ...prev,
        {
          ...originalBook,
          jumlah: 1,
        },
      ]);
    }

    setError("");
  };

  const handleIncrease = (bookId) => {
    const originalBook = books.find(
      (book) => book.id === bookId
    );

    const reservation = reservations.find(
      (book) => book.id === bookId
    );

    if (!originalBook || !reservation) {
      return;
    }

    if (totalReserved >= 3) {
      setError("Maksimal reservasi adalah 3 eksemplar.");
      return;
    }

    if (reservation.jumlah >= originalBook.stok) {
      setError("Jumlah reservasi melebihi stok buku.");
      return;
    }

    setReservations((prev) =>
      prev.map((item) =>
        item.id === bookId
          ? {
              ...item,
              jumlah: item.jumlah + 1,
            }
          : item
      )
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

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header jumlahDipilih={totalReserved} />

      <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-8">
        {loading ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
            <p className="text-sm text-gray-500">
              Memuat data buku...
            </p>
          </div>
        ) : error && books.length === 0 ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6">
            <p className="text-sm text-red-700">{error}</p>

            <button
              type="button"
              onClick={loadBooks}
              className="mt-4 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
            >
              Coba Lagi
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <SearchFilter
              search={search}
              onSearchChange={setSearch}
              category={category}
              onCategoryChange={setCategory}
              categories={categories}
              totalResults={filteredBooks.length}
            />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
              <BookList
                books={filteredBooks}
                onAddReservation={handleAddReservation}
              />

              <div className="space-y-6">
                <ReservationList
                  reservations={reservations}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                  onRemove={handleRemove}
                  error={error}
                />

                <Summary reservations={reservations} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;