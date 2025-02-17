import Hero from "../components/Layout/Hero";
import GenderCollectionSection from "../components/Product/GenderCollectionSection";
import ProductDetail from "../components/Product/ProductDetail";
import SwiperNewArrivals from "../components/Product/SwiperNewArrivals";

const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <SwiperNewArrivals />
      {/* Best Seller */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      <ProductDetail />
    </div>
  );
};

export default Home;
