
import React from 'react';

const CategoriesSlider = ({ categories, selectedCategory, onSelectCategory, isLoading }) => {
  if (isLoading) return <div>Loading...</div>;
  if (!categories) return null;
  return (
    <div className="flex gap-2 justify-center my-6 px-2 overflow-x-auto flex-nowrap sm:flex-wrap sm:overflow-x-visible scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
      {categories.map(cat => (
        <button
          key={cat.id === null ? 'all' : cat.id}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors duration-200 whitespace-nowrap min-w-[120px] sm:min-w-[100px] md:min-w-[120px] ${selectedCategory === cat.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}
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