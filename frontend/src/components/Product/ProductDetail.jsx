import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";

const selectedProduct = {
  _id: 1,
  name: "Stylish Jacket",
  price: 120,
  originalPrice: 150,
  description: "This is a stylish Jacket perfect for any occasion",
  brand: "FashionBrand",
  material: "Leather",
  sizes: ["S", "M", "L", "XL"],
  colors: ["Red", "Black"],
  images: [
    {
      url: "https://picsum.photos/500/500?random=1",
      altText: "Stylish Jacket 1",
    },
    {
      url: "https://picsum.photos/500/500?random=2",
      altText: "Stylish Jacket 2",
    },
  ],
};

const similarProducts = [
  {
    _id: 3,
    name: "Leather Biker Jacket",
    price: 180,
    originalPrice: 220,
    description: "A stylish biker jacket made from premium leather.",
    brand: "MotoStyle",
    material: "Genuine Leather",
    sizes: ["M", "L", "XL"],
    colors: ["Black", "Brown"],
    images: [
      {
        url: "https://picsum.photos/500/500?random=5",
        altText: "Leather Biker Jacket 1",
      },
      {
        url: "https://picsum.photos/500/500?random=6",
        altText: "Leather Biker Jacket 2",
      },
    ],
  },
  {
    _id: 4,
    name: "Winter Puffer Jacket",
    price: 130,
    originalPrice: 160,
    description: "Warm and stylish puffer jacket for winter season.",
    brand: "ColdGear",
    material: "Polyester",
    sizes: ["S", "M", "L"],
    colors: ["Navy", "White"],
    images: [
      {
        url: "https://picsum.photos/500/500?random=7",
        altText: "Winter Puffer Jacket 1",
      },
      {
        url: "https://picsum.photos/500/500?random=8",
        altText: "Winter Puffer Jacket 2",
      },
    ],
  },
  {
    _id: 5,
    name: "Classic Bomber Jacket",
    price: 110,
    originalPrice: 140,
    description: "A timeless bomber jacket for a casual style.",
    brand: "AirTrend",
    material: "Nylon",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Olive", "Black"],
    images: [
      {
        url: "https://picsum.photos/500/500?random=9",
        altText: "Classic Bomber Jacket 1",
      },
      {
        url: "https://picsum.photos/500/500?random=10",
        altText: "Classic Bomber Jacket 2",
      },
    ],
  },
  {
    _id: 6,
    name: "Hooded Parka",
    price: 190,
    originalPrice: 240,
    description: "A warm and stylish hooded parka for winter adventures.",
    brand: "WinterGear",
    material: "Wool Blend",
    sizes: ["M", "L", "XL"],
    colors: ["Gray", "Dark Green"],
    images: [
      {
        url: "https://picsum.photos/500/500?random=11",
        altText: "Hooded Parka 1",
      },
      {
        url: "https://picsum.photos/500/500?random=12",
        altText: "Hooded Parka 2",
      },
    ],
  },
  {
    _id: 7,
    name: "Windbreaker Jacket",
    price: 85,
    originalPrice: 110,
    description: "Lightweight windbreaker for outdoor activities.",
    brand: "SportWear",
    material: "Polyester",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Green"],
    images: [
      {
        url: "https://picsum.photos/500/500?random=13",
        altText: "Windbreaker Jacket 1",
      },
      {
        url: "https://picsum.photos/500/500?random=14",
        altText: "Windbreaker Jacket 2",
      },
    ],
  },
  {
    _id: 8,
    name: "Vintage Leather Jacket",
    price: 160,
    originalPrice: 200,
    description: "A vintage-style leather jacket with timeless appeal.",
    brand: "RetroWear",
    material: "Genuine Leather",
    sizes: ["M", "L", "XL"],
    colors: ["Brown", "Black"],
    images: [
      {
        url: "https://picsum.photos/500/500?random=15",
        altText: "Vintage Leather Jacket 1",
      },
      {
        url: "https://picsum.photos/500/500?random=16",
        altText: "Vintage Leather Jacket 2",
      },
    ],
  },
  {
    _id: 9,
    name: "Fleece Zip-Up Jacket",
    price: 95,
    originalPrice: 120,
    description: "A cozy fleece zip-up jacket for everyday comfort.",
    brand: "CozyWear",
    material: "Fleece",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige", "Black"],
    images: [
      {
        url: "https://picsum.photos/500/500?random=17",
        altText: "Fleece Zip-Up Jacket 1",
      },
      {
        url: "https://picsum.photos/500/500?random=18",
        altText: "Fleece Zip-Up Jacket 2",
      },
    ],
  },
  {
    _id: 10,
    name: "Trench Coat",
    price: 220,
    originalPrice: 260,
    description: "A stylish and elegant trench coat for formal occasions.",
    brand: "LuxuryWear",
    material: "Cotton Blend",
    sizes: ["M", "L", "XL"],
    colors: ["Camel", "Black"],
    images: [
      {
        url: "https://picsum.photos/500/500?random=19",
        altText: "Trench Coat 1",
      },
      {
        url: "https://picsum.photos/500/500?random=20",
        altText: "Trench Coat 2",
      },
    ],
  },
];



const ProductDetail = () => {
  const [mainImage, setMainImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisable, setIsButtonDisable] = useState(false);

  //handle quantity
  const handleQuantityChange = (operator) => {
    if (operator == "minus") {
      quantity > 1 ? setQuantity((pre) => pre - 1) : 1;
    } else {
      setQuantity((pre) => pre + 1);
    }
  };
  //
  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select a size and color before adding to cart!", {
        duration: 1000,
      });
      return;
    }

    setIsButtonDisable(true);
    setTimeout(() => {
      toast.success("Product added to cart!", {
        duration: 1000,
      });
      setIsButtonDisable(false);
    }, 500);
  };
  //
  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, []);

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* Left Thumbnail */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText}
                className={`w-20 h-20 rounded-lg cursor-pointer border ${
                  mainImage === image.url ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>
          {/* Main Image */}
          <div className="md:w-1/2">
            <div className="mb-4">
              <img
                src={mainImage}
                alt="Main Product"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>
          {/* Mobile Thumbnail */}
          <div className="md:hidden flex overflow-x-scroll space-x-4 mb-4">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText}
                className={`w-20 h-20 rounded-lg cursor-pointer border ${
                  mainImage === image.url ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>
          {/* Right Side */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              {selectedProduct.name}
            </h1>
            <p className="text-lg text-gray-600 mb-1 line-through">
              {selectedProduct.originalPrice}
            </p>
            <p className="text-xl text-gray-600 mb-2">
              $ {selectedProduct.price}
            </p>
            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

            {/* Color */}
            <div className="mb-4">
              <p className="text-gray-700">Color:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full ${
                      selectedColor === color
                        ? "border-4 border-black"
                        : "border-gray-300"
                    }`}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      backgroundColor: color.toLowerCase(),
                      filter: "brightness(0.5)",
                    }}
                  ></button>
                ))}
              </div>
            </div>
            {/* Size */}
            <div className="mb-4">
              <p className="text-gray-700">Size:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded border w-15 ${
                      selectedSize === size ? "bg-black text-white" : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <p className="text-gray-700">Quantity:</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  className="px-2 py-1 w-10 bg-gray-200 rounded text-lg"
                  onClick={() => handleQuantityChange("minus")}
                >
                  -
                </button>
                <span className="text-lg w-5 text-center">{quantity}</span>
                <button
                  className="px-2 py-1 w-10 bg-gray-200 rounded text-lg"
                  onClick={() => handleQuantityChange("plus")}
                >
                  +
                </button>
              </div>
            </div>
            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              disabled={isButtonDisable}
              className={`bg-black text-white py-2 px-6 rounded w-full mb-4 uppercase ${
                isButtonDisable
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-gray-900"
              }`}
            >
              {isButtonDisable ? "Adding..." : "Add to cart"}
            </button>
            <div className="mt-10 text-gray-700">
              <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
              <table className="w-full text-left text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-1">Brand</td>
                    <td className="py-1">{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Material</td>
                    <td className="py-1">{selectedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <h2 className="text-2xl text-center font-medium mb-4 capitalize">
            You May also like
          </h2>
          <ProductGrid products={similarProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
