/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
import { cn } from "../utils";

interface Product {
  category: string;
}

interface FetchResponse {
  products: Product[];
}

export const Sidebar = () => {
  return <Filter className={`max-md:hidden w-96 static`} />;
};

export const MobileSideBar = () => {
  const [sideBar, setSideBar] = useState(false);
  return (
    <div className="md:hidden">
      <button
        className="fixed top-5 z-30 right-5 cursor-pointer"
        onClick={() => setSideBar(!sideBar)}
      >
        {sideBar ? "X" : "#"}
      </button>
      {sideBar && (
        <div className=" md:hidden bg-black w-svw fixed top-0 left-0 z-20 h-full overflow-hidden">
          <Filter className="w-[80%] m-auto mt-[10%]" />
        </div>
      )}
    </div>
  );
};

const Filter = ({ className }: { className: string }) => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    setKeyword,
  } = useFilter();

  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "Fashion",
    "trend",
    "shoes",
    "shirt",
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data: FetchResponse = await response.json();
        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };
  const handleSelectedCategory = (category: string) => {
    setSelectedCategory(category);
  };
  const handleKeyword = (keyword: string) => {
    setKeyword(keyword);
  };

  const handleResetFilter = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword("");
  };
  const isStatic = className.includes("static");
  return (
    <div
      className={cn(
        `p-5 bg-[rgb(20,20,20)]`,
        className,
        isStatic ? "md:static md:top-0 " : ""
      )}
    >
      <input
        type="text"
        className="border-2 rounded px-2 py-3 w-full sm:mb-0 bg-black"
        placeholder="Search Product"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="flex justify-center items-center mt-3">
        <input
          type="text"
          className="border-2 mr-2 px-5 py-3 mb-3 w-full bg-black"
          placeholder="Min"
          value={minPrice ?? ""}
          onChange={handleMinPriceChange}
        />
        <input
          type="text"
          className="border-2 ml-2 px-5 py-3 mb-3 w-full bg-black"
          placeholder="Max"
          value={maxPrice ?? ""}
          onChange={handleMaxPriceChange}
        />
      </div>

      {/* categories section */}
      <div className="mb-5 text-white">
        <h2 className="text-xl font-semibold mb-3">Categories</h2>
      </div>
      <section>
        {categories.map((category, i) => (
          <label key={i} className="block mb-2 text-white">
            <input
              type="radio"
              name="category"
              value={category}
              onChange={() => handleSelectedCategory(category)}
              className="mr-2 size-[16px]"
              checked={selectedCategory === category}
            />
            {category.toUpperCase()}
          </label>
        ))}
      </section>

      {/* keywords section */}
      <div className="mb-5">
        <h2 className="text-xl font-semibold mb-3">Keywords</h2>
        <div>
          {keywords.map((keyword, i) => (
            <button
              key={i}
              className="block border text-left rounded  hover:bg-[rgba(255,255,255,0.1)] transition w-full px-4 py-2 mb-2 "
              onClick={() => handleKeyword(keyword)}
            >
              {keyword.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <button
        className="w-full mb-[4rem] py-2  rounded mt-5 border border-white hover:bg-[rgba(255,255,255,0.1)] transition"
        onClick={handleResetFilter}
      >
        Reset Filter
      </button>
    </div>
  );
};
