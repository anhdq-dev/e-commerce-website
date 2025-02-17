import Hero from "../components/Layout/Hero";
import FeaturedCollection from "../components/Product/FeaturedCollection";
import FeaturesSection from "../components/Product/FeaturesSection";
import GenderCollectionSection from "../components/Product/GenderCollectionSection";
import ProductDetail from "../components/Product/ProductDetail";
import ProductGrid from "../components/Product/ProductGrid";
import SwiperNewArrivals from "../components/Product/SwiperNewArrivals";
const placeHolderProducts = [
  {
    _id: 1,
    name: "Stylish Jacket",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500?random=1",
        altText: "Stylish Jacket",
      },
    ],
  },
  {
    _id: 2,
    name: "Casual Sneakers",
    price: 90,
    images: [
      {
        url: "https://picsum.photos/500/500?random=2",
        altText: "Casual Sneakers",
      },
    ],
  },
  {
    _id: 3,
    name: "Classic Watch",
    price: 150,
    images: [
      {
        url: "https://picsum.photos/500/500?random=3",
        altText: "Classic Watch",
      },
    ],
  },
  {
    _id: 4,
    name: "Stylish Bag",
    price: 80,
    images: [
      {
        url: "https://picsum.photos/500/500?random=4",
        altText: "Stylish Bag",
      },
    ],
  },
];
const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <SwiperNewArrivals />
      {/* Best Seller */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      <ProductDetail />
      {/* Place holder */}
      <div className="container mx-auto mb-5">
        <h2 className="text-3xl text-center font-bold mb-4 capitalize">
          Top wear for women
        </h2>
        <ProductGrid products={placeHolderProducts} />
      </div>
      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};

export default Home;
