import express from 'express';
const router = express.Router();

router.get('/', (req, res ,next) => {
    res.status(200).json({
        "message": "handling GET requests"
    });
}); 

router.post('/', (req, res ,next) => {
    let order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: "Order for " + order.productId + " created!",
        order: order
    });
}); 

export default router;