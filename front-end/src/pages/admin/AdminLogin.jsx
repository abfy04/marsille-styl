import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import { Store, Eye, EyeOff } from 'lucide-react';
import { useLogin } from '../../hooks/useLogin';

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login, isLoading, isError, error, data } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });



  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
    console.log('data', data);
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5ab8ee] via-[#5ab8ee] to-[#5ab8ee] flex items-center justify-center px-2">
      <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-8 w-full max-w-xs sm:max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center mb-4">
            <Store className="h-10 w-10 sm:h-12 sm:w-12 text-[#5ab8ee]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">لوحة الإدارة</h1>
          <p className="text-xs sm:text-base text-gray-600">مرحبا بك ف إدارة مارسيليا ستايل</p>
        </div>

        {/* Error message */}
        {isError && (
          <div className="mb-4 text-center text-red-600 font-bold bg-red-50 py-2 rounded-lg">
            اسم المستخدم أو كلمة المرور غير صحيحة
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              اسم المستخدم
            </label>
            <input
              id="phone"
              type="text"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ab8ee] focus:border-transparent"
              placeholder="دخل اسم المستخدم"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              كلمة السر
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ab8ee] focus:border-transparent"
                placeholder="دخل كلمة السر"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#5ab8ee] text-white py-3 rounded-lg hover:bg-[#4aa3d9] transition-colors duration-200 font-medium"
          >
            {isLoading ? 'كايشحن...' : 'دخول'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            باش ترجع للموقع الرئيسي،{' '}
            <button
              onClick={() => navigate('/')}
              className="text-[#5ab8ee] hover:text-[#4aa3d9] font-medium"
            >
              كليك هنا
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;