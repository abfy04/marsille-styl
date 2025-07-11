import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useCategories } from '../../hooks/useCategories';

const AdminCategories = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const { categories = [], isLoading, deleteCategory, isDeleting } = useCategories();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);

  const handleDeleteClick = (id) => {
    setToDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    deleteCategory(toDeleteId);
    setShowDeleteModal(false);
  };

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().startsWith(search.toLowerCase())
  );

  const BACKEND_URL = 'http://localhost:8000/'; // Change to your backend URL in production
  function getImageUrl(image) {
    if (!image) return '/no-image.png';
    if (image.startsWith('http')) return image;
    if (image.startsWith('storage/')) return BACKEND_URL + image;
    return image;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h1 className="text-3xl font-bold text-gray-900">الكاطيݣوريات</h1>
        <div className="flex-1 flex justify-center md:justify-end">
          <input
            type="text"
            placeholder="قلب على الكاطيݣوري..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border px-3 py-2 rounded-lg w-full max-w-xs md:max-w-sm"
          />
        </div>
        <button
          onClick={() => navigate('/admin/categories/add')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 rtl:space-x-reverse"
        >
          <Plus className="h-5 w-5" />
          <span>زيد كاطيݣوري</span>
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">الصورة</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">الكاطيݣوري</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">المقاسات</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCategories.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-400 text-lg">ما كاين حتى كاطيݣوري</td>
              </tr>
            ) : (
              filteredCategories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={getImageUrl(category.image)} alt={category.name} className="h-12 w-12 rounded-lg object-cover" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold">{category.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-600">{Array.isArray(JSON.parse(category.sizes)) && JSON.parse(category.sizes).length > 0 ? JSON.parse(category.sizes).join(', ') : ' --- '}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button onClick={() => navigate(`/admin/categories/edit/${category.id}`)} className="flex items-center gap-1 text-blue-600 hover:text-blue-900"><Edit2 className="h-4 w-4" /> <span className="hidden sm:inline">بدل</span></button>
                      <button onClick={() => handleDeleteClick(category.id)} className="flex items-center gap-1 text-red-600 hover:text-red-900"><Trash2 className="h-4 w-4" /> <span className="hidden sm:inline">حيد</span></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-lg">ما كاين حتى كاطيݣوري</div>
        ) : (
          filteredCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <img src={getImageUrl(category.image)} alt={category.name} className="h-12 w-12 rounded-lg object-cover" />
                <div>
                  <div className="font-bold">{category.name}</div>
                  <div className="text-xs text-gray-500">{Array.isArray(category.sizes) && category.sizes.length > 0 && `المقاسات: ${category.sizes.join(', ')}`}</div>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap mt-2">
                <button onClick={() => navigate(`/admin/categories/edit/${category.id}`)} className="flex-1 flex items-center justify-center gap-1 bg-blue-100 text-blue-700 rounded-lg py-2 px-2 text-sm font-medium"><Edit2 className="h-4 w-4" /> بدل</button>
                <button onClick={() => handleDeleteClick(category.id)} className="flex-1 flex items-center justify-center gap-1 bg-red-100 text-red-700 rounded-lg py-2 px-2 text-sm font-medium"><Trash2 className="h-4 w-4" /> حيد</button>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4 text-center">بغيت بصح تحيد هاد الكاطيݣوري؟</h3>
            <div className="flex gap-3">
              <button onClick={handleDeleteConfirm} disabled={isDeleting} className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">ايه، حيد</button>
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400">لا، رجع</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;