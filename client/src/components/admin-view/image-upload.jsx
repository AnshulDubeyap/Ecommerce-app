import { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import "./image-upload.css";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
}) {
  function handelImageFileChange(event) {
    console.log(event.target.files);
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  }

  function handelDragOver(event) {
    event.preventDefault();
  }
  function handelDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }
  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }
  const inputRef = useRef();

  async function handelImageUploadToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);

    const response = await axios.post(
      "http://localhost:5000/api/admin/products/upload-image",
      data
    );
    console.log(response, "response");

    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);
      setImageLoadingState(false);
      console.log(response.data.result.url);
    }
  }

  useEffect(() => {
    if (imageFile !== null) {
      handelImageUploadToCloudinary();
    }
  }, [imageFile]);
  return (
    <div className="container">
      <Label className="label">Upload Image</Label>
      <div onDragOver={handelDragOver} onDrop={handelDrop}>
        <Input
          id="image-upload"
          className="hidden"
          type="file"
          ref={inputRef}
          onChange={handelImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label htmlFor="image-upload" className="drag-drop-label">
            <UploadCloudIcon />
            <span>Drag & Drop image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="file-info">
            <div className="file-description">
              <FileIcon className="file-icon text-primary " />
            </div>
            <p className="file-name">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="cancel-button-icon" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
