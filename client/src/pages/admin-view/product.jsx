import { Button } from "@/components/ui/button";
import { Fragment, useState } from "react";
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
  function onSubmit() {}
  //! Step-13-7-1, Add a State variable for image file
  const [imageFile, setImageFile] = useState(null);
  //! Step-13-7-2, Add a State variable for image url
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
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
