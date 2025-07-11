import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateProduct } from '../../store/slices/productsSlice';

const SHOES_SIZES = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];
const CLOTHES_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories.categories);
  const product = products.find(p => p.id === id);
  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    sizes: [],
    colors: '',
    price: '',
    stock: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category_id: product.category_id,
        sizes: product.sizes || [],
        colors: product.colors ? product.colors.join(', ') : '',
        price: product.price.toString(),
        stock: product.stock.toString(),
        image: null,
      });
      setImagePreview(product.image);
    }
  }, [product]);

  const selectedCategory = categories.find(cat => String(cat.id) === String(formData.category_id));
  const hasSizes = selectedCategory?.hasSizes;
  const sizeType = selectedCategory?.sizeType;
  const sizeOptions = sizeType === 'shoes' ? SHOES_SIZES : sizeType === 'clothes' ? CLOTHES_SIZES : [];

  const errorMessagesDarija = {
    name: "سمية ضرورية",
    price: "الثمن ضروري و خاصو يكون رقم",
    stock: "الستوك ضروري و خاصو يكون رقم",
    image: "الصورة ضرورية",
    category_id: "الكاطيݣوري ضرورية",
    sizes: "اختار القياسات",
    colors: "دخل الألوان",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('stock', formData.stock);
    data.append('sizes', JSON.stringify(formData.sizes));
    data.append('colors', JSON.stringify(formData.colors ? formData.colors.split(',').map(c => c.trim()) : []));
    if (formData.image instanceof File) {
      data.append('image', formData.image);
    }
    data.append('category_id', formData.category_id);
    updateProduct({ id, updatedProduct: data }, {
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

  if (!product) return <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow mt-8">البرودوي ما كينش</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow mt-8">
      <h2 className="text-xl font-bold mb-4">بدل البرودوي</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">اسم البرودوي</label>
            <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 transition" />
            {errors.name && <div className="text-red-600 text-xs mt-1">{errorMessagesDarija.name}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">الثمن</label>
            <input type="number" required step="0.01" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 transition" />
            {errors.price && <div className="text-red-600 text-xs mt-1">{errors.price[0]}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">الكاطيݣوري</label>
            <select required value={formData.category_id} onChange={e => setFormData({ ...formData, category_id: e.target.value, sizes: [] })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 transition">
              <option value="">اختار كاطيݣوري</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.categorie_name}</option>
              ))}
            </select>
            {errors.category_id && <div className="text-red-600 text-xs mt-1">{errorMessagesDarija.category_id}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">الستوك</label>
            <input type="number" required value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 transition" />
            {errors.stock && <div className="text-red-600 text-xs mt-1">{errorMessagesDarija.stock}</div>}
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
            {errors.sizes && <div className="text-red-600 text-xs mt-1">{errorMessagesDarija.sizes}</div>}
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-2">الألوان (فاصلهم بفاصلة)</label>
          <input type="text" value={formData.colors} onChange={e => setFormData({ ...formData, colors: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 transition" placeholder="أحمر, أزرق, أخضر" />
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
        <div className="flex flex-col sm:flex-row gap-3">
          <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">بدل</button>
          <button type="button" onClick={() => navigate('/admin/products')} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition">رجع</button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct; 