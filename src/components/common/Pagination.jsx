export default function Pagination({
    currentPage,
    totalPages,
    onPageChange
}) {
    return (
        <div className="flex justify-center gap-2 mt-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
            >
                Previous
            </button>
            <span className="px-3 py-1">
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
}
