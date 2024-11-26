import React from 'react';
import ItemList from './components/ItemList';
import "./App.css"

const App = () => {
  return (
    <>

      <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-[50px]">CRUD Application with RTK Query</h1>
        <ItemList />
      </div>
    </>

  );
};

export default App;
