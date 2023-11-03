export const removeHTMLTags = (string) => {
  const regex = /<(?!br\s*\/?)[^>]+>/g;
  var str = string.replace(regex, "");
  return str.replace(/<br>/g, "\n");
};
