import React, { useState, useEffect } from 'react';
import { useAddItemMutation, useUpdateItemMutation } from '../api/apiSlice';

const ItemForm = ({ existingItem, onFormClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [addItem] = useAddItemMutation();
  const [updateItem] = useUpdateItemMutation();

  useEffect(() => {
    if (existingItem) {
      setName(existingItem.name);
      setDescription(existingItem.description);
    }
  }, [existingItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (existingItem) {
        await updateItem({ id: existingItem.id, name, description });
      } else {
        await addItem({ name, description });
      }
      onFormClose(); 
    } catch (error) {
      console.error('Failed to save the item:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded-md space-y-4 flex items-center gap-4 bg-gray-100"
    >
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className=''>
        <label className="block text-sm font-medium">Age</label>
        <input
          className="w-full p-2 border rounded-md mb-4" 
          type='number'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white h-[40px] rounded-md"
      >
        {existingItem ? 'Update Item' : 'Add Item'}
      </button>
    </form>
  );
};

export default ItemForm;
