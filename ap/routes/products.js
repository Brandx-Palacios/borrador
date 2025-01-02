const express = require('express');
const router = express.Router();
let products = [];

// GET /products - Get all products
router.get('/', (req, res) => {
    res.status(200).json(products);
});

// POST /products - Create product
router.post('/', (req, res) => {
    const { name, descr, price } = req.body;

    // Validate that all requirements
    if (!name || !descr || !price) {
        return res.status(400).json({ message: 'All fields (name, descr, price) are required.' });
    }

    // Validate that price is a number
    if (isNaN(price)) {
        return res.status(400).json({ message: 'Price must be a valid number.' });
    }

    // Validate that price is not negative
    if (price < 0) {
        return res.status(400).json({ message: 'Price must be a positive number.' });
    }

    // Create the new product
    const newProduct = {
        id: products.length + 1,
        name,
        descr,
        price,
        creationDate: new Date()
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// GET /products/:id - Get product by id
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ message: 'Product not found.' });
    }
    res.status(200).json(product);
});

// PUT /products/:id - Update product by id
router.put('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, descr, price } = req.body;

    // Validate if all required fields are provided
    if (!name || !descr || !price) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Validate if price is a number
    if (isNaN(price)) {
        return res.status(400).json({ message: 'Price must be a number.' });
    }

    // Find the product by its ID
    const product = products.find(p => p.id === productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found.' });
    }

    // Update the product
    product.name = name;
    product.descr = descr;
    product.price = price;

    res.status(200).json({ message: 'Product updated.', product });
});

// DELETE /products/:id - Delete product by id
router.delete('/:id', (req, res) => {
    const productId = parseInt(req.params.id);

    // Validating if product exist
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found.' });
    }

    // Delete the product
    products.splice(productIndex, 1);
    res.status(200).json({ message: 'Product eliminated.' });
});

module.exports = router;