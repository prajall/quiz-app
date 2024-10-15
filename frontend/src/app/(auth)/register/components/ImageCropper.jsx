import React, { useState, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ImageCropper = ({ selectedImage, onSubmitCroppedImage }) => {
  const [crop, setCrop] = useState({
    unit: "%",
    x: 25,
    y: 25,
    width: 50,
    height: 50,
    aspect: 1,
  });
  const [imageRef, setImageRef] = useState(null);
  const imgRef = useRef(null);

  const makeClientCrop = (crop) => {
    if (imageRef && crop.width && crop.height) {
      const canvas = document.createElement("canvas");
      const scaleX = imageRef.naturalWidth / imageRef.width;
      const scaleY = imageRef.naturalHeight / imageRef.height;
      canvas.width = crop.width * scaleX;
      canvas.height = crop.height * scaleY;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        imageRef,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY
      );

      const base64Image = canvas.toDataURL("image/jpeg");
      onSubmitCroppedImage(base64Image);
    }
  };
  const onImageLoaded = (image) => {
    const { naturalWidth, naturalHeight } = image.currentTarget;

    setImageRef(image.currentTarget);
    imgRef.current = image.currentTarget;
    let width = 150;
    let height = 150;

    setCrop({
      unit: "px",
      width,
      height,
      x: 0,
      y: 0,
    });
    makeClientCrop(crop);
  };

  const onCropChange = (newCrop) => {
    setCrop(newCrop);
    makeClientCrop(newCrop);
  };

  return (
    <>
      <ReactCrop
        crop={crop}
        keepSelection
        circularCrop
        onChange={(pixelCrop, percentCrop) => onCropChange(pixelCrop)}
        aspect={1}
        minWidth={70}
        minHeight={70}
        className="w-fit mx-auto"
      >
        <img src={selectedImage} alt="Source" onLoad={onImageLoaded} />
      </ReactCrop>
    </>
  );
};

export default ImageCropper;
