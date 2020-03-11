import express from 'express';
const router = express.Router();

router.get('/', (req, res ,next) => {
    res.status(200).json({
        "message": "handling GET requests"
    });
}); 

router.post('/', (req, res ,next) => {
    let product = {
        name: req.body.name,
        price: req.body.price
    };

    res.status(201).json({
        message: "handling POST requests",
        createdProduct: product
    });
}); 

router.get('/:productId', (req, res ,next) => {
    const id = req.params.productId;
    res.status(200).json({
        "message": "Here is the product ("+id+") that you have requested.",
        "id":id,
    });
}); 

router.patch('/:productId', (req, res ,next) => {
    const id = req.params.productId;
    res.status(200).json({
        "message": "Product at (" + id + ") updated!.",
        "id":id
    });
});

router.delete('/:productId', (req, res ,next) => {
    const id = req.params.productId;
    res.status(200).json({
        "message": "Product at (" + id + ") delete!.",
        "id":id
    });
}); 

module.exports = router; //EXPORTS means that this file can be used in OTHER files.