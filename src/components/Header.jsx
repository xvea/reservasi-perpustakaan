function Header({ jumlahDipilih, batasMaks = 3 }) {
  return (
    <header className="bg-emerald-900 text-emerald-50">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-5 md:px-8 md:py-6">
        <div className="flex min-w-0 items-center gap-3.5">
          <span
            aria-hidden="true"
            className="grid size-11 flex-none place-items-center rounded-xl bg-amber-300 text-emerald-900"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
              <path d="M4 5.5v16" />
              <path d="M9 7.5h7" />
            </svg>
          </span>
          <div className="min-w-0">
            <h1 className="text-xl font-bold leading-tight md:text-2xl">
              Reservasi Buku Perpustakaan
            </h1>
            <p className="mt-0.5 text-sm text-emerald-100/80">
              Pilih buku yang ingin dipinjam, lalu lihat uang jaminannya.
            </p>
          </div>
        </div>

        <p
          className="whitespace-nowrap rounded-full border border-emerald-50/35 px-3.5 py-1.5 text-sm"
          aria-live="polite"
        >
          Dipilih <strong className="text-amber-300">{jumlahDipilih}</strong>{" "}
          dari {batasMaks} eksemplar
        </p>
      </div>
    </header>
  );
}

export default Header;
