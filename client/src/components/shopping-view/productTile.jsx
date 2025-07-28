import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {categoryOptionsMap} from "@/config/index.jsx";
import {brandOptionsMap} from "@/config/index.jsx";

function ShoppingProductTile({ product }) {
    console.log("PRODUCT DATA:", product);
    return (

        <Card className="w-full max-w-sm mx-auto">
            <div className="relative">
                {/* Step-1-2, Get the image from the product */}
                <img
                    src={product?.image}
                    alt={product?.title}
                    className="w-full h-[300px] object-cover rounded-t-lg"
                />
                {product?.salePrice > 0 && (
                    <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">Sale</Badge>
                )}
            </div>

            <CardContent className="p-4">
                <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground text-[16px]">{categoryOptionsMap[product?.category]}</span>
                    <span className="text-muted-foreground text-[16px]">{brandOptionsMap[product?.brand]}</span>
                </div>

                <div className="flex justify-between items-center">
          <span
              className={`${
                  product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
          >
            ₹{product?.price}
          </span>
                    {product?.salePrice > 0 && (
                        <span className="text-lg font-semibold text-primary">
              ₹{product?.salePrice}
            </span>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export default ShoppingProductTile;
