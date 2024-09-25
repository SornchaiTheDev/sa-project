export const fileSizeCalc = (size: number) => {
  const kb = 1024;
  const mb = kb * 1024;
  const gb = mb * 1024;
  if (size < kb) {
    return `${size} bytes`;
  } else if (size < mb) {
    return `${(size / kb).toFixed(2)} KB`;
  } else if (size < gb) {
    return `${(size / mb).toFixed(2)} MB`;
  } else {
    return `${(size / gb).toFixed(2)} GB`;
  }
};
