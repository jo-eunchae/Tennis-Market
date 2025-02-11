function route(pathname, handle, response, productId){
    // favicon.ico 요청 무시
    if (pathname === '/favicon.ico') {
        return;
    }

    // console.log('pathname : ' + pathname);
    if(typeof handle[pathname] == 'function'){
        handle[pathname](response, productId);
    }else{
        response.writeHead(404, {'Content-Type' : 'text/html'});
        response.write('Not Found');
        response.end();
    } 
}

exports.route = route;