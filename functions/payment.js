exports.handler = function (event, context, callback) {
    let first_name, last_name;
    const Midtrans = require('midtrans-client');

    const headers = {
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers':'Content-Type',
        'Access-Control-Allow-Methods':'GET, PUT, POST, DELETE'
    }

    const snap = new Midtrans.Snap({
        isProduction: true,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
        clientKey: process.env.MIDTRANS_CLIENT_KEY
    })

    const {id, name, email, amount} = JSON.parse(event.body);
    const names = name.split(" ");

    if (names && names.length > 1) {
        first_name = names[0];
        last_name  = names[1];
    } else if (names.length === 1) {
        first_name = names[0];
        last_name  = '';
    }

    const parameters = {
        transaction_details: {
            order_id: `BWACHA-${id}-${+new Date()}`,
            gross_amount: parseInt(amount)
        },
        customer_details: {
            first_name,
            last_name,
            email
        },
        credit_card: {
            secure: true
        }
    }

    snap.createTransaction(parameters)
        .then((transaction) => {
            const {token, redirect_url} = transaction;
            console.log(`Token: ${token}`);
            console.log(`Redirect: ${redirect_url}`);

            callback(null, {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    url: redirect_url,
                    params: parameters
                })
            })
        }).catch((err) => {
            console.error(`Error: ${err.message}`);
            callback(null, {
                statusCode: 400,
                headers,
                body: JSON.stringify({error: err.message})
            })
        })
}