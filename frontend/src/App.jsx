import {Routes, Route} from 'react-router-dom' ;
import HomePage from './pages/home/Home.jsx'
import ShopPage from './pages/shop/Shop.jsx'
import ProductManagement from './pages/admin/ProductManagement.jsx'
function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/shop' element={<ShopPage/>}/>
        <Route path="/admin/products" element={<ProductManagement/>}/>
      </Routes>
      
{/* 
      <Routes>  
        
      </Routes> */}
    </div>
  );
}

export default App;
