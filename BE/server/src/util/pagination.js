exports.pagination = (page, perpage) => {
  const limit = perpage;
  const offSet = perpage * (page - 1);

  return { limit, offSet };
};
