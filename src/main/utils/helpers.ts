export const removeIllegalCharactersFromFilename = (filename: string) => {
  return filename.replace(/[/\\?%*:|"<>]/g, "-");
};
