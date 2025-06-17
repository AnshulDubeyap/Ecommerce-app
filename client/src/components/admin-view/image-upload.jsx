import { useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import "./image-upload.css";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";

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
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
