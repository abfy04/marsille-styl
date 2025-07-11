import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCategories } from '../../hooks/useCategories';


const CLOTHES_SIZES = ["XS","S","M","L","XL","2XL","3XL","4XL"];
const SHOES_SIZES = Array.from({length: 47-32+1}, (_, i) => (32 + i).toString());

const BACKEND_URL = 'http://localhost:8000/'; // Change to your backend URL in production
function getImageUrl(image) {
  if (!image) return '/no-image.png';
  if (image.startsWith('http')) return image;
  if (image.startsWith('storage/')) return BACKEND_URL + image;
  return image;
}

const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { categories = [], updateCategory, isUpdating } = useCategories();
  const category = categories.find(c => String(c.id) === String(id));
  const [formData, setFormData] = useState({
    name: '',
    image: null,
    sizes: null,
  });
  const [imagePreview, setImagePreview] = useState('');
  const [hasSizes, setHasSizes] = useState(false);
  const [sizeType, setSizeType] = useState('');
  const [errors, setErrors] = useState({});


  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        image: null, // always null until user uploads new
        sizes: category.sizes || null,
      });
      setImagePreview(category.image || '');
      if (category.sizes && category.sizes.length > 0) {
        setHasSizes(true);
        if (category.sizes[0] === 'XS' || category.sizes[0] === 'S') setSizeType('clothes');
        else if (category.sizes[0] === '32' || category.sizes[0] === 32) setSizeType('shoes');
      } else {
        setHasSizes(false);
        setSizeType('');
      }
    }
  }, [category]);

  if (!category) return <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow mt-8">الكاطيݣوري ما كيناش</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    const data = new FormData();
    data.append('name', formData.name);
    if (formData.image instanceof File) {
      data.append('image', formData.image);
    }
    data.append('sizes', JSON.stringify(formData.sizes));
    updateCategory({ id, updatedCategory: data }, {
      onSuccess: () => navigate('/admin/categories'),
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
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleHasSizesChange = (e) => {
    const checked = e.target.checked;
    setHasSizes(checked);
    setSizeType('');
    setFormData({ ...formData, sizes: null });
  };

  const handleSizeTypeChange = (e) => {
    const value = e.target.value;
    setSizeType(value);
    setFormData({
      ...formData,
      sizes: value === 'clothes' ? CLOTHES_SIZES : value === 'shoes' ? SHOES_SIZES : null,
    });
  };

  const errorMessagesDarija = {
    name: "سمية ضرورية",
    image: "الصورة ضرورية",
    sizes: "اختار القياسات",
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow mt-8">
      <Toaster position="top-center" />
      <h2 className="text-xl font-bold mb-4">بدل الكاطيݣوري</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">اسم الكاطيݣوري</label>
          <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
          {errors.name && <div className="text-red-600 text-xs mt-1">{errorMessagesDarija.name}</div>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">صورة الكاطيݣوري</label>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <label className="cursor-pointer bg-[#e6f4fb] hover:bg-[#d0eafd] text-[#5ab8ee] px-4 py-2 rounded-lg font-medium border border-[#b3e0fa] transition-colors duration-200">
              اختار صورة
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
            <img src={getImageUrl(imagePreview)} alt="preview" className="h-16 w-16 object-cover rounded-lg border" />
          </div>
          {errors.image && <div className="text-red-600 text-xs mt-1">{errorMessagesDarija.image}</div>}
        </div>
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={hasSizes}
              onChange={handleHasSizesChange}
              className="h-4 w-4 text-[#5ab8ee] border-gray-300 rounded"
            />
            واش فيها القياسات؟
          </label>
        </div>
        {hasSizes && (
          <div>
            <label className="block text-sm font-medium mb-2">نوع القياسات</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sizeType"
                  value="shoes"
                  checked={sizeType === 'shoes'}
                  onChange={handleSizeTypeChange}
                />
                قياسات صبابط
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sizeType"
                  value="clothes"
                  checked={sizeType === 'clothes'}
                  onChange={handleSizeTypeChange}
                />
                قياسات حوايج
              </label>
            </div>
            {sizeType && (
              <div className="mt-2 text-xs text-gray-500">
                القياسات: {formData.sizes && formData.sizes.join(', ')}
              </div>
            )}
            {errors.sizes && <div className="text-red-600 text-xs mt-1">{errorMessagesDarija.sizes}</div>}
          </div>
        )}
        <div className="flex space-x-3 rtl:space-x-reverse">
          <button type="submit" disabled={isUpdating} className="flex-1 bg-[#5ab8ee] text-white py-2 rounded-lg hover:bg-[#4aa3d9]">بدل</button>
          <button type="button" onClick={() => navigate('/admin/categories')} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400">رجع</button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory; 