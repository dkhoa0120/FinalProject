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
  let isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

  return (
    <>
      <div
        className="image-container justify-left flex-wrap mb-4"
        ref={containerRef}
      >
        {imageInfos.map((imageInfo, index) => (
          <div
            key={imageInfo.name}
            className={`pages-upload-card flex-grow-0 ${
              draggedIndex === index ? "dragging" : ""
            }`}
            onDragStart={() => setDraggedIndex(index)}
            onDragOver={(e) => handleDrag(e, index)}
            onDragEnd={() => setDraggedIndex(null)}
            onPointerDown={(e) => {
              if (isMobile) dragStart(e, index, imageInfo);
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
                onClick={() => handleRemove(index)}
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
    </>
  );
}
