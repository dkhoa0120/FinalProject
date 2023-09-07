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
