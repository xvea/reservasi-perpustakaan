import React from 'react';

export default function BookCard({ book, onAddReservation }) {
  const isOutOfStock = book.stok === 0;

  return (
    <div className="book-card">
      <div className="book-card-header">
        <span className="book-category">{book.kategori}</span>
      </div>
      
      <div className="book-card-body">
        <h3 className="book-title">{book.nama}</h3>
        <p className="book-info">
          Jaminan: <strong>Rp {book.harga.toLocaleString('id-ID')}</strong>
        </p>
        <p className="book-info">
          Sisa Ketersediaan: <strong className={isOutOfStock ? 'text-danger' : ''}>{book.stok}</strong>
        </p>
      </div>

      <div className="book-card-footer">
        <button
          onClick={() => onAddReservation(book)}
          disabled={isOutOfStock}
          className={`btn-add ${isOutOfStock ? 'disabled' : ''}`}
        >
          {isOutOfStock ? 'Habis' : 'Tambah'}
        </button>
      </div>
    </div>
  );
}