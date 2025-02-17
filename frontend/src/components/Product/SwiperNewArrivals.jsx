// Import Swiper, Swiper Module React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";

// Import Link form react-router-dom
import { Link } from "react-router-dom";
// import icon
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/free-mode";

const SwiperNewArrivals = () => {
  const newArrivals = [
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
      name: "Denim Jeans",
      price: 75,
      images: [
        {
          url: "https://picsum.photos/500/500?random=4",
          altText: "Denim Jeans",
        },
      ],
    },
    {
      _id: 5,
      name: "Leather Wallet",
      price: 50,
      images: [
        {
          url: "https://picsum.photos/500/500?random=5",
          altText: "Leather Wallet",
        },
      ],
    },
    {
      _id: 6,
      name: "Sports T-Shirt",
      price: 40,
      images: [
        {
          url: "https://picsum.photos/500/500?random=6",
          altText: "Sports T-Shirt",
        },
      ],
    },
    {
      _id: 7,
      name: "Running Shoes",
      price: 110,
      images: [
        {
          url: "https://picsum.photos/500/500?random=7",
          altText: "Running Shoes",
        },
      ],
    },
    {
      _id: 8,
      name: "Winter Coat",
      price: 180,
      images: [
        {
          url: "https://picsum.photos/500/500?random=8",
          altText: "Winter Coat",
        },
      ],
    },
    {
      _id: 9,
      name: "Baseball Cap",
      price: 30,
      images: [
        {
          url: "https://picsum.photos/500/500?random=9",
          altText: "Baseball Cap",
        },
      ],
    },
    {
      _id: 10,
      name: "Sunglasses",
      price: 60,
      images: [
        {
          url: "https://picsum.photos/500/500?random=10",
          altText: "Sunglasses",
        },
      ],
    },
  ];
  return (
    <div className="">
      <section className=" py-16 lg:px-0">
        <div className="container mx-auto text-center mb-10 relative">
          <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
          <p className="text-lg text-gray-600 mb-8">
            Discover the latest styles straight off the runway, freshly added to
            keep your wardrobe on the cutting edge of fashion.
          </p>
          {/* Scroll Buttons */}
          <div className="absolute right-0 bottom-[-30px] flex space-x-2">
            <button className="p-2 rounded border custom-prev bg-white text-black cursor-pointer">
              <FiChevronLeft className="text-2xl" />
            </button>

            <button className="p-2 rounded border custom-next bg-white text-black cursor-pointer">
              <FiChevronRight className="text-2xl" />
            </button>
          </div>
        </div>
        <div className="container mx-auto flex space-x-6 relative">
          <Swiper
            loop={true}
            modules={[Navigation, Autoplay, FreeMode]}
            freeMode={true}
            spaceBetween={20}
            slidesPerView={"auto"}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            {newArrivals.map((product) => (
              <SwiperSlide key={product._id}>
                <div className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative">
                  <img
                    src={product.images[0]?.url}
                    alt={product.images[0]?.altText || product.name}
                    className="w-full h-[400px] object-cover rounded-lg"
                    loading="lazy"
                  />
                  <div className="swiper-lazy-preloader"></div>
                  <div className="absolute bottom-0 left-0 right-0 backdrop-blur-md text-white p-4 rounded-b-lg">
                    <Link className="block" to={`/product/${product._id}`}>
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="mt-1">${product.price}</p>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default SwiperNewArrivals;
