import React from 'react';
import BookCard from './BookCard';

export default function BookList({ books, onAddReservation }) {
  return (
    <section className="book-list-section">
      <div className="book-list-header">
        <h2>Katalog Buku</h2>
        <span className="results-count">Menampilkan {books.length} hasil</span>
      </div>

      {books.length === 0 ? (
        <div className="empty-catalog">
          <p>Tidak ada data buku yang cocok dengan pencarian atau filter Anda.</p>
        </div>
      ) : (
        <div className="book-grid">
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