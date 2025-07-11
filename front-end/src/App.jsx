import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import './i18n';

// Client Components
import ClientLayout from './components/client/ClientLayout';
import HomePage from './pages/client/HomePage';
import CategoryPage from './pages/client/CategoryPage';
import ProductDetailPage from './pages/client/ProductDetailPage';
import CartPage from './pages/client/CartPage';

// Admin Components
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCategories from './pages/admin/AdminCategories';
import AdminProducts from './pages/admin/AdminProducts';
import AdminLogin from './pages/admin/AdminLogin';
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';
import AddCategory from './pages/admin/AddCategory';
import EditCategory from './pages/admin/EditCategory';
import ProductOfferPage from './pages/admin/ProductOfferPage';

function App() {
  // Always RTL for Darija
  React.useEffect(() => {
    document.dir = 'rtl';
    document.documentElement.lang = 'ar';
  }, []);




  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            {/* Client Routes */}
            <Route path="/" element={<ClientLayout />}>
              <Route index element={<HomePage />} />
              <Route path="category/:categoryId" element={<CategoryPage />} />
              <Route path="product/:productId" element={<ProductDetailPage />} />
              <Route path="cart" element={<CartPage />} />
            </Route>
            <Route path="/login" element={<AdminLogin />} />

            {/* Admin Routes */}
           
         

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="categories/add" element={<AddCategory />} />
              <Route path="categories/edit/:id" element={<EditCategory />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/add" element={<AddProduct />} />
              <Route path="products/edit/:id" element={<EditProduct />} />
              <Route path="products/:id/offer" element={<ProductOfferPage />} />
            </Route>
            
             
              

          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;