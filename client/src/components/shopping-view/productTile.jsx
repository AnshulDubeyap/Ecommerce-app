import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { categoryOptionsMap, brandOptionsMap } from "@/config/index.jsx";

function ShoppingProductTile({ product, HandleProductDetails, handleAddToCart }) {
    console.log("PRODUCT DATA:", product);

    return (
        <Card className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div
                onClick={() => {
                    console.log("Product ID:", product._id);
                    HandleProductDetails(product._id);
                }}
                className="cursor-pointer"
            >
                <div className="relative overflow-hidden rounded-t-xl">
                    <img
                        src={product?.image}
                        alt={product?.title}
                        className="w-full h-[300px] object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {product?.salePrice > 0 && (
                        <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 text-white font-medium px-3 py-1 text-sm rounded-full shadow-sm">
                            Sale
                        </Badge>
                    )}
                </div>

                <CardContent className="p-5 flex flex-col gap-3">
                    <h2 className="text-xl font-semibold text-gray-800 line-clamp-2">
                        {product?.title}
                    </h2>

                    <div className="flex justify-between items-center text-sm text-gray-500">
                        <span className="bg-gray-100 px-2 py-1 rounded-md">
                            {categoryOptionsMap[product?.category]}
                        </span>
                        <span className="bg-gray-100 px-2 py-1 rounded-md">
                            {brandOptionsMap[product?.brand]}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <span
                            className={`text-lg font-semibold ${
                                product?.salePrice > 0
                                    ? "text-gray-400 line-through"
                                    : "text-primary"
                            }`}
                        >
                            ${product?.price}
                        </span>
                        {product?.salePrice > 0 && (
                            <span className="text-lg font-semibold text-green-600">
                                ${product?.salePrice}
                            </span>
                        )}
                    </div>

                    <button
                        onClick={() => handleAddToCart(product._id)}
                        className="mt-3 w-full py-2 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary-dark transition-colors duration-200"
                    >
                        Add to Cart
                    </button>
                </CardContent>
            </div>
        </Card>
    );
}

export default ShoppingProductTile;
