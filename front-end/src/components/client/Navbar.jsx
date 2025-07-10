import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Store } from 'lucide-react';
import { useSelector } from 'react-redux';

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogoDoubleClick = () => {
    navigate('/admin/login');
  };

  // Scroll to products grid when search changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value) {
      setTimeout(() => {
        const el = document.getElementById('products');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* First row: cart/lang left, logo right, search (tablet/desktop) */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0 h-auto md:h-16">
          {/* Left: Cart */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse order-2 md:order-1">
            <Link to={'/cart'} className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
          {/* Center: Search (tablet/desktop only) */}
          <div className="hidden md:flex flex-1 justify-center">
            <input
              type="text"
              placeholder="ابحث عن منتج..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="border px-3 py-2 rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
            />
          </div>
          {/* Right: Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse order-1 md:order-2"
            onDoubleClick={handleLogoDoubleClick}
          >
            <Store className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">
              Marseille Style
            </span>
          </Link>
        </div>
        {/* Second row: Search bar (mobile only) */}
        <div className="flex w-full justify-center py-2 md:hidden">
          <input
            type="text"
            placeholder="ابحث عن منتج..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="border px-3 py-2 rounded-lg w-full max-w-xs sm:max-w-sm"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;