import { Fragment } from "react";
import { Label } from "../ui/label";
import { filterOptions } from "@/config";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

//! Step-1 Create a Product Filter for Listing Page
function ProductFilter({filters, handleFilter}) {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {/* Step-1-1 Create a Filter configuration in config file */}
        {/* Step-1-2 Map over the filter option in config */}
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment>
            <div>
              {/* Step-1-3 Display the Category and Brand*/}
              <h3 className="text-base font-bold">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {/* Step-1-4 Map over the filter options */}
                {filterOptions[keyItem].map((option) => (
                  <Label className="flex font-medium items-center gap-2 ">
                    {/* Step-1-5 Add a checkbox import it from schadcn */}
                    <Checkbox onCheckedChange={() => handleFilter(keyItem, option.id)}
                    checked={filters && Object.keys(filters).length > 0 && filters[keyItem]?.includes(option.id)}/>
                    {/* Step-1-5 Add a option*/}
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            {/* Step-1-6 Add a separator import it from schadcn */}
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
