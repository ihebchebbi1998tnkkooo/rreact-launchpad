import React from "react";

const GiftCollection = () => {
  const items = [
    { src: "https://via.placeholder.com/300", label: "PACK PREMIUM", href: "/univers-cadeaux/pack-premium" },
    { src: "https://via.placeholder.com/300", label: "PACK TRIO", href: "/univers-cadeaux/pack-trio" },
    { src: "https://via.placeholder.com/300", label: "PACK PRESTIGE", href: "/univers-cadeaux/pack-prestige" },
    { src: "https://via.placeholder.com/300", label: "GIFT CARDS", href: "#gift-cards" },
    { src: "https://via.placeholder.com/300", label: "SERVICES", href: "#services" },
  ];

  return (
    <section className="bg-[#F9FAFB] py-10 font-['WomanFontRegular']">
      <div className="container mx-auto p-5 flex flex-wrap justify-between">
        <div className="w-full text-center mb-5">
          <h2 className="text-[#8A2B3B] text-4xl">Le monde fiori</h2>
        </div>
        {items.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="relative flex-1 m-2 min-w-[250px] max-w-[250] h-[430px] bg-white shadow-lg overflow-hidden group"
          >
            <img
              src={item.src}
              alt={item.label}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute bottom-0 w-full text-center text-white bg-[#591C1C]/80 py-3 text-lg transition-opacity duration-300 group-hover:bg-opacity-70">
              {item.label}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default GiftCollection;