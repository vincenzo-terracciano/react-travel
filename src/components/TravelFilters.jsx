import SearchBar from "./SearchBar";

export default function TravelFilters({ categories, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery, sortOrder, setSortOrder }) {

    return (
        <>
            <div className="d-flex justify-content-between mb-4">

                {/* Selezione categoria */}
                <select
                    className="form-select w-auto"
                    value={selectedCategory || ""}
                    onChange={(e) => setSelectedCategory(e.target.value || null)}>
                    <option value="">Tutte le categorie</option>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                    ))}
                </select>

                {/* Search bar */}
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

                {/* Selezione ordinamento */}
                <select
                    className="form-select w-auto"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="desc">Più recenti</option>
                    <option value="asc">Meno recenti</option>
                </select>
            </div>
        </>
    )
}