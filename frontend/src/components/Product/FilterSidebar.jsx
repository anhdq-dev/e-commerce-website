import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";

const FilterSidebar = () => {
        const [searchParams, setSearchParams] = useSearchParams();
        const navigate = useNavigate();
        const [filters, setFilters] = useState({
            category: "",
            gender: "",
            color: "",
            size: [],
            material: [],
            brand: [],
            minPrice: 0,
            maxPrice: 100
        });
        const [priceRange, setPriceRange] = useState([0, 100]);
        const categories = ["Top Wear", "Bottom Wear"];
        const colors = [
            "Red",
            "Blue",
            "Black",
            "GREEN",
            "Yellow",
            "Gray",
            "White",
            "Pink",
            "Beige",
            "Navy"
        ];
        const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
        const materials = [
            "Cotton",
            "Wool",
            "Denim",
            "Polyester",
            "MST",
            "Linen",
            "Viscose",
            "Fleece"];
        const genders = ["Men", "Women"];
        const brands = ["LV", "Zara", "H&M"];

        const handleFilterChange = (e) => {
            const {name, value, checked, type} = e.target;
            let newFilters = {...filters};
            if (type === "checkbox") {
                if (checked) {
                    newFilters[name] = [...(newFilters[name] || []), value];
                } else {
                    newFilters[name] = newFilters[name].filter((item) => item !== value);
                }
            } else {
                newFilters[name] = value;
            }
            setFilters(newFilters);
            updateUrlParams(newFilters);
        };
        const updateUrlParams = (newFilter) => {
            const params = new URLSearchParams();
            //    {category: "Top Wear", size: ["XS", "S"]}
            Object.keys(newFilter).forEach((key) => {
                if (Array.isArray(newFilter[key]) && newFilter[key].length > 0) {
                    params.append(key, newFilter[key].join(","));
                } else if (newFilter[key]) {
                    params.append(key, newFilter[key]);
                }
            });
            setSearchParams(params);
            navigate(`?${params.toString()}`);
        };
        useEffect(() => {
            const params = Object.fromEntries([...searchParams]);
            setFilters({
                category: params.category || "",
                color: params.color || "",
                gender: params.gender || "",
                size: params.size ? params.size.split(",") : [],
                brand: params.brand ? params.brand.split(",") : [],
                material: params.material ? params.material.split(",") : [],
                minPrice: params.minPrice || 0,
                maxPrice: params.maxPrice || 100
            });
            setPriceRange([0, params.maxPrice || 100]);
        }, [searchParams]);

        const handlePriceChange = (e) => {
            const newPrice = e.target.value;
            setPriceRange([0, newPrice]);
            const newFilters = {...filters, minPrice: 0, maxPrice: newPrice};
            setFilters(filters);
            updateUrlParams(newFilters);
        };
        return <div className="p-4">
            <h3 className="text-xl font-medium text-gray-800 mb-4">
                Filter
            </h3>

            {/*    Category Filter   */}
            <div className="mb-6">
                <label className="block text-gray-600 font-bold text-xl mb-2">Category</label>
                {categories.map(category => (
                    <div key={category}
                         className="flex items-center mb-1">
                        <input
                            type="radio"
                            className="mr-2 w-4 h-4 text-blue-500 focus:ring-blue-400 bg-blue-300"
                            name="category"
                            value={category}
                            onChange={handleFilterChange}
                            checked={filters.category === category}
                        />
                        <span className="text-gray-700">{category}</span>
                    </div>
                ))}
            </div>

            {/*    Gender Filter   */}
            <div className="mb-6">
                <label className="block text-gray-600 font-bold text-xl mb-2">Gender</label>
                {genders.map(gender => (
                    <div key={gender}
                         className="flex items-center mb-1">
                        <input
                            type="radio"
                            className="mr-2 w-4 h-4 text-blue-500 focus:ring-blue-400 bg-blue-300"
                            name="gender"
                            value={gender}
                            onChange={handleFilterChange}
                            checked={filters.gender === gender}

                        />
                        <span className="text-gray-700">{gender}</span>
                    </div>
                ))}
            </div>

            {/*    Color Filter   */}
            <div className="mb-6">
                <label className="block text-gray-600 font-bold text-xl mb-2">Color</label>
                <div className="flex flex-wrap gap-2">
                    {colors.map(color => (
                        <button
                            key={color}
                            name="color"
                            className={`w-8 h-8 rounded-full border border-blue-300 cursor-pointer transition hover:scale-110 ${filters.color === color ? "ring-2 ring-blue-500" : ""}`}
                            style={{backgroundColor: color.toLocaleLowerCase()}}
                            value={color}
                            onClick={handleFilterChange}
                        >

                        </button>
                    ))}
                </div>
            </div>

            {/*   Size Filter    */}
            <div className="mb-6">
                <label className="block text-gray-600 font-bold text-xl mb-2">
                    Size
                </label>
                {sizes.map(size => (
                    <div key={size} className="flex items-center mb-1">
                        <input
                            type="checkbox"
                            name="size"
                            className="mr-2 h-4 w-4 text-blue-500 forcus:ring-blue-400 border-gray-300"
                            value={size}
                            checked={filters.size.includes(size)}
                            onChange={handleFilterChange}

                        />
                        <span className="text-gray-700">{size}</span>
                    </div>
                ))}
            </div>

            {/*   Material Filter    */}
            <div className="mb-6">
                <label className="block text-gray-600 font-bold text-xl mb-2">
                    Material
                </label>
                {materials.map(material => (
                    <div key={material} className="flex items-center mb-1">
                        <input
                            type="checkbox"
                            name="material"
                            className="mr-2 h-4 w-4 text-blue-500 forcus:ring-blue-400 border-gray-300"
                            value={material}
                            checked={filters.material.includes(material)}
                            onChange={handleFilterChange}
                        />
                        <span className="text-gray-700">{material}</span>
                    </div>
                ))}
            </div>

            {/*   Brand Filter    */}
            <div className="mb-6">
                <label className="block text-gray-600 font-bold text-xl mb-2">
                    Brand
                </label>
                {brands.map(brand => (
                    <div key={brand} className="flex items-center mb-1">
                        <input
                            type="checkbox"
                            name="brand"
                            className="mr-2 h-4 w-4 text-blue-500 forcus:ring-blue-400 border-gray-300"
                            value={brand}
                            checked={filters.brand.includes(brand)}
                            onChange={handleFilterChange}
                        />
                        <span className="text-gray-700">{brand}</span>
                    </div>
                ))}
            </div>

            {/*    Price Range Filter  */}
            <div className="mb-8">
                <label className="block text-gray-600 font-bold text-xl mb-2">
                    Price Range
                </label>
                <input
                    type="range"
                    name="priceRange"
                    min={0}
                    max={100}
                    className={"w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"}
                    value={priceRange[1]}
                    onChange={handlePriceChange}
                />
                <div className="flex justify-between text-gray-600 mt-2">
                    <span>$0</span>
                    <span>${priceRange[1]}</span>
                </div>
            </div>

        </div>;
    }
;

export default FilterSidebar;
