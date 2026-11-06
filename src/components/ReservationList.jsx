
function ReservationList({
    reservations,
    onIncrease,
    onDecrease,
    onRemove,
    error
}) {
    return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-800">
          Daftar Reservasi
        </h2>
        <span className="text-sm text-gray-500">
          {reservations.length} Judul
        </span>
      </div>

      {reservations.length === 0 ? (
        <div className="text-center py-10">
          <div className="text-4xl mb-3">📚</div>
          <p className="text-gray-500 font-medium">
            Belum ada buku yang dipilih
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Silakan pilih buku dari katalog.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reservations.map((book) => (
            <div
              key={book.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4 last:border-0"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">
                  {book.nama}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {book.kategori}
                </p>

                <p className="text-sm font-medium text-blue-600 mt-2">
                  Rp{book.harga.toLocaleString("id-ID")} / eksemplar
                </p>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4">
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => onDecrease(book.id)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-l-lg"
                    aria-label={`Kurangi ${book.nama}`}
                  >
                    −
                  </button>

                  <span className="px-3 font-semibold text-gray-800">
                    {book.jumlah}
                  </span>

                  <button
                    onClick={() => onIncrease(book.id)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-r-lg"
                    aria-label={`Tambah ${book.nama}`}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => onRemove(book.id)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Hapus
                </button>
              </div>

              <p className="text-sm font-bold text-gray-800 sm:hidden">
                Subtotal: Rp
                {(book.harga * book.jumlah).toLocaleString("id-ID")}
              </p>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 text-sm">
          {error}
        </div>
      )}
    </section>
  );
}

export default ReservationList;
