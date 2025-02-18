import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";

const FilterSidebar = () => {
        const [searchParams, setSearchParams] = useSearchParams();
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
        return <div className="p-4">
            <h3 className="text-xl font-medium text-gray-800 mb-4">
                Filter
            </h3>
            {/*    Category  */}
        </div>;
    }
;

export default FilterSidebar;
