export default function PageUploader({
  containerRef,
  fileInputRef,
  handleSelected,
  imageInfos,
  setImageInfos,
  handleRemove,
  draggedIndex,
  dragStart,
}) {
  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleSelected}
        style={{ display: "none" }}
        multiple
      />
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
            style={{
              backgroundImage: `url(${imageInfo.url})`,
            }}
            onPointerDown={(e) => dragStart(e, index, imageInfo)}
            draggable="true"
          >
            <button
              type="button"
              className="delete-button"
              onClick={() => handleRemove(index)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            {/* <button type="button" className="drag-button">
              <i className="fa-solid fa-arrows-up-down-left-right"></i>
            </button> */}
            <div className="image-label">{imageInfo.name}</div>
          </div>
        ))}
        <div
          className="input-pages"
          onClick={() => fileInputRef.current.click()}
        >
          <i className="fa-solid fa-plus" />
        </div>
      </div>
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
