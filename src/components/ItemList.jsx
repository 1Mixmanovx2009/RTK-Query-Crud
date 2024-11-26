import React, { useState } from 'react';
import {
  useGetItemsQuery,
  useDeleteItemMutation,
} from '../api/apiSlice';
import ItemForm from './ItemForm';

const ItemList = () => {
  const { data: items, isLoading, isError, error } = useGetItemsQuery();
  const [deleteItem] = useDeleteItemMutation();
  const [selectedItem, setSelectedItem] = useState(null); 
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-4 flex flex-col items-center">
      <button
        onClick={() => {
          setSelectedItem(null);
          setIsFormOpen(true);
        }}
        className="w-[350px] px-4 py-2 bg-green-500 text-white rounded-md "
      >
        Add New Item
      </button>

      {isFormOpen && (
        <ItemForm
          existingItem={selectedItem}
          onFormClose={() => setIsFormOpen(false)}
        />
      )}

      {items.map((item) => (
        <div
          key={item.id}
          className="w-[500px] p-4 border rounded-md flex justify-between items-center"
        >
          <div>
            <h2 className="text-lg font-bold">{item.name}</h2>
            <p>{item.description}</p>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => {
                setSelectedItem(item);
                setIsFormOpen(true);
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Edit
            </button>
            <button
              onClick={() => deleteItem(item.id)}
              className="px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
