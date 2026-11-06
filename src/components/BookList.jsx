import React from 'react';
import BookCard from './BookCard';

export default function BookList({ books, onAddReservation }) {
  return (
    <section className="bg-white rounded-xl p-4 sm:p-6 shadow-md mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 border-b border-slate-200 pb-3 gap-2">
        <h2 className="text-xl font-bold text-slate-800">Katalog Buku</h2>
        <span className="text-sm text-slate-500">Menampilkan {books.length} hasil</span>
      </div>

      {books.length === 0 ? (
        <div className="text-center py-10 text-slate-500">
          <p>Tidak ada data buku yang cocok dengan pencarian atau filter Anda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onAddReservation={onAddReservation}
            />
          ))}
        </div>
      )}
    </section>
  );
}