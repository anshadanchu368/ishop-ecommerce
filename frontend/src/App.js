import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Header from './component/layout/Header/Header.js'
import WebFont from 'webfontloader'
import React  from 'react'
import Footer from './component/layout/Footer/footer';
import Home from './component/layout/home/Home';
import ProductDetails from './component/Product/ProductDetails.js';
import ProductFilter from './component/Product/ProductFilter.js';
import Search from './component/Product/Search'
import LoginSIgnup from './component/User/LoginSIgnup';


function App() {
  React.useEffect(() =>{

    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    })

},[])
  return (
<Router>
   <Header/>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/products/:id"  element={<ProductDetails/>}/>
    <Route path="/products" element={<ProductFilter/>}/>
    <Route path="/products/:keyword" element={<ProductFilter/>}/>
    <Route path="/search" element={<Search/>}/>
    <Route path="/login" element={<LoginSIgnup/>}/>
   </Routes>
    <Footer/>
</Router>
  );
}

export default App;
