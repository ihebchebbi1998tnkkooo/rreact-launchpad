import React, { useState } from 'react';
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
  
  // Create a map to track which container each item belongs to
  const itemContainerMap = new Map<string, string>(); // itemId -> containerId
  const containerItemsMap = new Map<string, Product[]>();

  // Initialize empty containers
  packConfig.containers.forEach(container => {
    containerItemsMap.set(container.id, []);
  });

  // Distribute items based on their stored container assignments
  items.forEach((item, index) => {
    const containerId = itemContainerMap.get(item.id) || packConfig.containers[0].id;
    const containerItems = containerItemsMap.get(containerId) || [];
    containerItems.push(item);
    containerItemsMap.set(containerId, containerItems);
  });

  const handleDrop = (containerId: string) => (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const item = JSON.parse(e.dataTransfer.getData('product'));
    
    // Check if the target container has space
    const containerConfig = packConfig.containers.find(c => c.id === containerId);
    const containerItems = containerItemsMap.get(containerId) || [];
    
    if (containerConfig && containerItems.length >= containerConfig.maxItems) {
      toast({
        title: "Container plein",
        description: `Ce pack ne peut contenir que ${containerConfig.maxItems} articles`,
        variant: "destructive",
      });
      return;
    }

    setDroppedItem(item);
    setTargetContainer(containerId);
    setShowDialog(true);
    playTickSound();
  };

  const handleConfirm = () => {
    if (droppedItem && selectedSize && onItemDrop) {
      // Store the container assignment for this item
      itemContainerMap.set(droppedItem.id, targetContainer);
      
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
                onRemoveItem={(itemIndex) => {
                  const item = containerItems[itemIndex];
                  const globalIndex = items.findIndex(i => i.id === item.id);
                  if (globalIndex !== -1) {
                    onRemoveItem?.(globalIndex);
                  }
                }}
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