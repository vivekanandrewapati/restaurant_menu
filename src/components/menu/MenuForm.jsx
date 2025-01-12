import { useContext, useState } from 'react';
import { MenuContext } from '../../context/MenuContext';
import Input from '../common/Input';
import Button from '../common/Button';

export default function MenuForm({ item = null, onClose }) {
    const { addMenuItem, updateMenuItem } = useContext(MenuContext);
    const [formData, setFormData] = useState({
        name: item?.name || '',
        price: item?.price || '',
        category: item?.category || 'Pizza',
        description: item?.description || '',
        image: item?.image || ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const menuItem = {
            ...formData,
            price: parseFloat(formData.price)
        };

        if (item) {
            updateMenuItem(item.id, menuItem);
        } else {
            addMenuItem(menuItem);
        }
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-bold mb-4">
                {item ? 'Edit Menu Item' : 'Add New Menu Item'}
            </h3>

            <Input
                placeholder="Item Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
            />

            <Input
                type="number"
                step="0.01"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
            />

            <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border rounded-md"
                required
            >
                <option value="Pizza">Pizza</option>
                <option value="Burgers">Burgers</option>
                <option value="Salads">Salads</option>
                <option value="Drinks">Drinks</option>
                <option value="Desserts">Desserts</option>
            </select>

            <Input
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
            />

            <Input
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                required
            />

            <div className="flex justify-end gap-2">
                <Button type="button" variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button type="submit">
                    {item ? 'Update' : 'Add'}
                </Button>
            </div>
        </form>
    );
}
