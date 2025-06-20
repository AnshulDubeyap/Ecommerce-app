import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

//! Step-1, Create a Product Tile
function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    //! Step-1-1, Use the Card components from shadcn
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          {/* Step-1-2, Get the image from the product */}
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>

        <CardContent>
          {/* Step-1-3, Get the title and price from the product */}
          <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>

          <div className="flex justify-between items-center mb-2">
            {/* Step-1-4, if product sale price '>' 0, show a line through */}
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold">${product?.salePrice}</span>
            ) : null}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center">
          {/* Step-1-5, Add a delete and edit button */}
          <Button
            //! Step-1-5-1, Add a onClick event to open the dialog, set the current edited id, and set the form data
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(product?._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;
