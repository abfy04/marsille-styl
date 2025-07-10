import React from 'react';
import { useSelector } from 'react-redux';
import { Package, Tag, ShoppingCart } from 'lucide-react';

const AdminDashboard = () => {
  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories.categories);

  const totalProducts = products.length;
  const totalCategories = categories.length;
  const offeredProducts = products.filter(product => product.is_offered).length;
  const lowStockProducts = products.filter(product => product.quantity < 10).length;

  const stats = [
    {
      title: 'عدد البرودويات',
      value: totalProducts,
      icon: Package,
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      title: 'عدد الكاطيݣوريات',
      value: totalCategories,
      icon: Tag,
      color: 'bg-green-500',
      change: '+5%',
    },
    {
      title: 'إجمالي الستوك',
      value: products.reduce((sum, product) => sum + product.quantity, 0),
      icon: ShoppingCart,
      color: 'bg-purple-500',
      change: '+8%',
    },
    {
      title: 'عدد البرودويات لي فيهم برومو',
      value: offeredProducts,
      icon: Tag,
      color: 'bg-yellow-400',
      change: '',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">لوحة الإدارة</h1>
        <div className="text-xs sm:text-sm text-gray-500">
          آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                {stat.change && <p className="text-sm text-green-600 mt-1">{stat.change}</p>}
              </div>
              <div className={`${stat.color} p-3 rounded-full text-white`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4  lg:gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">إجراءات سريعة</h3>
          <div className="space-y-3">
            <button className="w-full bg-blue-50 text-blue-700 py-3 px-4 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-right">
              زيد برودوي
            </button>
            <button className="w-full bg-green-50 text-green-700 py-3 px-4 rounded-lg hover:bg-green-100 transition-colors duration-200 text-right">
              زيد كاطيݣوري
            </button>
            <button className="w-full bg-purple-50 text-purple-700 py-3 px-4 rounded-lg hover:bg-purple-100 transition-colors duration-200 text-right">
              زيد برومو
            </button>
          </div>
        </div>


      </div>
    </div>
  );
};

export default AdminDashboard;