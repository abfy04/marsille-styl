import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../../hooks/useCategories';
import { useProducts } from '../../hooks/useProducts';
import { Plus, Edit2, Trash2, Tag, Filter, Search, Eye, EyeOff } from 'lucide-react';

const AdminProducts = () => {
  const navigate = useNavigate();
  const { categories = [], isLoading: categoriesLoading, isError: categoriesError } = useCategories();
  const { products = [], isLoading: productsLoading, isError: productsError, deleteProduct, isDeleting, updateProduct } = useProducts();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [offeredFilter, setOfferedFilter] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);
  const [toggleProductId, setToggleProductId] = useState(null);

  const handleDeleteClick = (id) => {
    setToDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    deleteProduct(toDeleteId);
    setShowDeleteModal(false);
  };

  const handleToggleShow = (product) => {
    setToggleProductId(product.id);
    // You should implement updateProduct mutation in useProducts
    // Here we just toggle isShow and call updateProduct
    updateProduct({ id: product.id, updatedProduct: { ...product, isShow: !product.isShow } });
    setTimeout(() => setToggleProductId(null), 500);
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.categorie_name : 'ما كيناش';
  };

  // Filtering logic
  const filteredProducts = (products || []).filter((p) => {
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
                <th className="px-4 md:px-8 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">البرودوي</th>
                <th className="hidden sm:table-cell px-4 md:px-8 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">الكاطيݣوري</th>
                <th className="px-4 md:px-8 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">الثمن</th>
                <th className="hidden sm:table-cell px-4 md:px-8 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">الستوك</th>
                <th className="hidden md:table-cell px-4 md:px-8 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">الحالة</th>
                <th className="px-4 md:px-8 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">إظهار</th>
                <th className="px-4 md:px-8 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">الإجراءات</th>
                <th className="px-4 md:px-8 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">البرومو</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.length === 0 ? (
                <tr className="hidden md:table-row">
                  <td colSpan={8} className="text-center py-12 text-gray-400 text-lg font-bold">ما كاين حتى برودوي</td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <React.Fragment key={product.id}>
                    {/* Desktop/tablet row */}
                    <tr className="hidden md:table-row hover:bg-blue-50 transition-colors group">
                      <td className="px-4 md:px-8 py-5 whitespace-nowrap align-middle">
                        <div className="flex items-center gap-4">
                          <img
                            src={product.product_img}
                            alt={product.product_name}
                            className="h-14 w-14 rounded-lg object-cover border border-gray-200 shadow-sm group-hover:scale-105 transition-transform"
                          />
                          <div>
                            <div className="text-base font-bold text-gray-900">{product.product_name}</div>
                            <div className="text-xs text-gray-500">{product.sizes.length > 0 && `القياسات: ${product.sizes.join(', ')}`}</div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell px-4 md:px-8 py-5 whitespace-nowrap align-middle">
                        <span className="px-3 py-1 text-xs font-semibold bg-blue-50 text-blue-700 rounded-full border border-blue-100">{getCategoryName(product.categorie_id)}</span>
                      </td>
                      <td className="px-4 md:px-8 py-5 whitespace-nowrap align-middle">
                        <div className="text-base text-gray-900">
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
                      <td className="hidden sm:table-cell px-4 md:px-8 py-5 whitespace-nowrap align-middle">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${product.quantity > 10 ? 'bg-green-100 text-green-800' : product.quantity > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{product.quantity}</span>
                      </td>
                      <td className="hidden md:table-cell px-4 md:px-8 py-5 whitespace-nowrap align-middle">
                        <div className="flex items-center gap-2">
                          {product.is_offered && (
                            <span className="px-3 py-1 text-xs font-bold bg-red-100 text-red-800 rounded-full">برومو</span>
                          )}
                          <span className={`px-3 py-1 text-xs font-bold rounded-full ${product.quantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{product.quantity > 0 ? 'كاين' : 'سالا'}</span>
                        </div>
                      </td>
                      <td className="px-4 md:px-8 py-5 whitespace-nowrap align-middle text-center">
                        <button
                          onClick={() => handleToggleShow(product)}
                          className={`p-2 rounded-full border ${product.isShow ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'} hover:bg-green-200 hover:text-green-900 transition`}
                          disabled={toggleProductId === product.id}
                          title={product.isShow ? 'إخفاء' : 'إظهار'}
                        >
                          {product.isShow ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                        </button>
                      </td>
                      <td className="px-4 md:px-8 py-5 whitespace-nowrap align-middle text-xs md:text-sm font-medium">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                          <button
                            onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                            className="text-blue-600 hover:text-blue-900 transition-colors duration-200 flex items-center gap-1 px-3 py-1 rounded-lg hover:bg-blue-100"
                          >
                            <Edit2 className="h-4 w-4" /> <span className="hidden sm:inline">بدل</span>
                          </button>
                          <button
                            onClick={() => handleDeleteClick(product.id)}
                            className="text-red-600 hover:text-red-900 transition-colors duration-200 flex items-center gap-1 px-3 py-1 rounded-lg hover:bg-red-100"
                          >
                            <Trash2 className="h-4 w-4" /> <span className="hidden sm:inline">حيد</span>
                          </button>
                        </div>
                      </td>
                      <td className="px-4 md:px-8 py-5 whitespace-nowrap align-middle text-xs md:text-sm font-medium">
                        {!product.is_offered ? (
                          <button
                            onClick={() => navigate(`/admin/products/${product.id}/offer`)}
                            className="text-green-600 hover:text-green-900 transition-colors duration-200 flex items-center gap-1 px-3 py-1 rounded-lg hover:bg-green-100"
                          >
                            <Tag className="h-4 w-4" /> <span className="hidden sm:inline">زيد برومو</span>
                          </button>
                        ) : (
                          <div className="flex flex-col gap-1">
                            <button
                              onClick={() => navigate(`/admin/products/${product.id}/offer`)}
                              className="text-yellow-600 hover:text-yellow-900 transition-colors duration-200 flex items-center gap-1 px-3 py-1 rounded-lg hover:bg-yellow-100"
                            >
                              <Tag className="h-4 w-4" /> <span className="hidden sm:inline">بدل البرومو</span>
                            </button>
                            <button
                              onClick={() => navigate(`/admin/products/${product.id}/offer?delete=1`)}
                              className="text-red-600 hover:text-red-900 transition-colors duration-200 flex items-center gap-1 px-3 py-1 rounded-lg hover:bg-red-200"
                            >
                              <Trash2 className="h-4 w-4" /> <span className="hidden sm:inline">حيد البرومو</span>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                    {/* Mobile card row */}
                    <tr className="md:hidden">
                      <td colSpan={8} className="p-0 border-0">
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
                            <button onClick={() => handleDeleteClick(product.id)} className="flex-1 flex items-center justify-center gap-1 bg-red-100 text-red-700 rounded-lg py-2 px-2 text-sm font-medium"><Trash2 className="h-4 w-4" /> حيد</button>
                            <button
                              onClick={() => handleToggleShow(product)}
                              className={`flex-1 flex items-center justify-center gap-1 ${product.isShow ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'} rounded-lg py-2 px-2 text-sm font-medium`}
                              disabled={toggleProductId === product.id}
                              title={product.isShow ? 'إخفاء' : 'إظهار'}
                            >
                              {product.isShow ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />} {product.isShow ? 'إخفاء' : 'إظهار'}
                            </button>
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
                ))
              )}
            </tbody>
          </table>
          {/* Mobile: show message if no products */}
          {filteredProducts.length === 0 && (
            <div className="md:hidden text-center py-12 text-gray-400 text-lg font-bold">ما كاين حتى برودوي</div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4 text-center">بغيت بصح تحيد هاد البرودوي؟</h3>
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

export default AdminProducts;