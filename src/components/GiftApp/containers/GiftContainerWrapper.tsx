import React from 'react';
import { Product } from '@/types/product';
import GiftContainer from './GiftContainer';
import { PackContainer } from '@/config/giftPackConfigs';

interface GiftContainerWrapperProps {
  container: PackContainer;
  items: Product[];
  onDrop: (containerId: string) => (e: React.DragEvent<HTMLDivElement>) => void;
  onItemClick?: (product: Product) => void;
  onRemoveItem?: (index: number) => void;
  className?: string;
}

const GiftContainerWrapper: React.FC<GiftContainerWrapperProps> = ({
  container,
  items,
  onDrop,
  onItemClick,
  onRemoveItem,
  className
}) => {
  return (
    <GiftContainer
      items={items}
      maxItems={container.maxItems}
      onDrop={onDrop(container.id)}
      containerTitle={container.title}
      className={className}
      onItemClick={onItemClick}
      onRemoveItem={onRemoveItem}
    />
  );
};

export default GiftContainerWrapper;