import { useRef, createRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import * as authApi from "../../../service/api.auth";

export default function AvatarModal({
  show,
  close,
  userDetails,
  setUser,
  setUserDetails,
}) {
  //React crop
  const avatarCropperRef = createRef();
  const hiddenFileInput = useRef(null);
  const [uploadedAvatar, setUploadedAvatar] = useState(null);
  const [modifiedTime, setModifiedTime] = useState(null);

  const handleChangeAvatar = (e) => {
    if (!e) return;
    const files = e.target.files || (e.dataTransfer && e.dataTransfer.files);
    if (!files || files.length === 0) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setUploadedAvatar(reader.result);
    });
    reader.readAsDataURL(files[0]);
  };
  const hanldeUploadAvatar = () => {
    if (typeof avatarCropperRef.current?.cropper !== "undefined") {
      const croppedCanvas =
        avatarCropperRef.current?.cropper.getCroppedCanvas();
      croppedCanvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append("image", blob, "croppedImage.png");
        const result = await authApi.changeUserAvatar(formData); // Assuming the response contains the user details
        result.data.avatarPath += `?lastModified=${modifiedTime}`;
        setUploadedAvatar(null);
        setUser(result.data);
        setUserDetails(result.data);
        setModifiedTime(Date.now());
      });
    }
  };

  return (
    <Modal
      show={show}
      onHide={close}
      backdrop="static"
      dialogClassName="modal-90w"
      id="update-avt-modal"
      centered
    >
      <Modal.Header>
        <Modal.Title className="ms-auto">Update profile picture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {uploadedAvatar ? (
          <Cropper
            ref={avatarCropperRef}
            style={{ maxHeight: "60vh", width: "100%" }}
            aspectRatio={1}
            src={uploadedAvatar}
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
          {uploadedAvatar ? (
            <></>
          ) : (
            <img
              src={
                uploadedAvatar instanceof Blob || uploadedAvatar instanceof File
                  ? URL.createObjectURL(uploadedAvatar)
                  : userDetails?.avatarPath || "/img/avatar/defaultAvatar.png"
              }
              alt="uploadimage"
              className={"image-display"}
              onClick={() => hiddenFileInput.current.click()}
            />
          )}
          <input
            id="image-upload-input"
            ref={hiddenFileInput}
            type="file"
            onChange={(e) => {
              handleChangeAvatar(e);
            }}
          />
        </div>
        {uploadedAvatar && (
          <div style={{ textAlign: "right", marginTop: "20px" }}>
            {" "}
            <Button
              variant="success"
              onClick={() => {
                hanldeUploadAvatar();
                close();
              }}
            >
              Save
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setUploadedAvatar(null);
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
