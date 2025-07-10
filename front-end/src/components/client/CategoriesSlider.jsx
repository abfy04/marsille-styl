
import React from 'react';

const CategoriesSlider = ({ categories, selectedCategory, onSelectCategory, isLoading }) => {
  if (isLoading) return <div>كايشحن...</div>;
  if (!categories) return null;
  return (
    <div className="flex gap-2 justify-center my-6 px-2 overflow-x-auto flex-nowrap sm:flex-wrap sm:overflow-x-visible scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pb-2">
      {categories.map(cat => (
        <button
          key={cat.id === null ? 'all' : cat.id}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors duration-200 whitespace-nowrap min-w-[110px] sm:min-w-[90px] md:min-w-[110px] max-w-full text-sm font-bold shadow-sm ${selectedCategory === cat.id ? 'bg-yellow-400 text-white' : 'bg-gray-100 text-gray-800'} `}
          style={{flex: '0 0 auto', marginRight: 8, marginLeft: 8, maxWidth: 180}}
          onClick={() => onSelectCategory(cat.id)}
        >
          {cat.categorie_img && (
            <img src={cat.categorie_img} alt={cat.categorie_name} className="w-8 h-8 rounded-full object-cover" />
          )}
          <span>{cat.categorie_name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoriesSlider;