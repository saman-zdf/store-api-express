const { Product } = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const search = 'a';
  const products = await Product.find({
    name: { $regex: search, $options: 'i' },
  });
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  // we pull out all the query we want to implement from requset.query
  const { featured, company, name } = req.query;
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

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }
  console.log(queryObject);
  const products = await Product.find(queryObject);
  res.status(200).json({ products, nbHits: products.length });
};
module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
