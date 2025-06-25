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

//! Step-21-0, Create sorting options
const sortOptions = [
  { id: "price-low-high", label: "Price: Low to High" },
  { id: "price-high-low", label: "Price: High to Low" },
  { id: "newest", label: "Newest" },
  { id: "oldest", label: "Oldest" },
];

function ShoppingListing() {
  //! Step-21-1, Create a grid layout for the listing page
  const [sort, setSort] = useState("price-low-high");

  function handleSort(value) {
    setSort(value);
    // You can add product reordering logic here
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      {/* Step-21-2, Render the Product Filter from filter.jsx */}
      <ProductFilter />

      {/* Step-21-3, Create the main product display panel */}
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          {/* Step-21-4, Add number of products */}
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">10 Products</span>
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
        <div className="p-4 text-muted-foreground italic">
          Product grid will go here...
        </div>
      </div>
    </div>
  );
}

export default ShoppingListing;
