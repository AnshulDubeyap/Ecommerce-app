//! Step-21,Create the home page in the shopping-view

import { useState } from "react";
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
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllFilteredProducts } from "@/store/shop/products-slice";
import { useSelector } from "react-redux";
import ShoppingProductTile from "@/components/shopping-view/productTile";
import { useSearchParams } from "react-router-dom";

//! Step-21-0, Create sorting options
const sortOptions = [
  { id: "price-low-high", label: "Price: Low to High" },
  { id: "price-high-low", label: "Price: High to Low" },
  { id: "newest", label: "Newest" },
  { id: "oldest", label: "Oldest" },
];

function createSearchParamsHelper(filterParams) {
  const queryParams = []

  for(const [key, value] of Object.entries(filterParams)) {
    if(Array.isArray(value) && value.length > 0) {
      const ParamValue = value.join(',')
      queryParams.push(`${key}=${encodeURIComponent(ParamValue)}`)
    }
  }
  return queryParams.join('&')
}

function ShoppingListing() {
  // fetch products
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.shopProducts);
  console.log(productList);

  //! Step-21-1, Create a grid layout for the listing page
  const [sort, setSort] = useState(null);
  const [filters, setFilters] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  console.log(searchParams);

  function handleSort(value) {
    console.log(value);
    setSort(value);
    // You can add product reordering logic here
  }

  function handleFilter(getSectionId, getCurrentOption) {
    console.log(getSectionId, getCurrentOption);

    // copy filters
    const updatedFilters = { ...filters };

    // if the section exists, toggle the option
    if (updatedFilters[getSectionId]) {
      const index = updatedFilters[getSectionId].indexOf(getCurrentOption);

      if (index !== -1) {
        // remove if already selected
        updatedFilters[getSectionId].splice(index, 1);
      } else {
        // add new selection
        updatedFilters[getSectionId].push(getCurrentOption);
      }

      // remove the key if empty
      if (updatedFilters[getSectionId].length === 0) {
        delete updatedFilters[getSectionId];
      }
    } else {
      // section doesn't exist, create it
      updatedFilters[getSectionId] = [getCurrentOption];
    }

    console.log(updatedFilters);

    setFilters(updatedFilters);

    // set the filters in session storage
    sessionStorage.setItem("filters", JSON.stringify(updatedFilters));
  }

  // default sort and filters on page load
  useEffect(() => {
    setSort('price-low-high');
    setFilters(JSON.parse(sessionStorage.getItem('filters')) || {});
  }, []);

  // useSearchParams for getting category and brand
  useEffect(() => {
    if(filters && Object.keys(filters).length > 0) {
      const createqueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createqueryString));
    }
  }, [filters]);

  useEffect(() => {
    if (sort !== null && filters !== null) {
      dispatch(fetchAllFilteredProducts({ filterParams: filters, sortParams: sort }));
    }
  }, [dispatch, sort, filters]);

  console.log(filters);

  return (
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
        {/* Step-21-2, Render the Product Filter from filter.jsx */}
        <ProductFilter filters={filters} handleFilter={handleFilter} />

        {/* Step-21-3, Create the main product display panel */}
        <div className="bg-background w-full rounded-lg shadow-sm">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-extrabold">All Products</h2>
            {/* Step-21-4, Add number of products */}
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">{productList.length} Products</span>
            </div>
            {/* Step-21-5, Create a dropdown menu for sorting products */}
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {/* Step-21-5-1, Render the sort button with icon */}
                  <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                  >
                    <ArrowUpDownIcon className="h-4 w-4" />
                    <span>Sort by</span>
                  </Button>
                </DropdownMenuTrigger>
                {/* Step-21-5-2, Render the sort options */}
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                    {sortOptions.map((sortItem) => (
                        <DropdownMenuRadioItem
                            value={sortItem.id}
                            key={sortItem.id}
                        >
                          {sortItem.label}
                        </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Step-21-5, Products would be rendered here in future */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 p-4">
            {productList.map((product) => (
                <ShoppingProductTile key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
  );
}

export default ShoppingListing;
