import { useState, useContext } from 'react';
import { MenuContext } from '../../context/MenuContext';
import MenuCard from './MenuCard';
import Button from '../common/Button';
import MenuForm from './MenuForm';

export default function MenuGrid() {
    const { filteredItems, error } = useContext(MenuContext);
    const [showAddForm, setShowAddForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Menu Items</h2>
                <Button onClick={() => setShowAddForm(true)}>Add New Item</Button>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            {showAddForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <MenuForm onClose={() => setShowAddForm(false)} />
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentItems.map(item => (
                    <MenuCard key={item.id} item={item} />
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center gap-2">
                <Button
                    variant="secondary"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <span className="px-4 py-2">
                    Page {currentPage} of {totalPages}
                </span>
                <Button
                    variant="secondary"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
