const getAllProductsStatic = async (req, res) => {
  throw new Error('Testing async errors');
  res.status(200).json({ meg: 'Product route' });
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ meg: 'Product testing route' });
};
module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
