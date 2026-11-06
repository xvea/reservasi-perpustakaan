function ReservationList({
  reservations,
  error,
}) {
  return (
    <div className="reservation-container">
      <h2>Daftar Reservasi</h2>

      {reservations.length === 0 ? (
        <p>Belum ada buku yang dipilih.</p>
      ) : (
        reservations.map((book) => (
          <div key={book.id} className="reservation-item">

            <div>
              <h3>{book.nama}</h3>
              <p>{book.kategori}</p>
              <p>
                Jaminan: Rp{book.harga.toLocaleString("id-ID")}
              </p>
            </div>

            <div className="quantity-control">
              <button onClick={() => onDecrease(book.id)}>
                -
              </button>

              <span>{book.jumlah}</span>

              <button onClick={() => onIncrease(book.id)}>
                +
              </button>
            </div>

            <button onClick={() => onRemove(book.id)}>
              Hapus
            </button>

          </div>
        ))
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default ReservationList;