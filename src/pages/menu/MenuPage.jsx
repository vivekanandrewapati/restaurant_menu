import { useContext } from 'react';
import { MenuContext } from '../../context/MenuContext';
import MenuGrid from '../../components/menu/MenuGrid';
import SearchBar from '../../components/common/SearchBar';
import { categories } from '../../data/menuItems';

export default function MenuPage() {
    const {
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy
    } = useContext(MenuContext);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <SearchBar value={searchQuery} onChange={setSearchQuery} />
                    </div>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 border rounded-md"
                    >
                        <option value="name">Sort by Name</option>
                        <option value="price">Sort by Price</option>
                    </select>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full whitespace-nowrap ${selectedCategory === category
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <MenuGrid />
            </div>
        </div>
    );
}
