import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

export default function PageUploader({
  containerRef,
  fileInputRef,
  handleSelected,
  imageInfos,
  setImageInfos,
  handleRemove,
  draggedIndex,
  setDraggedIndex,
  handleDrag,
  dragStart,
}) {
  const [imageOverlayIndex, setImageOverlayIndex] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [imageOverlaySize, setImageOverlaySize] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const imageOverlayRef = useRef(null);
  const dropZoneRef = useRef(null);

  // Add dnd event to window
  useEffect(() => {
    const handleDragEnter = (e) => {
      e.preventDefault();
      if (e.dataTransfer.types.includes("Files")) {
        setIsDragOver(true);
      }
    };

    const handleDragOver = (e) => {
      e.preventDefault();
    };

    const handleDragLeave = (e) => {
      setIsDragOver(false);
    };

    const handleDrop = (e) => {
      e.preventDefault();
      setIsDragOver(false);

      let nonImageFileLogged = false;

      const appendedImageInfos = Array.from(e.dataTransfer.files)
        .map((f) => {
          if (f.type.startsWith("image/")) {
            return {
              name: f.name,
              url: URL.createObjectURL(f),
            };
          } else {
            if (!nonImageFileLogged) {
              toast.info("Some non-images files were skipped");
              nonImageFileLogged = true;
            }
            return null;
          }
        })
        .filter(Boolean);

      if (appendedImageInfos.length > 0) {
        setImageInfos([...imageInfos, ...appendedImageInfos]);
      }
    };

    const dropZone = dropZoneRef.current;

    window.addEventListener("dragenter", handleDragEnter);
    dropZone.addEventListener("dragover", handleDragOver);
    dropZone.addEventListener("dragleave", handleDragLeave);
    dropZone.addEventListener("drop", handleDrop);

    return () => {
      // Remove the event listeners when the component is unmounted
      window.removeEventListener("dragenter", handleDragEnter);
      dropZone.removeEventListener("dragover", handleDragOver);
      dropZone.removeEventListener("dragleave", handleDragLeave);
      dropZone.removeEventListener("drop", handleDrop);
    };
  }, [imageInfos, setImageInfos]);

  // Resize image navigation
  useEffect(() => {
    // Calculate the size of the displayed image when it changes
    if (imageOverlayIndex !== null) {
      const rect = imageOverlayRef.current.getBoundingClientRect();
      setImageOverlaySize({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    }

    // Click left right arrow on keyboard to navigate images
    if (imageOverlayIndex >= 0) {
      const handleKeyDown = (e) => {
        switch (e.key) {
          case "ArrowLeft":
            if (imageOverlayIndex === 0) return;
            e.stopPropagation();
            if (imageOverlayIndex !== null && imageOverlayIndex >= 0) {
              setImageOverlayIndex(imageOverlayIndex - 1);
            }
            break;
          case "ArrowRight":
            if (
              imageOverlayIndex !== null &&
              imageOverlayIndex < imageInfos.length - 1
            ) {
              e.stopPropagation();
              setImageOverlayIndex(imageOverlayIndex + 1);
            }
            break;
          case "Escape":
            if (imageOverlayIndex !== null) {
              e.stopPropagation();
              setImageOverlayIndex(null);
            }
            break;
          default:
            break;
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      // Cleanup the event listener when the component unmounts
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [imageOverlayIndex, imageInfos]);

  const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

  return (
    <>
      <div
        className="image-container justify-left flex-wrap mb-4"
        ref={containerRef}
      >
        {imageInfos.map((imageInfo, index) => (
          <div
            key={imageInfo.url}
            className={`pages-upload-card flex-grow-0 ${
              draggedIndex === index ? "dragging" : ""
            }`}
            onClick={() => setImageOverlayIndex(index)}
            onDragStart={() => setDraggedIndex(index)}
            onDragOver={(e) => handleDrag(e, index)}
            onDragEnd={() => setDraggedIndex(null)}
            onPointerDown={(e) => {
              isMobile && dragStart(e, index, imageInfo);
            }}
            draggable="true"
          >
            <div
              className="page"
              style={{
                backgroundImage: `url(${imageInfo.url})`,
              }}
            >
              <div
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(index);
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </div>
              <div className="drag-button">
                <i className="fa-solid fa-arrows-up-down-left-right"></i>
              </div>
              <div className="image-label">{imageInfo.name}</div>
            </div>
          </div>
        ))}
        <div
          className="input-pages"
          onClick={() => fileInputRef.current.click()}
        >
          <i className="fa-solid fa-plus" />
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleSelected}
        style={{ display: "none" }}
        multiple
      />
      {imageInfos.length > 0 ? (
        <div>
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => setImageInfos([])}
          >
            Remove all pages
          </button>
        </div>
      ) : (
        <></>
      )}
      {imageOverlayIndex !== null && (
        <div
          className="overlay-container"
          onClick={(e) => {
            e.stopPropagation();
            setImageOverlayIndex(null);
          }}
        >
          <div className="image-overlay">
            <img
              className="centered-image"
              src={imageInfos[imageOverlayIndex].url}
              alt={imageInfos[imageOverlayIndex].name}
              ref={imageOverlayRef}
            />
          </div>
          <div
            className="arrow-overlay"
            style={{
              top: imageOverlaySize.top + "px",
              left: imageOverlaySize.left + "px",
              width: imageOverlaySize.width + "px",
              height: imageOverlaySize.height + "px",
            }}
          >
            {imageOverlayIndex > 0 ? (
              <div
                className="arrow left"
                onClick={(e) => {
                  e.stopPropagation();
                  setImageOverlayIndex(imageOverlayIndex - 1);
                }}
              >
                <i className="fa-solid fa-angle-left p-3" />
              </div>
            ) : (
              <></>
            )}
            {imageOverlayIndex < imageInfos.length - 1 ? (
              <div
                className="arrow right"
                onClick={(e) => {
                  e.stopPropagation();
                  setImageOverlayIndex(imageOverlayIndex + 1);
                }}
              >
                <i className="fa-solid fa-angle-right p-3" />
              </div>
            ) : (
              <></>
            )}
          </div>
          <div
            className="close-overlay"
            onClick={() => setImageOverlayIndex(null)}
          >
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
      )}

      <div
        className={`drop-zone ${isDragOver ? "visible" : ""}`}
        ref={dropZoneRef}
      >
        <span style={{ pointerEvents: "none" }}>
          Drag one or more files to this <i>drop zone</i>
        </span>
      </div>
    </>
  );
}
