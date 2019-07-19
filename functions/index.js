/* eslint-disable promise/always-return */
const functions = require('firebase-functions');
const stripe = require('stripe')('sk_test_gHpos48HkCac6v8Z6UvdtKJ0002BF3YngY');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

exports.payWithStripe = functions.https.onRequest((request, response) => {
    // Set your secret key: remember to change this to your live secret key in production
    // See your keys here: https://dashboard.stripe.com/account/apikeys

    response.send(request);
    // eslint-disable-next-line promise/catch-or-return
    stripe.charges.create({
        amount: request.body.amount,
        currency: "usd",
        source: request.body.token,
    }).then((charge) => {
        // asynchronously called
        response.send(charge);
    }).catch(err => {
        console.log(err);
    });
});
