import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';


import AdminNavbar from './AdminNavbar';

const AdminLayout= () => {
   const data  =JSON.parse(localStorage.getItem('data'))
;
  if (!data?.token && data?.user?.role !== 'admin' ) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;