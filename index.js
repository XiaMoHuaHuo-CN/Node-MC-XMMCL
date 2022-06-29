/*
 引入程序
*/
const http = require('http');
const url = require('url');
const fs = require('fs');
const exit = require('process');
const path = require('path');

console.log('Starting proxy...');

//if (process.argv.slice(2)[0]) {
    /* 
     启动服务器
    */
    //const port = 443/*process.argv.slice(2)[0]*/;
    /*
    const options = {
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem')
    };
    */
    //http.createServer(options, function(request, response) {
    module.exports = (request, response) => {

        console.log('A request found.');

        var requrl = url.parse(request.url);
            reqpath = requrl.path;
            reqproxy = reqpath.split("/")

        if (reqproxy[1] == "launchermeta") {

            console.log('Proxy LauncherMeta.');
            _path = reqpath.replace("/launchermeta", "");
            
            console.log('GET villa server file.');
            http_options = {
                "host": "launchermeta.mojang.com",
                "path": _path,
                "port": 443
            };
            request = http.get(http_options, function(respon) {
                var body = '';
            
                respon.on('data', function(chunk) {
                    body += chunk;
                });

                respon.on('end', function(){
                    response.end(body);
                });

            }).on('error', function(e) {
                response.end('{"message": "GET error." "db": "' + e + '"}');
                console.log('GET error.');
            });

            request.end();

        } else if (reqproxy[1] == "launcher") {

            console.log('Proxy Launcher.');
            _path = reqpath.replace("/launcher", "");

            console.log('GET villa server file.');
            http_options = {
                "host": "launcher.mojang.com",
                "path": _path,
                "port": 443
            };
            request = http.get(http_options, function(respon) {
                var body = '';
            
                respon.on('data', function(chunk) {
                    body += chunk;
                });

                respon.on('end', function(){
                    response.end(body);
                });

            }).on('error', function(e) {
                response.end('{"message": "GET error." "db": "' + e + '"}');
                console.log('GET error.');
            });

            request.end();

        } else if (reqproxy[1] == "assets") {

            console.log('Proxy Assets.');
            _path = reqpath.replace("/assets", "");

            console.log('GET villa server file.');
            http_options = {
                "host": "resources.download.minecraft.net",
                "path": _path,
                "port": 443
            };
            request = http.get(http_options, function(respon) {
                var body = '';
            
                respon.on('data', function(chunk) {
                    body += chunk;
                });

                respon.on('end', function(){
                    response.end(body);
                });

            }).on('error', function(e) {
                response.end('{"message": "GET error." "db": "' + e + '"}');
                console.log('GET error.');
            });

            request.end();

        } else if (reqproxy[1] == "libraries") {

            console.log('Proxy Assets.');
            _path = reqpath.replace("/libraries", "");

            console.log('GET villa server file.');
            http_options = {
                "host": "libraries.minecraft.net",
                "path": _path,
                "port": 443
            };
            request = http.get(http_options, function(respon) {
                var body = '';
            
                respon.on('data', function(chunk) {
                    body += chunk;
                });

                respon.on('end', function(){
                    response.end(body);
                });

            }).on('error', function(e) {
                response.end('{"message": "GET error." "db": "' + e + '"}');
                console.log('GET error.');
            });

            request.end();

        } else {
            response.end('{"message": "Invalid proxy."}');
        }

    };//).listen(port);
    
    console.log('Service started.');
/*} else {
    console.log('Unset port.');
    exit;
};*/
