const trimWord = (string, number, type = "description") => {
  if (!string) {
    return `No ${type} available for this character.`;
  }

  if (string.length < number) {
    return string;
  }

  if (number === 0) {
    return string;
  }

  return `${string.substring(0, number)}...`;
};

const formImage = (path, variant, extension) => {
  if (!variant) {
    return `${path}.${extension}`;
  }

  return `${path}/variant.${extension}`;
};

export { trimWord, formImage };
