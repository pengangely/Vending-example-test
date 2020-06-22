import React from 'react';
import Products from './stores/Products';
import Vendor from './containers/Vendor';
import Pay from './containers/Pay';

function App() {
  return (
    <Products>
      <Vendor />
      <Pay />
    </Products>
  );
}

export default App;
