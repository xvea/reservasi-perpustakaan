function Summary({ reservations }) {

  const totalEksemplar = reservations.reduce(
    (total, book) => total + book.jumlah,
    0
  );

  const sisaBatas = 3 - totalEksemplar;

  const totalJaminan = reservations.reduce(
    (total, book) => total + (book.harga * book.jumlah),
    0
  );

  return (
    <div className="summary-container">
      <h2>Ringkasan Reservasi</h2>

      <div>
        <p>Total Eksemplar</p>
        <h3>{totalEksemplar}</h3>
      </div>

      <div>
        <p>Sisa Batas Peminjaman</p>
        <h3>{sisaBatas}</h3>
      </div>

      <div>
        <p>Total Uang Jaminan</p>
        <h3>
          Rp{totalJaminan.toLocaleString("id-ID")}
        </h3>
      </div>
    </div>
  );
}

export default Summary;