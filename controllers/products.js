const { Product } = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: { $gt: 30 } })
    .sort('price')
    .select('name price')
    .limit(10)
    .skip(1);
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  // we pull out all the query we want to implement from requset.query
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  // declare an empty object
  const queryObject = {};
  // we check if the query added to the url we assing a new property to the object by the name of featured and will chck if the query is true or false
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }

  // the same procedure applies to the comapny which is coming from request.query
  if (company) {
    queryObject.company = company;
  }
  // for name we can use query option which wi provided bu mongoDB, in a object we can pass $regex and the query we looking for and it will return the request with anything match the regex, $options: 'i' is used for case sensitive
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }

  // *** numericFilters
  // *** numericFilter
  if (numericFilters) {
    let operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const regEX = /\b(<|>|>=|<=|=)\b/g;
    let filters = numericFilters.replace(
      regEX,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ['price', 'rating'];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: +value };
      }
    });
  }
  console.log(queryObject);

  // ***sort
  // if we want to use sort we don't need to use await keyword when we finding the items from our model
  let result = Product.find(queryObject);
  if (sort) {
    // user might want to sort different propeties of the object, we need to split them and join them back in order to have the same functionality if we had only one propety for sort
    const sortList = sort.split(', ').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }

  // *** fields
  if (fields) {
    const fieldList = fields.split(', ').join(' ');
    result = result.select(fieldList);
  }

  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  // we have 23 products,
  // if we want ot have a response by items
  // we can have 4 diferrent pages, 7 7 7 2

  // once the sort has been added to the result we can await the result
  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};
module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
