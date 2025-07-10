import React, { useState, useMemo } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import HeroSection from '../../components/client/HeroSection';
import CategoriesSlider from '../../components/client/CategoriesSlider';
import ProductsGrid from '../../components/client/ProductsGrid';
import Navbar from '../../components/client/Navbar';

const HomePage = () => {
  const { data: products, isLoading: productsLoading } = useProducts();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Add 'All' category at the start
  const categoriesWithAll = useMemo(() => {
    if (!categories) return [];
    return [{ id: null, categorie_name: 'الكل', categorie_img: '/all.png' }, ...categories];
  }, [categories]);

  // Filter products by selected category and search query
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    let result = products;
    if (selectedCategory) {
      result = result.filter(p => p.categorie_id === selectedCategory);
    }
    if (searchQuery) {
      result = result.filter(p =>
        p.product_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return result;
  }, [products, selectedCategory, searchQuery]);

  return (
    <>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <HeroSection products={products} isLoading={productsLoading} />
      <CategoriesSlider
        categories={categoriesWithAll}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        isLoading={categoriesLoading}
      />
      <ProductsGrid products={filteredProducts} isLoading={productsLoading} />
    </>
  );
};

export default HomePage;