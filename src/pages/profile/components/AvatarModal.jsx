import { useRef, createRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import * as authApi from "../../../service/api.auth";

export default function AvatarModal({
  show,
  onClose,
  onUpload,
  image,
  userDetails,
  handleImageChange,
}) {
  //React crop
  const [uploadedImage, setUploadedImage] = useState(null);
  const [cropData, setCropData] = useState(null);
  const cropperRef = createRef();

  const onChange = (e) => {
    console.log("Event:", e);
    if (!e) return;

    const files = e.target.files || (e.dataTransfer && e.dataTransfer.files);
    console.log("Files:", files);
    if (!files || files.length === 0) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setUploadedImage(reader.result);
    });
    reader.readAsDataURL(files[0]);
  };

  const uploadCroppedImage = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      const croppedCanvas = cropperRef.current?.cropper.getCroppedCanvas();
      croppedCanvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append("image", blob, "croppedImage.png");
        await authApi.changeUserAvatar(formData);
      });
    }
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      backdrop="static"
      dialogClassName="modal-90w"
      id="update-avt-modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Avatar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          id="image-upload-input"
          type="file"
          onChange={(e) => {
            onChange(e);
          }}
        />
        <br />
        <br />
        {uploadedImage ? (
          <Cropper
            ref={cropperRef}
            style={{ maxHeight: "60vh", width: "100%" }}
            aspectRatio={1}
            src={uploadedImage}
            viewMode={1}
            minCropBoxHeight={50}
            minCropBoxWidth={50}
            background={false}
            autoCropArea={1}
            checkOrientation={false}
          />
        ) : (
          <></>
        )}
        <div className="image-upload-container">
          {uploadedImage ? (
            <></>
          ) : (
            <img
              src={
                image instanceof Blob || image instanceof File
                  ? URL.createObjectURL(image)
                  : userDetails?.avatarPath || "/img/avatar/defaultAvatar.png"
              }
              alt="uploadimage"
              className={"image-display"}
            />
          )}
        </div>
        <Button
          variant="success"
          onClick={() => {
            uploadCroppedImage();
            onClose();
            onUpload();
          }}
        >
          Save
        </Button>
      </Modal.Body>
    </Modal>
  );
}
