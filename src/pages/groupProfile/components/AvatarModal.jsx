import { useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import * as groupApi from "../../../service/api.group";

export default function AvatarModal({
  show,
  close,
  groupDetails,
  setGroupDetails,
  groupId,
}) {
  //React crop
  const avatarCropperRef = useRef(null);
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
  const handleUploadAvatar = () => {
    if (typeof avatarCropperRef.current?.cropper !== "undefined") {
      const croppedCanvas = avatarCropperRef.current?.cropper.getCroppedCanvas({
        minWidth: 256,
        minHeight: 256,
        maxWidth: 1280,
        maxHeight: 1280,
      });
      croppedCanvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append("image", blob, "croppedImage.png");
        const result = await groupApi.changeGroupAvatar(groupId, formData); // Assuming the response contains the user details
        result.data.avatarPath += `?lastModified=${modifiedTime}`;
        setUploadedAvatar(null);
        setGroupDetails(result.data);
        setModifiedTime(Date.now());
      });
    }
  };

  return (
    <Modal
      show={show}
      onHide={close}
      backdrop={uploadedAvatar ? "static" : true}
      dialogClassName="modal-50w"
      id="update-avt-modal"
      centered
    >
      <Modal.Header style={{ justifyContent: "center" }}>
        <Modal.Title>Update profile picture</Modal.Title>
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
        <div className="upload-container">
          {uploadedAvatar ? (
            <></>
          ) : (
            <img
              src={
                uploadedAvatar instanceof Blob || uploadedAvatar instanceof File
                  ? URL.createObjectURL(uploadedAvatar)
                  : groupDetails?.avatarPath || "/img/avatar/defaultGroup.jpg"
              }
              alt="uploadimage"
              className={"image-display"}
              onClick={() => hiddenFileInput.current.click()}
            />
          )}
          <input
            id="upload-input"
            ref={hiddenFileInput}
            type="file"
            onChange={(e) => {
              handleChangeAvatar(e);
            }}
          />
        </div>
        {uploadedAvatar && (
          <div className="end-button">
            <Button
              variant="danger"
              onClick={() => {
                setUploadedAvatar(null);
                close();
              }}
            >
              Cancel
            </Button>
            <Button
              className="mr-2"
              variant="success"
              onClick={() => {
                handleUploadAvatar();
                close();
              }}
            >
              Save
            </Button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}
