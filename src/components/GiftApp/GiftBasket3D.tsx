import React, { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { playTickSound } from '@/utils/audio';
import { toast } from '@/components/ui/use-toast';
import { useParams } from 'react-router-dom';
import { getPackConfig } from '@/config/giftPackConfigs';
import GiftContainerWrapper from './containers/GiftContainerWrapper';
import ItemCustomizationDialog from './dialogs/ItemCustomizationDialog';
import ProductDetailsDialog from './dialogs/ProductDetailsDialog';

interface GiftBasket3DProps {
  items: Product[];
  onItemDrop: (item: Product, size: string, personalization: string) => void;
  onRemoveItem?: (index: number) => void;
}

const GiftBasket3D = ({ items, onItemDrop, onRemoveItem }: GiftBasket3DProps) => {
  const { packId = 'pack-premium' } = useParams();
  const [showDialog, setShowDialog] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [personalization, setPersonalization] = useState('');
  const [droppedItem, setDroppedItem] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [targetContainer, setTargetContainer] = useState<string>('');

  const packConfig = getPackConfig(packId);
  const containerItemsMap = new Map<string, Product[]>();

  // Distribute items to containers based on pack configuration
  packConfig.containers.forEach((container, index) => {
    const startIndex = packConfig.containers
      .slice(0, index)
      .reduce((sum, c) => sum + c.maxItems, 0);
    containerItemsMap.set(
      container.id,
      items.slice(startIndex, startIndex + container.maxItems)
    );
  });

  const handleDrop = (containerId: string) => (e: React.DragEvent<HTMLDivElement>) => {
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
        duration: 3000,
      });
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  return (
    <>
      <div className="flex flex-col gap-4 h-[600px]">
        {packConfig.containers.map((container, index) => {
          const containerItems = containerItemsMap.get(container.id) || [];
          const startIndex = packConfig.containers
            .slice(0, index)
            .reduce((sum, c) => sum + c.maxItems, 0);

          return (
            <div 
              key={container.id}
              className={index === 0 ? "h-[300px]" : "h-[250px]"}
            >
              <GiftContainerWrapper
                container={container}
                items={containerItems}
                onDrop={handleDrop}
                onItemClick={handleProductClick}
                onRemoveItem={(itemIndex) => 
                  onRemoveItem?.(startIndex + itemIndex)
                }
                className="h-full bg-white/95 backdrop-blur-sm shadow-xl rounded-xl border border-gray-100"
              />
            </div>
          );
        })}
      </div>

      <ItemCustomizationDialog
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        droppedItem={droppedItem}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        personalization={personalization}
        setPersonalization={setPersonalization}
        onConfirm={handleConfirm}
      />

      <ProductDetailsDialog
        showDialog={showProductModal}
        setShowDialog={setShowProductModal}
        product={selectedProduct}
      />
    </>
  );
};

export default GiftBasket3D;