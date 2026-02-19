const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/auth');

router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/', authMiddleware, productController.createProduct);
router.post('/:id/favorite', authMiddleware, productController.toggleFavorite);

module.exports = router;
