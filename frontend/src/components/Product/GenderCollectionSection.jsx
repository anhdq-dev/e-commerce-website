import { Link } from "react-router-dom";

import menCollectionImage from "../../assets/mens-collection.webp";
import womenCollectionImage from "../../assets/women-collection.webp";

const GenderCollectionSection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* Women's Collection */}
        <div className="relative flex-1">
          <img
            src={womenCollectionImage}
            alt="Women's Collection"
            className="w-full h-[700px] object-cover"
          />
          <div className="absolute bottom-0 left-8 bg-white/90 p-4 mb-8 rounded-lg text-center hover:opacity-90 transition duration-300 ease-in-out">
            <h2 className="text-xl font-bold text-gray-900">
              Women&apos;s Collection
            </h2>
            <Link
              to="/collections/all?gender=Women"
              className="text-gray-900 underline font-semibold"
            >
              Show now
            </Link>
          </div>
        </div>
        {/* Men's Collection */}
        <div className="relative flex-1">
          <img
            src={menCollectionImage}
            alt="Men's Collection"
            className="w-full h-[700px] object-cover"
          />
          <div className="absolute bottom-0 left-8 bg-white/90 p-4 mb-8 rounded-lg text-center hover:opacity-90 transition duration-300 ease-in-out">
            <h2 className="text-xl font-bold text-gray-900">
              Women&apos;s Collection
            </h2>
            <Link
              to="/collections/all?gender=Men"
              className="text-gray-900 underline font-semibold"
            >
              Show now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
