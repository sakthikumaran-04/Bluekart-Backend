export const filters = (req, res, next) => {
  const skip = +req.query.skip || 0;
  const limit = +req.query.limit || 10;
  const sort = req.query.sort || null;
  const search=req.query.query || " ";
  switch (sort) {
    case "priceLtoH":
      req.sort = 1;
      req.sortField = "price";
      break;
    case "priceHtoL":
      req.sort = -1;
      req.sortField = "price";
      break;
    case "ratingHtoL":
      req.sort = -1;
      req.sortField = "rating";
      break;
    case "ratingLtoH":
      req.sort = 1;
      req.sortField = "rating";
      break;
    default:
      req.sort = null;
      req.sortField = null;
  }
  req.limit = limit;
  req.skip = skip;
  req.search=search;
  next();
};
