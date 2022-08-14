
const Razorpay = require('razorpay');
const Order = require('../models/order')



const purchasepremium =async (req, res) => {
    try {
        var rzp = new Razorpay({
            key_id: 'rzp_test_TOnL2FCRdZpbKN',
            key_secret: 'LEh2J6K3Z14HqPcpH9Q9iZDa'
        })
        const amount = 2500;

        rzp.orders.create({amount, currency: "INR"}, (err, order) => {
            if(err) {
                throw new Error(err);
            }
            req.user.createOrder({ orderid: order.id, status: 'PENDING'}).then(() => {
                return res.status(201).json({ order, key_id : rzp.key_id});

            }).catch(err => {
                throw new Error(err)
            })
        })
    } catch(err){
        console.log(err);
        res.status(403).json({ message: 'Sometghing went wrong', error: err})
    }
}

 const updateTransactionStatus = (req, res ) => {
    try {
        const { payment_id, order_id} = req.body;
        console.log(req.body,"hii it is good to see")

        Order.findOne({where : {orderid : order_id}}).then(order => {
            order.update({ paymentid: payment_id, status: 'SUCCESSFUL'}).then(() => {
                req.user.update({isPremium: true})
                return res.status(202).json({sucess: true, message: "Transaction Successful"});
            }).catch((err)=> {
                throw new Error(err);
            })
        }).catch(err => {
            throw new Error(err);
        })
    } catch (err) {
        console.log(err);
        res.status(403).json({ err0r: err, message: 'Sometghing went wrong' })

    }
}

module.exports = {
    purchasepremium,
    updateTransactionStatus
}
