import React, { useState } from 'react';
import { Product } from '@/types/product';
import { playTickSound } from '@/utils/audio';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SizeSelector from '../product-detail/SizeSelector';
import PersonalizationButton from '../product-detail/PersonalizationButton';
import GiftContainer from './containers/GiftContainer';
import ProductImageCarousel from '../product-detail/ProductImageCarousel';
import { toast } from '@/components/ui/use-toast';

interface GiftBasket3DProps {
  items: Product[];
  onItemDrop: (item: Product, size: string, personalization: string) => void;
  onRemoveItem?: (index: number) => void;
}

const GiftBasket3D = ({ items, onItemDrop, onRemoveItem }: GiftBasket3DProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [personalization, setPersonalization] = useState('');
  const [droppedItem, setDroppedItem] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [targetContainer, setTargetContainer] = useState<number>(0);

  const container1Items = items.slice(0, 2);
  const container2Items = items.slice(2, 3);
  const container3Items = items.slice(3, 4);

  const handleDrop = (containerId: number) => (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const item = JSON.parse(e.dataTransfer.getData('product'));
    setDroppedItem(item);
    setTargetContainer(containerId);
    setShowDialog(true);
    playTickSound();
  };

  const handleConfirm = () => {
    if (droppedItem && selectedSize && onItemDrop) {
      onItemDrop(droppedItem, selectedSize, personalization);
      setShowDialog(false);
      setSelectedSize('');
      setPersonalization('');
      setDroppedItem(null);
      toast({
        title: "Article ajouté au pack",
        description: "L'article a été ajouté avec succès à votre pack cadeau",
        style: {
          backgroundColor: '#700100',
          color: 'white',
          border: '1px solid #590000',
        },
        duration: 3000, // Set duration to 3 seconds
      });
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleRemoveItem = (index: number) => {
    if (onRemoveItem) {
      onRemoveItem(index);
      toast({
        title: "Article retiré",
        description: "L'article a été retiré de votre pack cadeau",
        style: {
          backgroundColor: '#700100',
          color: 'white',
          border: '1px solid #590000',
        },
      });
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 h-[600px]">
        <div className="h-[300px]">
          <GiftContainer
            items={container1Items}
            maxItems={2}
            onDrop={handleDrop(0)}
            containerTitle="Pack Principal"
            className="h-full bg-white/95 backdrop-blur-sm shadow-xl rounded-xl border border-gray-100"
            onItemClick={handleProductClick}
            onRemoveItem={(index) => handleRemoveItem(index)}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4 h-[250px]">
          <GiftContainer
            items={container2Items}
            maxItems={1}
            onDrop={handleDrop(1)}
            containerTitle="Pack Secondaire 1"
            className="h-full bg-white/95 backdrop-blur-sm shadow-xl rounded-xl border border-gray-100"
            onItemClick={handleProductClick}
            onRemoveItem={(index) => handleRemoveItem(index + 2)}
          />
          <GiftContainer
            items={container3Items}
            maxItems={1}
            onDrop={handleDrop(2)}
            containerTitle="Pack Secondaire 2"
            className="h-full bg-white/95 backdrop-blur-sm shadow-xl rounded-xl border border-gray-100"
            onItemClick={handleProductClick}
            onRemoveItem={(index) => handleRemoveItem(index + 3)}
          />
        </div>
      </div>

      {/* Add Item Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[500px] bg-white/95">
          <DialogHeader>
            <DialogTitle className="text-xl font-serif text-[#6D0201] mb-4">
              Personnalisez votre article
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <SizeSelector
              selectedSize={selectedSize}
              sizes={['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']}
              onSizeSelect={setSelectedSize}
            />
            
            <PersonalizationButton
              productId={droppedItem?.id || 0}
              onSave={setPersonalization}
              initialText={personalization}
            />

            <button
              onClick={handleConfirm}
              className={`w-full py-4 rounded-xl text-white font-medium ${
                !selectedSize
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#6D0201] hover:bg-[#590000]'
              }`}
              disabled={!selectedSize}
            >
              Confirmer
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Product Details Modal */}
      <Dialog open={showProductModal} onOpenChange={setShowProductModal}>
        <DialogContent className="sm:max-w-[800px] bg-white/95">
          <button
            onClick={() => setShowProductModal(false)}
            className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
          
          {selectedProduct && (
            <div className="grid grid-cols-2 gap-6">
              <div>
                <ProductImageCarousel 
                  images={[selectedProduct.image]} 
                  name={selectedProduct.name} 
                />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-[#6D0201]">
                  {selectedProduct.name}
                </h2>
                <p className="text-xl font-semibold">
                  {selectedProduct.price} TND
                </p>
                <p className="text-gray-600">
                  {selectedProduct.description}
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Matière</h3>
                    <p className="text-gray-600">{selectedProduct.material}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Couleur</h3>
                    <p className="text-gray-600">{selectedProduct.color}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GiftBasket3D;
