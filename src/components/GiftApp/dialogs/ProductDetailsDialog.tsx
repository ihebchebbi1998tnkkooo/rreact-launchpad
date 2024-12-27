import React from 'react';
import { Product } from '@/types/product';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from 'lucide-react';
import ProductImageCarousel from '../../product-detail/ProductImageCarousel';

interface ProductDetailsDialogProps {
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
  product: Product | null;
}

const ProductDetailsDialog: React.FC<ProductDetailsDialogProps> = ({
  showDialog,
  setShowDialog,
  product
}) => {
  if (!product) return null;

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="sm:max-w-[800px] bg-white/95">
        <button
          onClick={() => setShowDialog(false)}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <ProductImageCarousel 
              images={[product.image]} 
              name={product.name} 
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#6D0201]">
              {product.name}
            </h2>
            <p className="text-xl font-semibold">
              {product.price} TND
            </p>
            <p className="text-gray-600">
              {product.description}
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Matière</h3>
                <p className="text-gray-600">{product.material}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Couleur</h3>
                <p className="text-gray-600">{product.color}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;