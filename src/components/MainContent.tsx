import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
import { Tally3 } from "lucide-react";
import axios from "axios";
import { MobileSideBar, Sidebar } from "./Sidebar";
import { Products } from "../types";
import Cards from "./Cards";

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
    useFilter();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Products>([]);

  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      let url = `https://dummyjson.com/products?limits=${itemsPerPage}&skip=${
        (currentPage - 1) * itemsPerPage
      }`;

      if (keyword) url = `https://dummyjson.com/products/search?q=${keyword}`;

      setLoading(true);

      try {
        const res = await axios.get(url);
        setProducts(res.data.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, keyword]);

  const getFilterProducts = () => {
    let filteredProducts = products;

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }
    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice
      );
    }
    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      );
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    switch (filter) {
      case "expensive":
        return filteredProducts.sort((a, b) => b.price - a.price);
      case "popular":
        return filteredProducts.sort((a, b) => b.rating - a.rating);
      case "cheap":
        return filteredProducts.sort((a, b) => a.price - b.price);
      default:
        return filteredProducts;
    }
  };
  const filteredProducts = getFilterProducts();

  const totalProducts = 120;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPaginationButton = () => {
    const buttons: number[] = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage - 2 < 1)
      endPage = Math.min(totalPages, endPage + (2 - currentPage - 1));

    if (currentPage + 2 > totalPages)
      startPage = Math.min(1, startPage - (2 - totalPages - currentPage));

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(page);
    }
    return buttons;
  };

  return (
    <section className="p-5 h-full flex">
      <Sidebar />
      <div className="h-full w-full">
        <div className="flex justify-between w-full">
          <h1 className="text-2xl font-semibold">Random Store</h1>
          <MobileSideBar />
        </div>
        <div className="mb-5 flex flex-col h-full w-full">
          <div className="flex flex-col sm:flex-row justify-between items-center z-10">
            <div className="relative mb-5 mt-5">
              <button
                className="border px-4 py-2 rounded-full flex items-center"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <Tally3 className="mr-2" />
                {filter === "all"
                  ? "Filter"
                  : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>

              {dropdownOpen && (
                <div className="absolute bg-[rgb(20,20,20)] border border-gray-300 rounded mt-2 w-full sm:w-40">
                  {filterOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setFilter(option.value);
                        setDropdownOpen(false);
                      }}
                      className="block px-4 py-2 w-full text-left hover:bg-[rgba(255,255,255,0.1)] hover:text-white transition"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* products section */}

          <Cards products={filteredProducts} loading={loading} />

          {/* pagination section */}

          <div className="flex flex-col sm:flex-row justify-between items-center mt-auto">
            {/* previous */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded-full border px-4 py-2 mx-2 disabled:opacity-40"
            >
              Previous
            </button>

            <div className="flex flex-wrap justify-center">
              {/* pagination */}
              {getPaginationButton().map((page) => (
                <button
                  key={page}
                  className={`rounded-full border px-4 py-2 mx-1 ${
                    currentPage === page ? "bg-black text-white" : ""
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* next */}
            <button
              className="rounded-full border px-4 py-2 mx-2 disabled:opacity-40"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainContent;

const filterOptions = [
  { value: "cheap", label: "Cheap" },
  { value: "expensive", label: "Expensive" },
  { value: "popular", label: "Popular" },
];
