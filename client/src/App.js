import './App.css'
import AddProductForm from './featuers/product/addProductForm';
import UpdateProductForm from './featuers/product/updateProductForm';
import ProductList from './featuers/product/productList'
import { BrowserRouter as Router ,Route,Routes } from 'react-router-dom';
import Layout from './commponents/Layout'
import BasketList from './featuers/basket/basketList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pay from './featuers/pay/pay'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { loadBasket } from './featuers/basket/basketSlice'
import Sale from './featuers/sale/sale'
import UpdateUser from './featuers/auth/updateUser'
import AuthPage from './featuers/auth/authPage'

function App() {
  //שומר את הסל קניות אחרי טעינה
  const dispatch=useDispatch()
  useEffect(()=>{
  dispatch(loadBasket())
  },[dispatch])

  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}>
         <Route index element={<AuthPage/>}/>
         <Route path='/register' element={<AuthPage/>}/>
          <Route path='/update' element={<UpdateUser />} />
          <Route path='/home' element={<ProductList/>}/>
          <Route path='/add-product-form' element={<AddProductForm/>}/>
          <Route path='/update-product-form' element={<UpdateProductForm/>}/>
          <Route path='/product-list' element={<ProductList/>}/>
          <Route path='/basket' element={<BasketList/>}/>
          <Route path='/pay' element={<Pay />}/>
          <Route path='/sale' element={<Sale/>}/>
        </Route>
      </Routes>
    </Router>

    <ToastContainer position="top-right" autoClose={2000} />

    </div>
  );
}
export default App;
