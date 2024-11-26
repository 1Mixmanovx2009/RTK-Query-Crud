import React from 'react';
import { useGetItemsQuery, useDeleteItemMutation } from '../features/apiSlice';

const ItemList = () => {
  const { data: items, isLoading, isError, error } = useGetItemsQuery();
  const [deleteItem] = useDeleteItemMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  // items ni bo'sh yoki undefined bo'lishini tekshirish
  if (!items || items.length === 0) {
    return <div>No items available</div>;
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="p-4 border rounded-md flex justify-between items-center"
        >
          <div>
            <h2 className="text-lg font-bold">{item.name}</h2>
            <p>{item.description}</p>
          </div>
          <button
            onClick={() => deleteItem(item.id)}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
