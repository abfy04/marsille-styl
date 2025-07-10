import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../../store/slices/productsSlice';

const SHOES_SIZES = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];
const CLOTHES_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categories.categories);
  const [formData, setFormData] = useState({
    product_name: '',
    categorie_id: '',
    sizes: [],
    colors: '',
    price: '',
    quantity: '',
    product_img: '',
  });
  const [imagePreview, setImagePreview] = useState('');

  const selectedCategory = categories.find(cat => String(cat.id) === String(formData.categorie_id));
  const hasSizes = selectedCategory?.hasSizes;
  const sizeType = selectedCategory?.sizeType;
  const sizeOptions = sizeType === 'shoes' ? SHOES_SIZES : sizeType === 'clothes' ? CLOTHES_SIZES : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      id: Date.now().toString(),
      product_name: formData.product_name,
      categorie_id: formData.categorie_id,
      sizes: formData.sizes,
      colors: formData.colors ? formData.colors.split(',').map(c => c.trim()) : [],
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      product_img: formData.product_img,
    };
    dispatch(addProduct(productData));
    navigate('/admin/products');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, product_img: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSizeToggle = (size) => {
    setFormData((prev) =>
      prev.sizes.includes(size)
        ? { ...prev, sizes: prev.sizes.filter(s => s !== size) }
        : { ...prev, sizes: [...prev.sizes, size] }
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow mt-8">
      <h2 className="text-xl font-bold mb-4">زيد برودوي جديد</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">اسم البرودوي</label>
            <input type="text" required value={formData.product_name} onChange={e => setFormData({ ...formData, product_name: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">الثمن</label>
            <input type="number" required step="0.01" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">الكاطيݣوري</label>
            <select required value={formData.categorie_id} onChange={e => setFormData({ ...formData, categorie_id: e.target.value, sizes: [] })} className="w-full px-3 py-2 border rounded-lg">
              <option value="">اختار كاطيݣوري</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.categorie_name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">الستوك</label>
            <input type="number" required value={formData.quantity} onChange={e => setFormData({ ...formData, quantity: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
          </div>
        </div>
        {hasSizes && (
          <div>
            <label className="block text-sm font-medium mb-2">اختار القياسات</label>
            <div className="flex flex-wrap gap-2">
              {sizeOptions.map(size => (
                <button
                  type="button"
                  key={size}
                  onClick={() => handleSizeToggle(size)}
                  className={`px-4 py-2 border rounded-lg transition-colors duration-200 ${formData.sizes.includes(size) ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 hover:border-gray-400'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-2">الألوان (فاصلهم بفاصلة)</label>
          <input type="text" value={formData.colors} onChange={e => setFormData({ ...formData, colors: e.target.value })} className="w-full px-3 py-2 border rounded-lg" placeholder="أحمر, أزرق, أخضر" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">صورة البرودوي</label>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <label className="cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium border border-blue-200 transition-colors duration-200">
              اختار صورة
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
            {imagePreview && (
              <img src={imagePreview} alt="preview" className="h-16 w-16 object-cover rounded-lg border" />
            )}
          </div>
        </div>
        <div className="flex space-x-3 rtl:space-x-reverse">
          <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">زيد</button>
          <button type="button" onClick={() => navigate('/admin/products')} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400">رجع</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct; 