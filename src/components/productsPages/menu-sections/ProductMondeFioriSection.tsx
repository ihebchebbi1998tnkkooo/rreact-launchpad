import React from 'react';
import SubMenuSection from '../../navigation/SubMenuSection';

const ProductMondeFioriSection = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <SubMenuSection
        title="Notre monde"
        items={[
          {
            href: "/category/le-monde-fiori/homme/histoire",
            title: "Histoire",
            description: "Collections élégantes pour mariage"
          },
          {
            href: "/category/le-monde-fiori/homme/collection",
            title: "collection",
            description: "Design festifs"
          },
          {
            href: "/category/le-monde-fiori/homme/dna",
            title: "DNA",
            description: "Design festifs"
          }
        ]}
      />
    </div>
  );
};

export default ProductMondeFioriSection;