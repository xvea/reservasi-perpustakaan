function SearchFilter({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
  totalResults,
}) {
  const adaFilter = search.trim() !== "" || category !== "Semua";

  const resetFilter = () => {
    onSearchChange("");
    onCategoryChange("Semua");
  };

  const fieldClass =
    "min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-800 focus-visible:outline-3 focus-visible:outline-emerald-600";

  return (
    <section
      aria-label="Pencarian dan filter buku"
      className="grid grid-cols-1 items-end gap-3 md:grid-cols-[2fr_1fr_auto]"
    >
      <div className="flex min-w-0 flex-col gap-1">
        <label htmlFor="cari-buku" className="text-sm font-semibold text-gray-700">
          Cari nama buku
        </label>
        <input
          id="cari-buku"
          type="search"
          value={search}
          placeholder="Contoh: react"
          autoComplete="off"
          onChange={(e) => onSearchChange(e.target.value)}
          className={fieldClass}
        />
      </div>

      <div className="flex min-w-0 flex-col gap-1">
        <label htmlFor="filter-kategori" className="text-sm font-semibold text-gray-700">
          Kategori
        </label>
        <select
          id="filter-kategori"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className={fieldClass}
        >
          {categories.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={resetFilter}
        disabled={!adaFilter}
        className="min-h-11 rounded-lg border border-emerald-700 px-4 py-2 font-semibold text-emerald-700 hover:bg-emerald-50 focus-visible:outline-3 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400 disabled:hover:bg-transparent"
      >
        Atur ulang
      </button>

      <p className="text-sm text-gray-500 md:col-span-3" role="status" aria-live="polite">
        {totalResults === 0
          ? "Tidak ada buku yang cocok dengan pencarian atau filter."
          : `${totalResults} buku ditemukan`}
      </p>
    </section>
  );
}

export default SearchFilter;
