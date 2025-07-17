export default function CategoryFilterDisplay({ selectedCategory, setSelectedCategory }) {

    return (
        <>
            <div className="text-center mb-4">
                <p className="fs-5">
                    Viaggi filtrati per Categoria: <strong>{selectedCategory}</strong>
                </p>
                <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => setSelectedCategory(null)}>
                    Rimuovi filtro
                </button>
            </div>
        </>
    )
}