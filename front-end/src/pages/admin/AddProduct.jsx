import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../../hooks/useCategories';
import { useProducts } from '../../hooks/useProducts';

const SHOES_SIZES = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];
const CLOTHES_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const COLOR_SWATCHES = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FFA500', '#800080', '#FFC0CB', '#A52A2A', '#808080', '#008080', '#FFD700', '#ADD8E6', '#00CED1', '#DC143C', '#B22222', '#228B22', '#FF69B4', '#8B4513', '#2E8B57', '#1E90FF', '#FF6347', '#20B2AA', '#F5DEB3', '#D2691E', '#9ACD32', '#E9967A', '#8FBC8F', '#483D8B'
];

const errorMessagesDarija = {
  name: "سمية ضرورية",
  price: "الثمن ضروري و خاصو يكون رقم",
  stock: "الستوك ضروري و خاصو يكون رقم",
  image: "الصورة ضرورية",
  category_id: "الكاطيݣوري ضرورية",
  sizes: "اختار القياسات",
  colors: "دخل الألوان",
};

const AddProduct = () => {
  const navigate = useNavigate();
  const { categories = [], isLoading: categoriesLoading, isError: categoriesError } = useCategories();
  const { addProduct, isAdding } = useProducts();
  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    sizes: null,
    colors: '',
    price: '',
    stock: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState('');
  const [customColor, setCustomColor] = useState('');
  const [errors, setErrors] = useState({});

  const selectedCategory = categories.find(cat => String(cat.id) === String(formData.category_id));
  let sizeOptions = [];
  let hasSizes = false;
  if (selectedCategory) {
    let parsedSizes = selectedCategory.sizes;
    if (typeof parsedSizes === 'string') {
      try {
        parsedSizes = JSON.parse(parsedSizes);
      } catch {
        parsedSizes = [];
      }
    }
    hasSizes = Array.isArray(parsedSizes) && parsedSizes.length > 0;
    sizeOptions = hasSizes ? parsedSizes : [];
  }

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    const cat = categories.find(cat => String(cat.id) === String(value));
    let parsedSizes = cat ? cat.sizes : [];
    if (typeof parsedSizes === 'string') {
      try {
        parsedSizes = JSON.parse(parsedSizes);
      } catch {
        parsedSizes = [];
      }
    }
    setFormData({
      ...formData,
      category_id: value,
      sizes: Array.isArray(parsedSizes) && parsedSizes.length > 0 ? [] : null,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('stock', formData.stock);
    data.append('sizes', hasSizes ? JSON.stringify(formData.sizes) : null);
    data.append('colors', JSON.stringify(formData.colors ? formData.colors.split(',').map(c => c.trim()) : []));
    if (formData.image instanceof File) {
      data.append('image', formData.image);
    }
    data.append('category_id', formData.category_id);
    addProduct(data, {
      onSuccess: () => navigate('/admin/products'),
      onError: (error) => {
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
        }
      },
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
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
      <form onSubmit={handleSubmit} className="space-y-4" encType='multipart/formdata'>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">اسم البرودوي</label>
            <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
            {errors.name && <div className="text-red-600 text-xs mt-1">{errorMessagesDarija.name}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">الثمن</label>
            <input type="number" required step="0.01" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
            {errors.price && <div className="text-red-600 text-xs mt-1">{errors.price[0]}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">الكاطيݣوري</label>
            <select required value={formData.category_id} onChange={handleCategoryChange} className="w-full px-3 py-2 border rounded-lg">
              <option value="">اختار كاطيݣوري</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            {errors.category_id && <div className="text-red-600 text-xs mt-1">{errorMessagesDarija.category_id}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">الستوك</label>
            <input type="number" required value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
            {errors.stock && <div className="text-red-600 text-xs mt-1">{errorMessagesDarija.stock}</div>}
          </div>
        </div>
        {hasSizes && (
          <div>
            <label className="block text-sm font-medium mb-2">اختار القياسات</label>
            <div className="flex flex-wrap gap-2">
              {sizeOptions.map(size => (
                <label key={size} className="flex items-center gap-2 cursor-pointer border px-3 py-2 rounded-lg">
                  <input
                    type="checkbox"
                    checked={formData.sizes && formData.sizes.includes(size)}
                    onChange={() => handleSizeToggle(size)}
                  />
                  <span>{size}</span>
                </label>
              ))}
            </div>
            {errors.sizes && <div className="text-red-600 text-xs mt-1">{errorMessagesDarija.sizes}</div>}
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-2">الألوان (فاصلهم بفاصلة)</label>
          <input type="text" value={formData.colors} onChange={e => setFormData({ ...formData, colors: e.target.value })} className="w-full px-3 py-2 border rounded-lg" placeholder="أحمر, أزرق, أخضر" />
          {errors.colors && <div className="text-red-600 text-xs mt-1">{errorMessagesDarija.colors}</div>}
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
          {errors.image && <div className="text-red-600 text-xs mt-1">{errorMessagesDarija.image}</div>}
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