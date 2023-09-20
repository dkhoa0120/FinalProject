// Convert images to blob format
export const convertToImage = async (imageInfos) => {
  return await Promise.all(
    imageInfos.map(async (imageInfo) => {
      const response = await fetch(imageInfo.url);
      return {
        name: imageInfo.name,
        data: await response.blob(),
      };
    })
  );
};

// Build form data for API requests
export const buildFormData = (data, images) => {
  const formData = new FormData();
  images.forEach((image) => formData.append("pages", image.data, image.name));

  for (const key in data) {
    if (key === "uploadingGroupId" || key === "language") {
      formData.append(key, data[key].value);
    } else {
      formData.append(key, data[key]);
    }
  }

  return formData;
};

// Handle selected images
export const handleSelectedImages = (e, imageInfos, setImageInfos) => {
  const appendedImageInfos = Array.from(e.target.files).map((f) => ({
    name: f.name,
    url: URL.createObjectURL(f),
  }));
  if (appendedImageInfos.length > 0) {
    setImageInfos([...imageInfos, ...appendedImageInfos]);
  }

  // Clear input so that the next image change will trigger the event
  e.target.value = null;
};

// Handle removal of selected images
export const handleRemoveImage = (index, imageInfos, setImageInfos) => {
  const nextImageInfos = [...imageInfos];
  nextImageInfos.splice(index, 1);
  setImageInfos(nextImageInfos);
};

// Handle drag and drop for images
export const handleDragOver = (
  index,
  draggedIndex,
  setDraggedIndex,
  imageInfos,
  setImageInfos
) => {
  if (draggedIndex === null || index === draggedIndex) {
    return;
  }
  const nextImageInfos = [...imageInfos];
  const [draggedImage] = nextImageInfos.splice(draggedIndex, 1);
  nextImageInfos.splice(index, 0, draggedImage);
  setImageInfos(nextImageInfos);
  setDraggedIndex(index);
};

export const handleDragOnPhone = (
  ePointerDown,
  index,
  container,
  imageInfos,
  setImageInfos,
  draggedIndex,
  setDraggedIndex
) => {
  // Prevent duplicate drag mirror
  if (draggedIndex !== null) {
    return;
  }
  // Prevent scrolling while dragging an image 2nd time (1st is still buggy)
  container.style.touchAction = "none";
  container.style.msTouchAction = "none";
  setDraggedIndex(index);

  const items = [...container.childNodes];
  const dragItem = items[index];
  const dragData = imageInfos[index];
  let newData = [...imageInfos];

  // clone drag item to drag mirror
  const dragMirror = dragItem.cloneNode(true);

  // set drag mirror to stick to the pointer
  const dragBoundingRect = dragItem.getBoundingClientRect();
  dragMirror.style.position = "fixed";
  dragMirror.style.zIndex = 5000;
  dragMirror.style.top = dragBoundingRect.top + "px";
  dragMirror.style.left = dragBoundingRect.left + "px";
  dragMirror.style.opacity = 0.8;

  // append drag mirror to the container
  container.appendChild(dragMirror);

  document.onpointermove = (ePointerMove) => {
    // Calculate the distance the mouse pointer has traveled.
    // original coordinates minus current coordinates.
    const posX = ePointerMove.clientX - ePointerDown.clientX;
    const posY = ePointerMove.clientY - ePointerDown.clientY;

    // Move Item
    dragMirror.style.transform = `translate(${posX}px, ${posY}px)`;

    items.forEach((item, itemIndex) => {
      const rect1 = dragMirror.getBoundingClientRect();
      const rect2 = item.getBoundingClientRect();

      let isOverlapping =
        rect1.right > rect2.left + rect2.width / 2 &&
        rect1.left + rect1.width / 2 < rect2.right &&
        rect1.bottom > rect2.top + rect2.height / 2 &&
        rect1.top + rect1.height / 2 < rect2.bottom;

      // Check for overlap
      if (isOverlapping && index !== itemIndex) {
        // Swap Data
        newData = imageInfos.filter((item) => item.url !== dragData.url);
        newData.splice(itemIndex, 0, dragData);
      }
    });
  };

  // finish onPointerDown event
  document.onpointerup = () => {
    document.onpointerup = null;
    document.onpointermove = null;
    container.removeChild(dragMirror);

    // Turn on scrolling for container
    container.style.touchAction = "";
    container.style.msTouchAction = "";
    setImageInfos(newData);
    setDraggedIndex(null);
  };
};
