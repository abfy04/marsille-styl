import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProduct, updateProduct, deleteProduct } from '../../store/slices/productsSlice';
import { Plus, Edit2, Trash2, Tag, Filter, Search } from 'lucide-react';

const AdminProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories.categories);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [offeredFilter, setOfferedFilter] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleDelete = (id) => {
    if (window.confirm('واش متأكد بغيتي تحيد هاد البرودوي؟')) {
      dispatch(deleteProduct(id));
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.categorie_name : 'ما كيناش';
  };

  // Filtering logic
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.product_name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === '' || p.categorie_id === categoryFilter;
    const matchesOffered =
      offeredFilter === 'all' ? true :
      offeredFilter === 'offered' ? p.is_offered :
      !p.is_offered;
    const matchesMinPrice = minPrice === '' || Number(p.price) >= Number(minPrice);
    const matchesMaxPrice = maxPrice === '' || Number(p.price) <= Number(maxPrice);
    return matchesSearch && matchesCategory && matchesOffered && matchesMinPrice && matchesMaxPrice;
  });

  return (
    <div className="space-y-6">
      {/* Add Button */}
      <div className="flex w-full justify-end mb-2">
        <button
          onClick={() => navigate('/admin/products/add')}
          className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2 text-base font-bold shadow"
        >
          <Plus className="h-5 w-5" />
          زيد برودوي
        </button>
      </div>

      {/* Search Bar + Filter Toggle */}
      <div className="flex w-full justify-center mb-2 gap-2">
        <div className="relative w-full max-w-md">
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="h-5 w-5" />
          </span>
          <input
            type="text"
            placeholder="قلب على البرودوي..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-gray-300 pl-4 pr-10 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-200 text-base shadow-sm"
          />
        </div>
        {/* Mobile: show filter button next to search */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setShowFilters(v => !v)}
            className="flex items-center gap-1 bg-gray-100 px-4 py-2 rounded-lg text-gray-700 border border-gray-200 shadow-sm ml-2"
          >
            <Filter className="h-4 w-4" />
            فلتر
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-2">
        {/* Filter Card */}
        <div className={`transition-all ${showFilters ? 'block' : 'hidden'} md:block`}> 
          <div className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row gap-4 md:items-end justify-center">
            {/* Category Filter */}
            <div className="flex flex-col min-w-[140px]">
              <label className="mb-1 text-xs font-bold text-gray-700">الكاطيݣوري</label>
              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="border rounded-lg px-2 py-1 focus:ring-2 focus:ring-blue-200"
              >
                <option value="">الكل</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.categorie_name}</option>
                ))}
              </select>
            </div>
            {/* Offered Filter */}
            <div className="flex flex-col min-w-[140px]">
              <label className="mb-1 text-xs font-bold text-gray-700">برومو</label>
              <div className="flex gap-2 mt-1">
                <label className="flex items-center gap-1 text-xs cursor-pointer">
                  <input
                    type="radio"
                    name="offered"
                    value="all"
                    checked={offeredFilter === 'all'}
                    onChange={() => setOfferedFilter('all')}
                    className="accent-blue-600"
                  />
                  الكل
                </label>
                <label className="flex items-center gap-1 text-xs cursor-pointer">
                  <input
                    type="radio"
                    name="offered"
                    value="offered"
                    checked={offeredFilter === 'offered'}
                    onChange={() => setOfferedFilter('offered')}
                    className="accent-blue-600"
                  />
                  فيه برومو
                </label>
                <label className="flex items-center gap-1 text-xs cursor-pointer">
                  <input
                    type="radio"
                    name="offered"
                    value="not_offered"
                    checked={offeredFilter === 'not_offered'}
                    onChange={() => setOfferedFilter('not_offered')}
                    className="accent-blue-600"
                  />
                  ما فيهش برومو
                </label>
              </div>
            </div>
            {/* Price Range Filter */}
            <div className="flex flex-col min-w-[160px]">
              <label className="mb-1 text-xs font-bold text-gray-700">الثمن</label>
              <div className="flex gap-2 mt-1">
                <input
                  type="number"
                  min="0"
                  placeholder="من"
                  value={minPrice}
                  onChange={e => setMinPrice(e.target.value)}
                  className="border rounded-lg px-2 py-1 w-20 focus:ring-2 focus:ring-blue-200"
                />
                <input
                  type="number"
                  min="0"
                  placeholder="حتى"
                  value={maxPrice}
                  onChange={e => setMaxPrice(e.target.value)}
                  className="border rounded-lg px-2 py-1 w-20 focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 hidden md:table-header-group">
              <tr>
                <th className="px-2 md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  البرودوي
                </th>
                <th className="hidden sm:table-cell px-2 md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  الكاطيݣوري
                </th>
                <th className="px-2 md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  الثمن
                </th>
                <th className="hidden sm:table-cell px-2 md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  الستوك
                </th>
                <th className="hidden md:table-cell px-2 md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  الحالة
                </th>
                <th className="px-2 md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  الإجراءات
                </th>
                <th className="px-2 md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  البرومو
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <React.Fragment key={product.id}>
                  {/* Desktop/tablet row */}
                  <tr className="hidden md:table-row hover:bg-gray-50">
                    <td className="px-2 md:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={product.product_img}
                          alt={product.product_name}
                          className="h-10 w-10 md:h-12 md:w-12 rounded-lg object-cover"
                        />
                        <div className="mr-2 md:mr-4">
                          <div className="text-xs md:text-sm font-medium text-gray-900">
                            {product.product_name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {product.sizes.length > 0 && `القياسات: ${product.sizes.join(', ')}`}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell px-2 md:px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {getCategoryName(product.categorie_id)}
                      </span>
                    </td>
                    <td className="px-2 md:px-6 py-4 whitespace-nowrap">
                      <div className="text-xs md:text-sm text-gray-900">
                        {product.is_offered ? (
                          <div>
                            <span className="font-bold text-red-600">{product.offered_price} د.م</span>
                            <span className="text-gray-400 line-through ml-2">{product.price} د.م</span>
                          </div>
                        ) : (
                          <span className="font-bold">{product.price} د.م</span>
                        )}
                      </div>
                    </td>
                    <td className="hidden sm:table-cell px-2 md:px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        product.quantity > 10 
                          ? 'bg-green-100 text-green-800' 
                          : product.quantity > 0 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.quantity}
                      </span>
                    </td>
                    <td className="hidden md:table-cell px-2 md:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        {product.is_offered && (
                          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                            برومو
                          </span>
                        )}
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          product.quantity > 0 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.quantity > 0 ? 'كاين' : 'سالا'}
                        </span>
                      </div>
                    </td>
                    <td className="px-2 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm font-medium">
                      <div className="flex flex-col md:flex-row items-start md:items-center space-y-1 md:space-y-0 md:space-x-2 rtl:space-x-reverse">
                        <button
                          onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                          className="text-blue-600 hover:text-blue-900 transition-colors duration-200 flex items-center gap-1"
                        >
                          <Edit2 className="h-4 w-4" /> <span className="hidden sm:inline">بدل</span>
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-900 transition-colors duration-200 flex items-center gap-1"
                        >
                          <Trash2 className="h-4 w-4" /> <span className="hidden sm:inline">حيد</span>
                        </button>
                      </div>
                    </td>
                    <td className="px-2 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm font-medium">
                      {!product.is_offered ? (
                        <button
                          onClick={() => navigate(`/admin/products/${product.id}/offer`)}
                          className="text-green-600 hover:text-green-900 transition-colors duration-200 flex items-center gap-1"
                        >
                          <Tag className="h-4 w-4" /> <span className="hidden sm:inline">زيد برومو</span>
                        </button>
                      ) : (
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() => navigate(`/admin/products/${product.id}/offer`)}
                            className="text-yellow-600 hover:text-yellow-900 transition-colors duration-200 flex items-center gap-1"
                          >
                            <Tag className="h-4 w-4" /> <span className="hidden sm:inline">بدل البرومو</span>
                          </button>
                          <button
                            onClick={() => navigate(`/admin/products/${product.id}/offer?delete=1`)}
                            className="text-red-600 hover:text-red-900 transition-colors duration-200 flex items-center gap-1"
                          >
                            <Trash2 className="h-4 w-4" /> <span className="hidden sm:inline">حيد البرومو</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                  {/* Mobile card row */}
                  <tr className="md:hidden">
                    <td colSpan={7} className="p-0 border-0">
                      <div className="bg-white rounded-lg shadow mb-4 p-4 flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                          <img src={product.product_img} alt={product.product_name} className="h-12 w-12 rounded-lg object-cover" />
                          <div>
                            <div className="font-bold">{product.product_name}</div>
                            <div className="text-xs text-gray-500">{product.sizes.length > 0 && `القياسات: ${product.sizes.join(', ')}`}</div>
                          </div>
                        </div>
                        <div><span className="font-bold">الكاطيݣوري:</span> {getCategoryName(product.categorie_id)}</div>
                        <div>
                          <span className="font-bold">الثمن:</span>{' '}
                          {product.is_offered ? (
                            <>
                              <span className="text-red-600 font-bold">{product.offered_price} د.م</span>
                              <span className="text-gray-400 line-through ml-2">{product.price} د.م</span>
                            </>
                          ) : (
                            <span>{product.price} د.م</span>
                          )}
                        </div>
                        <div><span className="font-bold">الستوك:</span> {product.quantity}</div>
                        <div className="flex gap-2 flex-wrap mt-2">
                          <button onClick={() => navigate(`/admin/products/edit/${product.id}`)} className="flex-1 flex items-center justify-center gap-1 bg-blue-100 text-blue-700 rounded-lg py-2 px-2 text-sm font-medium"><Edit2 className="h-4 w-4" /> بدل</button>
                          <button onClick={() => handleDelete(product.id)} className="flex-1 flex items-center justify-center gap-1 bg-red-100 text-red-700 rounded-lg py-2 px-2 text-sm font-medium"><Trash2 className="h-4 w-4" /> حيد</button>
                          {!product.is_offered ? (
                            <button onClick={() => navigate(`/admin/products/${product.id}/offer`)} className="flex-1 flex items-center justify-center gap-1 bg-green-100 text-green-700 rounded-lg py-2 px-2 text-sm font-medium"><Tag className="h-4 w-4" /> زيد برومو</button>
                          ) : (
                            <>
                              <button onClick={() => navigate(`/admin/products/${product.id}/offer`)} className="flex-1 flex items-center justify-center gap-1 bg-yellow-100 text-yellow-700 rounded-lg py-2 px-2 text-sm font-medium"><Tag className="h-4 w-4" /> بدل البرومو</button>
                              <button onClick={() => navigate(`/admin/products/${product.id}/offer?delete=1`)} className="flex-1 flex items-center justify-center gap-1 bg-red-200 text-red-800 rounded-lg py-2 px-2 text-sm font-medium"><Trash2 className="h-4 w-4" /> حيد البرومو</button>
                            </>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;