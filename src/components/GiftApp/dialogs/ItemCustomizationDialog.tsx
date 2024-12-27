import React from 'react';
import { Product } from '@/types/product';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SizeSelector from '../../product-detail/SizeSelector';
import PersonalizationButton from '../../product-detail/PersonalizationButton';

interface ItemCustomizationDialogProps {
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
  droppedItem: Product | null;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  personalization: string;
  setPersonalization: (text: string) => void;
  onConfirm: () => void;
}

const ItemCustomizationDialog: React.FC<ItemCustomizationDialogProps> = ({
  showDialog,
  setShowDialog,
  droppedItem,
  selectedSize,
  setSelectedSize,
  personalization,
  setPersonalization,
  onConfirm,
}) => {
  return (
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
            onClick={onConfirm}
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
  );
};

export default ItemCustomizationDialog;