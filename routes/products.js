const router = require('express').Router();
const {
  getAllProductsStatic,
  getAllProducts,
} = require('../controllers/products');

// routes
router.route('/').get(getAllProducts);
router.route('/static').get(getAllProductsStatic);

module.exports = router;
