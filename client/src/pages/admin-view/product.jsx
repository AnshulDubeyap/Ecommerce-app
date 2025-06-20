import { Button } from "@/components/ui/button";
import { Fragment, use, useEffect, useState } from "react";
import "./products.css";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import CommonForm from "@/components/common/form";
import { addProductFormElements } from "@/config";
import ProductImageUpload from "@/components/admin-view/image-upload";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct, fetchAllProducts } from "@/store/admin/product-slice";
import { toast } from "sonner";
import { Title } from "@radix-ui/react-dialog";

//! Step-13-6-2, Create a initialFormData
const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

//! Step-13, Create a Product Page
function AdminProducts() {
  //! Step-13-2, Add a State variable for button to open and close sheet
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  //! Step-13-6-1, Add a State variable for formData coming form CommonForm
  const [formData, setFormData] = useState(initialFormData);
  //! Step-13-6-3, Add a OnSubmit function for commonForm

  const { productList } = useSelector((state) => state.adminProduct);

  const dispatch = useDispatch(); // Step-14, Use the dispatch function for async thunk

  function onSubmit(event) {
    event.preventDefault();

    // Step-14-1, Dispatch the addNewProduct thunk with formData
    dispatch(
      addNewProduct({
        ...formData,
        image: uploadedImageUrl,
      })
    ).then((data) => {
      console.log(data);

      // Step-14-2, On success, close sheet, reset form, and show toast
      if (data?.payload?.success) {
        setOpenCreateProductDialog(false);
        dispatch(fetchAllProducts()); // Step-14-3, Refresh the list after adding
        setImageFile(null);
        setFormData(initialFormData);
        toast.success("Product added successfully");
        // Step-14-4, Show toast after product added
      }
    });
  }

  useEffect(() => {
    dispatch(fetchAllProducts()); // Step-15, Fetch products on component mount
  }, [dispatch]);

  //! Step-13-7-1, Add a State variable for image file
  const [imageFile, setImageFile] = useState(null);
  //! Step-13-7-2, Add a State variable for image url
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  //! Step-13-7-4, Add a State variable for loading state of image upload to cloudinary
  const [imageLoadingState, setImageLoadingState] = useState(false);

  return (
    <Fragment>
      {/* Step 13-1, Add a button for creating a product */}
      <div className="product-button">
        {/* Step-13-2-1, Add a onClick property to button */}
        <Button
          onClick={() => {
            setOpenCreateProductDialog(true);
          }}
        >
          Add New Products
        </Button>
      </div>

      {/* Step-13-3, Add a Sheet component for filling the details of product */}
      {/* Step-13-4, Add a onOpenChange property to open sheet when button clicked */}
      <Sheet
        open={openCreateProductDialog}
        onOpenChange={setOpenCreateProductDialog}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>

          {/* Step-13-5, Create a form container for commonForm */}
          <div className="form-container">
            {/* Step-13-7, Import the upload image component */}
            {/* Step-13-7-3, Pass the states in the component as props */}
            <ProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              imageLoadingState={imageLoadingState}
              setImageLoadingState={setImageLoadingState}
            />

            {/* Step-13-6, Render CommonForm and its properties */}
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
              buttonText={"Add"}
            />
          </div>
        </SheetContent>
      </Sheet>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* You can render products here */}
      </div>
    </Fragment>
  );
}

export default AdminProducts;
