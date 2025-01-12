import { createContext, useState, useContext } from 'react';
import { menuItems as initialMenuItems } from '../data/menuItems';

export const MenuContext = createContext();

export function MenuProvider({ children }) {
    const [menuItems, setMenuItems] = useState(initialMenuItems);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('name');
    const [error, setError] = useState(null);

    const filteredItems = menuItems
        .filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (selectedCategory === 'All' || item.category === selectedCategory)
        )
        .sort((a, b) => {
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            if (sortBy === 'price') return a.price - b.price;
            return 0;
        });

    const handleError = (error) => {
        setError(error.message);
        setTimeout(() => setError(null), 3000);
    };

    const addMenuItem = (item) => {
        try {
            setMenuItems(prev => [...prev, { ...item, id: Date.now() }]);
        } catch (error) {
            handleError(error);
        }
    };

    const updateMenuItem = (id, updates) => {
        try {
            setMenuItems(prev =>
                prev.map(item => item.id === id ? { ...item, ...updates } : item)
            );
        } catch (error) {
            handleError(error);
        }
    };

    const deleteMenuItem = (id) => {
        try {
            setMenuItems(prev => prev.filter(item => item.id !== id));
        } catch (error) {
            handleError(error);
        }
    };

    const value = {
        menuItems,
        setMenuItems,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,
        filteredItems,
        error,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem
    };

    return (
        <MenuContext.Provider value={value}>
            {children}
        </MenuContext.Provider>
    );
}
