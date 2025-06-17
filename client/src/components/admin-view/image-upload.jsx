import { useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import "./image-upload.css";
import { UploadCloudIcon } from "lucide-react";

function ProductImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
}) {
  function handelImageFileChange(event) {
    console.log(event.target.files);
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  }

  function handelDragOver() {}
  function handelDrop() {}
  const inputRef = useRef();
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
        />
        {!imageFile ? (
          <Label htmlFor="image-upload" className="drag-drop-label">
            <UploadCloudIcon />
            <span>Drag & Drop image</span>
          </Label>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
