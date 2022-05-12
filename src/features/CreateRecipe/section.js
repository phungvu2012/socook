export function handlePreviewAvatar(images = []) {
  return images.map((value, index) => {
    return {
      ...value,
      preview: {
        src: URL.createObjectURL(value),
        alt: "preview avatar",
      },
    };
  });
}

// export function ingredient() {
//   ret
// }