import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { fetchAllProducts } from '@/services/productsApi';
import { Input } from "@/components/ui/input";
import { Product } from '@/types/product';
import { Search, GripVertical } from 'lucide-react';

interface ProductSelectionPanelProps {
  onItemDrop: (item: Product) => void;
}

const ProductSelectionPanel = ({ onItemDrop }: ProductSelectionPanelProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('tous');
  const [draggedItem, setDraggedItem] = useState<Product | null>(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts
  });

  // Get unique itemgroup_product values and format them
  const categories = ['tous', ...new Set(products.map(p => p.itemgroup_product))].map(category => ({
    value: category,
    label: category === 'tous' ? 'Tous' : 
           category.split('-')
                 .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                 .join(' ')
  }));

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'tous' || product.itemgroup_product === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: Product) => {
    e.dataTransfer.setData('product', JSON.stringify(item));
    setDraggedItem(item);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-white/20 h-full flex flex-col">
      <div className="space-y-6 flex-1 flex flex-col">
        <div className="relative flex-shrink-0">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Rechercher des produits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/50 border-white/30"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar flex-shrink-0">
          {categories.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setSelectedCategory(value)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                selectedCategory === value
                  ? 'bg-[#700100] text-white shadow-md transform scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 overflow-y-auto flex-1 min-h-0">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              draggable
              onDragStart={(e) => handleDragStart(e, product)}
              onDragEnd={handleDragEnd}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`bg-white rounded-lg shadow-sm p-4 cursor-grab active:cursor-grabbing border border-gray-100/50 hover:shadow-md transition-all ${
                draggedItem?.id === product.id ? 'opacity-50' : ''
              }`}
            >
              <div className="relative">
                <GripVertical className="absolute top-0 right-0 text-gray-400" size={16} />
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-24 object-contain mb-2"
                />
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {product.name}
                </h3>
                <p className="text-sm text-[#700100] font-medium mt-1">{product.price} TND</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSelectionPanel;