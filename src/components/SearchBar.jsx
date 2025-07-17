export default function SearchBar({ searchQuery, setSearchQuery }) {

    return (
        <>
            <div className="search-bar-container">
                <i className="fas fa-search search-icon"></i>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Cerca viaggio..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </>
    )
}