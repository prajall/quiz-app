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

  const onImageLoaded = (image) => {
    const { naturalWidth, naturalHeight } = image.currentTarget;
    console.log(naturalHeight, naturalWidth);
    setImageRef(image.currentTarget);
    imgRef.current = image.currentTarget;
    const aspect = 1;
    const width = 50;
    const height = width / aspect;
    setCrop({
      unit: "%",
      width,
      height,
      x: (100 - width) / 2,
      y: (100 - height) / 2,
      aspect,
    });
  };

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
      >
        <img src={selectedImage} alt="Source" onLoad={onImageLoaded} />
      </ReactCrop>
    </>
  );
};

export default ImageCropper;
