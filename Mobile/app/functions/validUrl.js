
const isValidImageUrl = (imageUrl) => {
  if (imageUrl !== "" && !/^https?:\/\/.*\.(jpg|jpeg|png|gif)$/.test(imageUrl)) {
    return false;
  }
  return true;
};

export default isValidImageUrl;
