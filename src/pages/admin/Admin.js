import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Navbar from '../../Components/admin-section/navbar/Navbar';
import styles from './Admin.module.scss';
import Home from '../../Components/admin-section/home/Home';
import ViewProducts from '../../Components/admin-section/viewProducts/ViewProducts';
import AddProduct from '../../Components/admin-section/addProduct/AddProduct';
import Orders from '../../Components/admin-section/orders/Orders';

const Admin = () => {
  
  return (
    <div className={styles.admin}>
       <div className={styles.navbar}>
        <Navbar/>
       </div>
       <div className={styles.content}>
        <Routes>
          <Route path="home" element={<Home/>} />
          <Route path="all-products" element={<ViewProducts/>} />
          <Route path="add-product/:id" element={<AddProduct/>} />
          <Route path="orders" element={<Orders/>} />
        </Routes>
       </div>
    </div>
  )
}

export default Admin
