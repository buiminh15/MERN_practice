export const deleteTexts = () => {
  setContent('');
};

export const handleCopy = () => {
  setCopied(true);
  setTimeout(() => {
    setCopied(false);
  }, 1000);
};