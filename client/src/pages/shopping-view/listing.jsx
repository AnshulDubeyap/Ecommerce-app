import { useState, useEffect } from "react";
import ProductFilter from "@/components/shopping-view/filter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice";
import { useSearchParams } from "react-router-dom";
import ShoppingProductTile from "@/components/shopping-view/productTile";
import ProductDetailsDialog from "@/components/shopping-view/product-details.jsx";
import {addToCart} from "@/store/shop/cart-slice";


const sortOptions = [
  { id: "price-low-high", label: "Price: Low to High" },
  { id: "price-high-low", label: "Price: High to Low" },
  { id: "newest", label: "Newest" },
  { id: "oldest", label: "Oldest" },
];

function createSearchParamsHelper(filterParams) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("&");
}

function ShoppingListing() {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const [sort, setSort] = useState("price-low-high");
  const [filters, setFilters] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  function handleSort(value) {
    setSort(value);
  }

  function handleFilter(getSectionId, getCurrentOption) {
    const updatedFilters = { ...filters };
    if (updatedFilters[getSectionId]) {
      const index = updatedFilters[getSectionId].indexOf(getCurrentOption);
      if (index !== -1) {
        updatedFilters[getSectionId].splice(index, 1);
      } else {
        updatedFilters[getSectionId].push(getCurrentOption);
      }
      if (updatedFilters[getSectionId].length === 0) {
        delete updatedFilters[getSectionId];
      }
    } else {
      updatedFilters[getSectionId] = [getCurrentOption];
    }
    setFilters(updatedFilters);
    sessionStorage.setItem("filters", JSON.stringify(updatedFilters));
  }

  function handleAddToCart(getCurrentProductId) {
    console.log("Product ID:", getCurrentProductId);
    dispatch(addToCart({
      userId: user?._id,
      productId: getCurrentProductId,
      quantity: 1
    })).then((data) => {
      console.log("Product added to cart:", data);
    });

  }

  useEffect(() => {
    setSort("price-low-high");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    if (Object.keys(filters).length > 0) {
      const queryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(queryString));
    } else {
      setSearchParams(new URLSearchParams());
    }
  }, [filters]);

  useEffect(() => {
    if (sort !== null && filters !== null) {
      dispatch(fetchAllFilteredProducts({ filterParams: filters, sortParams: sort }));
    }
  }, [dispatch, sort, filters]);

  useEffect(() => {
    if (productDetails) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  const handleProductDetails = (getCurrentProductId) => {
    dispatch(fetchProductDetails(getCurrentProductId));
  };

  return (
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6 p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
        {/* Filter Panel */}
        <div className="bg-white rounded-xl p-6 sticky top-4 h-fit">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Filters</h2>
          <ProductFilter filters={filters} handleFilter={handleFilter} />
        </div>

        {/* Main Product Display */}
        <div className="bg-white rounded-xl">
          <div className="p-4 sm:p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              All Products
            </h2>
            <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 font-medium">
              {productList.length} Products
            </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 text-gray-700 border-gray-300 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <ArrowUpDownIcon className="h-4 w-4" />
                    <span>Sort by: {sortOptions.find((opt) => opt.id === sort)?.label}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px] bg-white shadow-lg rounded-lg p-2">
                  <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                    {sortOptions.map((sortItem) => (
                        <DropdownMenuRadioItem
                            key={sortItem.id}
                            value={sortItem.id}
                            className="text-sm text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2"
                        >
                          {sortItem.label}
                        </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 sm:p-6">
            {productList.length > 0 ? (
                productList.map((product) => (
                    <ShoppingProductTile
                        key={product._id}
                        product={product}
                        HandleProductDetails={handleProductDetails}
                        handleAddToCart={handleAddToCart}
                    />
                ))
            ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">No products found.</p>
                </div>
            )}
          </div>
        </div>

        <ProductDetailsDialog
            open={openDetailsDialog}
            setOpen={setOpenDetailsDialog}
            productDetails={productDetails}
        />
      </div>
  );
}

export default ShoppingListing;