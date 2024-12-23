export const getImage = (url) => {
  return import.meta.env.VITE_CLOUDFRONT_URL + "/" + url;
};
