export default function TravelPagination({ currentPage, lastPage, handlePageChange }) {

    return (
        <>
            <div className="d-flex justify-content-center mt-5">
                <ul className="pagination-custom">
                    <li onClick={() => handlePageChange(currentPage - 1)} className={currentPage === 1 ? 'disabled' : ''}>
                        &laquo;
                    </li>
                    {Array.from({ length: lastPage }, (_, i) => (
                        <li
                            key={i + 1}
                            onClick={() => handlePageChange(i + 1)}
                            className={currentPage === i + 1 ? 'active' : ''}
                        >
                            {i + 1}
                        </li>
                    ))}
                    <li onClick={() => handlePageChange(currentPage + 1)} className={currentPage === lastPage ? 'disabled' : ''}>
                        &raquo;
                    </li>
                </ul>
            </div>
        </>
    )
}