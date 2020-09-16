import React from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Switch, Redirect } from "react-router-dom";
import Header from './components/header/header';
import Home from './components/home/home';
import Footer from './components/footer/footer';
import MenuPage from './components/menu/menupage';
import About from './components/aboutus/aboutus';
import Registration from './components/regsitration/registration';
import Contact from './components/contact/contact';
import Login from './components/login/login';
import { ToastContainer } from 'react-toastify';
import SubCategory from './components/subcategory/subcategory';
import Product from './components/Product/product';
import Cart from './components/cart/cart'
import 'react-widgets/dist/css/react-widgets.css';
import { DropdownList } from 'react-widgets'

function App() {
  return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/merchants" component={MenuPage} />
          <Route path="/about-us" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Registration} />
          <Route path="/contact" component={Contact} />
          <Route path="/subcategories/:catgoryid/:merchantid" component={SubCategory} />
          <Route path="/product/:subcategoryid" component={Product} />
          <Route path="/cart" component={Cart} />

          <Redirect path="*" component={Home} />
        </Switch>
        <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
