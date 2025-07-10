import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCategory } from '../../store/slices/categoriesSlice';

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    categorie_name: '',
    categorie_img: '',
    hasSizes: false,
    sizeType: '', // 'shoes' or 'clothes'
  });
  const [imagePreview, setImagePreview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const categoryData = {
      id: Date.now().toString(),
      categorie_name: formData.categorie_name,
      categorie_img: formData.categorie_img,
      hasSizes: formData.hasSizes,
      sizeType: formData.hasSizes ? formData.sizeType : '',
    };
    dispatch(addCategory(categoryData));
    navigate('/admin/categories');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, categorie_img: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow mt-8">
      <h2 className="text-xl font-bold mb-4">زيد كاطيݣوري جديدة</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">اسم الكاطيݣوري</label>
          <input type="text" required value={formData.categorie_name} onChange={e => setFormData({ ...formData, categorie_name: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">صورة الكاطيݣوري</label>
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
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.hasSizes}
              onChange={e => setFormData({ ...formData, hasSizes: e.target.checked, sizeType: '' })}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            واش فيها القياسات؟
          </label>
        </div>
        {formData.hasSizes && (
          <div>
            <label className="block text-sm font-medium mb-2">نوع القياسات</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sizeType"
                  value="shoes"
                  checked={formData.sizeType === 'shoes'}
                  onChange={e => setFormData({ ...formData, sizeType: e.target.value })}
                />
                قياسات صبابط
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sizeType"
                  value="clothes"
                  checked={formData.sizeType === 'clothes'}
                  onChange={e => setFormData({ ...formData, sizeType: e.target.value })}
                />
                قياسات حوايج
              </label>
            </div>
          </div>
        )}
        <div className="flex space-x-3 rtl:space-x-reverse">
          <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">زيد</button>
          <button type="button" onClick={() => navigate('/admin/categories')} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400">رجع</button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory; 