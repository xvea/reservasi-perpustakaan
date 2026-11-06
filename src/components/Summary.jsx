function Summary({ reservations }) {
  const totalEksemplar = reservations.reduce(
    (total, book) => total + book.jumlah,
    0
  );

  const sisaBatas = 3 - totalEksemplar;

  const totalJaminan = reservations.reduce(
    (total, book) => total + book.harga * book.jumlah,
    0
  );

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
      <h2 className="text-xl font-bold text-gray-800 mb-5">
        Ringkasan Reservasi
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-500">
            Total Eksemplar
          </span>
          <span className="font-bold text-gray-800">
            {totalEksemplar}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500">
            Sisa Batas Peminjaman
          </span>
          <span className="font-bold text-blue-600">
            {sisaBatas} / 3
          </span>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-500 mb-2">
            Total Uang Jaminan
          </p>

          <h3 className="text-2xl font-bold text-blue-600">
            Rp{totalJaminan.toLocaleString("id-ID")}
          </h3>
        </div>
      </div>
    </section>
  );
}

export default Summary;
