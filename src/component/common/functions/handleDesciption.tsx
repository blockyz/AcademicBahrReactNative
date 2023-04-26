const handleDescription = (str: string, num: number): string => {
  if (str.length <= num) {
    return str;
  } else {
    return (
      str && str.substring(0, str.substring(0, num).lastIndexOf(" ")) + " ..."
    );
  }
  // return str.split(" ").slice(0, num).join(" ") + " ...";
};
const CountSentences = (str: string, SentenseLength: number): number => {
  if (str.length <= SentenseLength) {
    return 1;
  } else {
    return Math.ceil(str.length / SentenseLength);
  }
};

export { handleDescription, CountSentences };
