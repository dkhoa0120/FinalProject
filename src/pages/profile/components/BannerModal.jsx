import { useRef, createRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import * as authApi from "../../../service/api.auth";

export default function BannerModal({
  show,
  close,
  userDetails,
  setUser,
  setUserDetails,
}) {
  const bannerCropperRef = createRef();
  const hiddenFileInput = useRef(null);
  const [uploadedBanner, setUploadedBanner] = useState(null);
  const [modifiedTime, setModifiedTime] = useState(null);

  const handleChangeBanner = (e) => {
    if (!e) return;
    const files = e.target.files || (e.dataTransfer && e.dataTransfer.files);
    if (!files || files.length === 0) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setUploadedBanner(reader.result);
    });
    reader.readAsDataURL(files[0]);
  };

  const handleUploadBanner = () => {
    if (typeof bannerCropperRef.current?.cropper !== "undefined") {
      const croppedCanvas =
        bannerCropperRef.current?.cropper.getCroppedCanvas();
      croppedCanvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append("image", blob, "croppedImage.png");
        const result = await authApi.changeUserBanner(formData);
        result.data.bannerPath += `?lastModified=${modifiedTime}`;
        setUploadedBanner(null);
        setUser(result.data);
        setUserDetails(result.data);
        setModifiedTime(Date.now());
      });
    }
    console.log("hi");
  };

  return (
    <Modal
      show={show}
      onHide={close}
      backdrop="static"
      dialogClassName="modal-90w"
      id="update-banner-modal"
      centered
    >
      <Modal.Header>
        <Modal.Title className="ms-auto">Update Banner Photo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {uploadedBanner ? (
          <Cropper
            ref={bannerCropperRef}
            style={{ maxHeight: "60vh", width: "100%" }}
            aspectRatio={17 / 8}
            src={uploadedBanner}
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
        <div className="banner-upload-container">
          {uploadedBanner ? (
            <></>
          ) : (
            <img
              src={
                uploadedBanner instanceof Blob || uploadedBanner instanceof File
                  ? URL.createObjectURL(uploadedBanner)
                  : userDetails?.bannerPath || "/img/banner/groupBanner.png"
              }
              alt="uploadbanner"
              className="banner-display"
              onClick={() => hiddenFileInput.current.click()}
            />
          )}
          <input
            id="banner-upload-input"
            ref={hiddenFileInput}
            type="file"
            onChange={(e) => {
              handleChangeBanner(e);
            }}
          />
        </div>
        {uploadedBanner && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            {" "}
            <Button
              variant="success"
              onClick={() => {
                handleUploadBanner();
                close();
              }}
            >
              Save
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setUploadedBanner(null);
                close();
              }}
            >
              Cancel
            </Button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}
