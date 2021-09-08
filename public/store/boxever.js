
var _boxeverq = _boxeverq || [];

var _boxever_settings = {
    client_key: 'pqsrxehja3f17kpxeuvoare26qfmbcu0',
    target: 'https://api.boxever.com/v1.2',
    cookie_domain: '.boxever.vercel.app',
    web_flow_target: 'https://d35vb5cccm4xzp.cloudfront.net',
    pointOfSale: "alphaspingaming.com"
};

(function () {
    var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true;
    s.src = 'https://d1mj578wat5n4o.cloudfront.net/boxever-1.4.8.min.js';
    var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);
})();


//var fname = sessionStorage.getItem("billing-fname");
//var lname = sessionStorage.getItem("billing-lname");
//var email = sessionStorage.getItem("billing-email");
//var city = sessionStorage.getItem("billing-city");
//var street = sessionStorage.getItem("billing-address");
//var postCode = sessionStorage.getItem("billing-zip");
var products = [];
var productIds = [];



var cart = JSON.parse(sessionStorage.getItem("Electronics-cart"));
var items = cart.items;
for (var i = 0; i < items.length; ++i) {
    var item = items[i];
    var product = item.product;
    products.push(product);

    var productId = {
        "item_id": product
    };
    productIds.push(productId);
}


function boxeverAddToCart(name, price, qty) {
    //Add product to cart
    _boxeverq.push(function () {
        var addToCartEvent = {
            "channel": "WEB",
            "type": "ADD",
            "language": "EN",
            "currency": "EUR",
            "page": "/store-home",
            "pos": "alphaspingaming.com",
            "browser_id": Boxever.getID(),
            "product": {
                "type": "STANDARD",
                "item_id": name,
                "name": name,
                "orderedAt": new Date().toJSON(),
                "quantity": qty,
                "price": price,
                "currencyCode": "EUR",
                "referenceId": "Product-" + Math.random().toString(16).slice(2)
            }
        };
        Boxever.eventCreate(addToCartEvent, function (data) { }, 'json');
    });
}



function boxeverConfirmOrder(fname, lname, email, city, street, postCode) {
    
    var streetAddress = [];
    streetAddress.push(street);

    _boxeverq.push(function () {
        var identity = {
            "browser_id": Boxever.getID(),
            "channel": "WEB",
            "type": "IDENTITY",
            "language": "EN",
            "currency": "EUR",
            "pos": "alphaspingaming.com",
            "title": "Mr",
            "firstname": fname,
            "lastname": lname,
            "gender": "male",
            "dob": "1980-01-23T00:00",
            "street": streetAddress,
            "city": city,
            "country_code": "IE",
            "postal_code": postCode,
            "email": email,
            "identifiers": [{
                "provider": "BOXEVER_IDENTITY_SYSTEM",
                "id": email
            }]
        };
        Boxever.eventCreate(identity, function (data) { }, 'json');

        var consumers = {
            "channel": "WEB",
            "type": "ADD_CONSUMERS",
            "language": "EN",
            "currency": "EUR",
            "page": "/store-checkout",
            "pos": "alphaspingaming.com",
            "browser_id": Boxever.getID(),
            "consumer": [{
                "title": "Mr",
                "firstname": fname,
                "lastname": lname,
                "item_id": products
            }]
        };
        Boxever.eventCreate(consumers, function (data) { }, 'json');

        var contact = {
            "channel": "WEB",
            "type": "ADD_CONTACTS",
            "language": "EN",
            "currency": "EUR",
            "page": "/store-checkout",
            "pos": "alphaspingaming.com",
            "browser_id": Boxever.getID(),
            "contact": [{
                "title": "Mr",
                "firstname": fname,
                "lastname": lname,
                "street": streetAddress,
                "city": city,
                "country_code": "IE",
                "postal_code": postCode,
                "email": email
            }]
        };
        Boxever.eventCreate(contact, function (data) { }, 'json');

        var confirm = {
            "channel": "WEB",
            "type": "CONFIRM",
            "language": "EN",
            "currency": "EUR",
            "page": "/store-checkout",
            "pos": "alphaspingaming.com",
            "browser_id": Boxever.getID(),
            "product": [productIds]
        };
        Boxever.eventCreate(confirm, function (data) { }, 'json');
    });

    //IDENTITY();
    //ADDCONSUMERS();
    //ADDCONTACTS();
    //CONFIRM();
    
    //setTimeout(, 3000);
    //setTimeout(, 3000);
    //setTimeout(, 3000);
    //setTimeout(location.href = "order.html", 3000);
    //location.href = "order.html";
}

function boxeverplaceOrder() {
    //CHECKOUT
    _boxeverq.push(function () {
        

        var addToCartEvent = {
            "channel": "WEB",
            "type": "PAYMENT",
            "language": "EN",
            "currency": "EUR",
            "page": "/store-order",
            "pos": "alphaspingaming.com",
            "browser_id": Boxever.getID(),
            "pay_type": "Card"
        };
        Boxever.eventCreate(addToCartEvent, function (data) { }, 'json');

        var addToCartEvent = {
            "channel": "WEB",
            "type": "CHECKOUT",
            "language": "EN",
            "currency": "EUR",
            "page": "/store-order",
            "pos": "alphaspingaming.com",
            "browser_id": Boxever.getID(),
            "reference_id": "B94TXY",
            "status": "PURCHASED"
        };
        Boxever.eventCreate(addToCartEvent, function (data) { }, 'json');
    });
}

function boxeverClearCart() {
            //alert('Cleared cart123');
}

function boxevercancelOrder() {
    //alert('Order cancelled123');
}

function ADDCONSUMERS(){
    _boxeverq.push(function () {
        var addToCartEvent = {
            "channel": "WEB",
            "type": "ADD_CONSUMERS",
            "language": "EN",
            "currency": "EUR",
            "page": "/store-checkout",
            "pos": "alphaspingaming.com",
            "browser_id": Boxever.getID(),
            "consumer": [{
                "title": "Mr",
                "firstname": fname,
                "lastname": lname,
                "item_id": products
            }]
        };
        Boxever.eventCreate(addToCartEvent, function (data) { }, 'json');
    });
}

function ADDCONTACTS(){
    _boxeverq.push(function () {
        var addToCartEvent = {
            "channel": "WEB",
            "type": "ADD_CONTACTS",
            "language": "EN",
            "currency": "EUR",
            "page": "/store-checkout",
            "pos": "alphaspingaming.com",
            "browser_id": Boxever.getID(),
            "contact": [{
                "title": "Mr",
                "firstname": fname,
                "lastname": lname,
                "street": streetAddress,
                "city": city,
                "country_code": "IE",
                "postal_code": postCode,
                "email": email
            }]
        };
        Boxever.eventCreate(addToCartEvent, function (data) { }, 'json');
    });
}

function CONFIRM(){
    _boxeverq.push(function () {
        var addToCartEvent = {
            "channel": "WEB",
            "type": "CONFIRM",
            "language": "EN",
            "currency": "EUR",
            "page": "/store-checkout",
            "pos": "alphaspingaming.com",
            "browser_id": Boxever.getID(),
            "product": [productIds]
        };
        Boxever.eventCreate(addToCartEvent, function (data) { }, 'json');
    });
}

function IDENTITY(){
    _boxeverq.push(function () {
        var subscriptionEvent = {
            "browser_id": Boxever.getID(),
            "channel": "WEB",
            "type": "IDENTITY",
            "language": "EN",
            "currency": "EUR",
            "pos": "alphaspingaming.com",
            "title": "Mr",
            "firstname": fname,
            "lastname": lname,
            "gender": "male",
            "dob": "1980-01-23T00:00",
            "street": streetAddress,
            "city": city,
            "country_code": "IE",
            "postal_code": postCode,
            "email": email,
            "identifiers": [{
                "provider": "BOXEVER_IDENTITY_SYSTEM",
                "id": email
            }]
        };
        Boxever.eventCreate(subscriptionEvent, function (data) { }, 'json');
        
    });
}