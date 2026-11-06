import React from 'react';

export default function BookCard({ book, onAddReservation }) {
  const isOutOfStock = book.stok === 0;

  return (
    <div className="border border-slate-200 rounded-xl p-4 flex flex-col justify-between bg-white shadow-sm hover:shadow-md transition">
      <div>
        <span className="inline-block bg-sky-100 text-sky-800 text-xs font-semibold px-2.5 py-1 rounded-full mb-2">
          {book.kategori}
        </span>
        <h3 className="text-lg font-bold text-slate-900 mb-1">{book.nama}</h3>
        <p className="text-sm text-slate-600 mb-1">
          Jaminan: <strong className="text-slate-800">Rp {book.harga.toLocaleString('id-ID')}</strong>
        </p>
        <p className="text-sm text-slate-600">
          Sisa Ketersediaan: <strong className={isOutOfStock ? 'text-red-500 font-semibold' : 'text-slate-800'}>{book.stok}</strong>
        </p>
      </div>

      <div className="mt-4">
        <button
          onClick={() => onAddReservation(book)}
          disabled={isOutOfStock}
          className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition ${
            isOutOfStock
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isOutOfStock ? 'Habis' : 'Tambah'}
        </button>
      </div>
    </div>
  );
}