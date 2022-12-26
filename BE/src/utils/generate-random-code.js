exports.generateRandomCode = () => {
  return Math.floor(Math.random() * 10 ** 5)
    .toString()
    .padStart("0", 5);
};
