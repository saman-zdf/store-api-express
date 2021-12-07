const getAllProducts = async (req, res) => {
  res.status(200).json({ meg: 'Product testing route' });
};

const getAllProductsStatic = async (req, res) => {
  res.status(200).json({ meg: 'Product route' });
};
module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
