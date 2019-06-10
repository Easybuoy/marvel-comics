const trimWord = (string, number, type = "description") => {
  if (!string) {
    return `No ${type} available for this character.`;
  }

  if (number === 0) {
    return string;
  }

  return `${string.substring(0, number)}...`;
};

export { trimWord };
