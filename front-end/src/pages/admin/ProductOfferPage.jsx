import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateProduct } from '../../store/slices/productsSlice';

const ProductOfferPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const product = products.find(p => String(p.id) === String(id));

  const [offerPrice, setOfferPrice] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (product && product.is_offered) {
      setOfferPrice(product.offered_price ? String(product.offered_price) : '');
      setStartDate(product.offer_start || '');
      setEndDate(product.offer_end || '');
    }
  }, [product]);

  if (!product) {
    return <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow mt-8">البرودوي ما كينش</div>;
  }

  // Handle delete offer
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('delete') && product.is_offered) {
      if (window.confirm('واش متأكد بغيتي تحيد البرومو؟')) {
        dispatch(updateProduct({
          ...product,
          is_offered: false,
          offered_price: undefined,
          offer_start: '',
          offer_end: '',
        }));
        navigate('/admin/products');
      }
    }
    // eslint-disable-next-line
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({
      ...product,
      is_offered: true,
      offered_price: parseFloat(offerPrice),
      offer_start: startDate,
      offer_end: endDate,
    }));
    navigate('/admin/products');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow mt-8">
      <h2 className="text-xl font-bold mb-4">{product.is_offered ? 'بدل البرومو' : 'زيد برومو'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">اسم البرودوي</label>
          <div className="bg-gray-100 rounded px-3 py-2">{product.product_name}</div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">الثمن</label>
          <div className="bg-gray-100 rounded px-3 py-2">{product.price} د.م</div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">ثمن البرومو</label>
          <input
            type="number"
            required
            step="0.01"
            value={offerPrice}
            onChange={e => setOfferPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">تاريخ بداية البرومو</label>
            <input
              type="date"
              required
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">تاريخ نهاية البرومو</label>
            <input
              type="date"
              required
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            {product.is_offered ? 'بدل البرومو' : 'زيد البرومو'}
          </button>
          <button type="button" onClick={() => navigate('/admin/products')} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition">رجع</button>
          {product.is_offered && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm('واش متأكد بغيتي تحيد البرومو؟')) {
                  dispatch(updateProduct({
                    ...product,
                    is_offered: false,
                    offered_price: undefined,
                    offer_start: '',
                    offer_end: '',
                  }));
                  navigate('/admin/products');
                }
              }}
              className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
            >
              حيد البرومو
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductOfferPage; 