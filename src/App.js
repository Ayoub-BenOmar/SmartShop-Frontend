import './App.css';
import ProtectedRoute from "./routes/ProtectedRoute";
import { Route, Routes, Navigate } from "react-router-dom";
import UserList from "./features/clients/UserList";
import LoginPage from "./features/auth/LoginPage";
import AdminDashboard from "./features/admin/AdminDashboard";
import ProductCatalog from "./features/products/ProductCatalog";
import AddProduct from "./features/products/AddProduct";
import EditProduct from "./features/products/EditProduct";
import AddClient from "./features/clients/AddClient";
import OrdersPage from "./features/orders/OrdersPage";
import AdminLayout from "./components/layout/AdminLayout";
import ClientLayout from "./components/layout/ClientLayout";
import ClientProfile from "./features/clients/ClientProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute allowedRoles={['CLIENT']} />}>
        <Route element={<ClientLayout />}>
          <Route path="/catalog" element={<ProductCatalog />} />
          <Route path="/profile" element={<ClientProfile />} />
        </Route>
      </Route>

      {/* Admin */}
      {/* Admin */}
      <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserList />} />
          <Route path="/admin/users/new" element={<AddClient />} />
          <Route path="/admin/products" element={<ProductCatalog />} />
          <Route path="/admin/products/new" element={<AddProduct />} />
          <Route path="/admin/products/edit/:id" element={<EditProduct />} />
          <Route path="/admin/orders" element={<OrdersPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
