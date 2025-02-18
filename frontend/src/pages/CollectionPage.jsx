import { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Product/FilterSidebar";
import SortOptions from "./SortOptions";
import ProductGrid from "../components/Product/ProductGrid.jsx";
const productsData = [
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
    name: "Casual Denim Jacket",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=2",
        altText: "Casual Denim Jacket",
      },
    ],
  },
  {
    _id: 3,
    name: "Leather Biker Jacket",
    price: 180,
    images: [
      {
        url: "https://picsum.photos/500/500?random=3",
        altText: "Leather Biker Jacket",
      },
    ],
  },
  {
    _id: 4,
    name: "Winter Puffer Jacket",
    price: 130,
    images: [
      {
        url: "https://picsum.photos/500/500?random=4",
        altText: "Winter Puffer Jacket",
      },
    ],
  },
  {
    _id: 5,
    name: "Classic Bomber Jacket",
    price: 110,
    images: [
      {
        url: "https://picsum.photos/500/500?random=5",
        altText: "Classic Bomber Jacket",
      },
    ],
  },
  {
    _id: 6,
    name: "Hooded Parka",
    price: 190,
    images: [
      {
        url: "https://picsum.photos/500/500?random=6",
        altText: "Hooded Parka",
      },
    ],
  },
  {
    _id: 7,
    name: "Windbreaker Jacket",
    price: 85,
    images: [
      {
        url: "https://picsum.photos/500/500?random=7",
        altText: "Windbreaker Jacket",
      },
    ],
  },
  {
    _id: 8,
    name: "Trench Coat",
    price: 220,
    images: [
      {
        url: "https://picsum.photos/500/500?random=8",
        altText: "Trench Coat",
      },
    ],
  },
];

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };
  useEffect(() => {
    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);
    // Clean event listener
    document.removeEventListener("mousedown", handleClickOutside);
  });
  useEffect(() => {
    setTimeout(() => {
      const fetchProducts = productsData;
      setProducts(fetchProducts);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile Filter button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" /> Filters
      </button>
      {/* Filter Sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0 `}
      >
        <FilterSidebar />
      </div>
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">all collections</h2>
        {/* Sort options */}
        <SortOptions />

        {/* Product Grid */}
        <ProductGrid products={productsData} />
      </div>
    </div>
  );
};

export default CollectionPage;
