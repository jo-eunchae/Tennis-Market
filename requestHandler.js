const fs = require('fs');
const main_view = fs.readFileSync('./main.html');
const orderlist_view = fs.readFileSync('./orderlist.html');

const mariadb = require('./database/connect/mariadb');

// html
function main(response){
    console.log('main');

    // mariadb.query("SELECT * FROM product", function(err, rows) {
    //     console.log(rows);
    // });

    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write(main_view);
    response.end();
}

function order(response, productId){
    console.log('order');

    response.writeHead(200, {'Content-Type' : 'text/html'});

    mariadb.query("INSERT INTO orderlist VALUES ("
            + productId + ", '"
            + new Date().toLocaleDateString() + "');",
            function(err, rows) {
        // console.log(rows);
    });

    response.write('order page');
    response.end();
}

function orderlist(response){
    console.log('orderlist');

    response.writeHead(200, {'Content-Type' : 'text/html'});

    mariadb.query("SELECT * FROM orderlist", function(err, rows){
        response.write(orderlist_view);

        for(const element of rows){
            response.write("<tr>"
                        + "<td>" + element.product_id + "</td>"
                        + "<td>" + element.order_date + "</td>"
                        + "</tr>");
        }
        // 수업자료 코드
        // rows.forEach(element => {
        //     response.write("<tr>"
        //                 + "<td>" + element.product_id + "</td>"
        //                 + "<td>" + element.order_date + "</td>"
        //                 + "</tr>");
        // });
        
        response.write("</table>");
        response.end();
    });
}

// css, img
function style(response){
    fs.readFile('./style.css', function(err, data){
        response.writeHead(200, {'Content-Type' : 'text/css'});
        response.write(data);
        response.end();
    });
}
function redRacket(response){
    fs.readFile('./img/redRacket.png', function(err, data){
        response.writeHead(200, {'Content-Type' : 'img/png'});
        response.write(data);
        response.end();
    });
}
function blueRacket(response){
    fs.readFile('./img/blueRacket.png', function(err, data){
        response.writeHead(200, {'Content-Type' : 'img/png'});
        response.write(data);
        response.end();
    });
}
function blackRacket(response){
    fs.readFile('./img/blackRacket.png', function(err, data){
        response.writeHead(200, {'Content-Type' : 'img/png'});
        response.write(data);
        response.end();
    });
}

let handle = {}; // key:value
// html page
handle['/'] = main;
handle['/main'] = main;
handle['/order'] = order;
handle['/orderlist'] = orderlist;

// css, img path
handle['/style.css'] = style;
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;

exports.handle = handle;