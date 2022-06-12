/*
 引入程序
*/
const https = require('https');
const url = require('url');
const fs = require('fs');
const exit = require('process');
const HttpsProxyAgent = require('https-proxy-agent');
const path = require('path');

console.log('Starting proxy...');

if (process.argv.slice(2)[0]) {
    /* 
     启动服务器
    */
    const port = process.argv.slice(2)[0];
    const options = {
        key: fs.readFileSync('C:/Users/25496/server_no_passwd.key'),
        cert: fs.readFileSync('C:/Users/25496/server.pem')
    };
    https.createServer(options, function(request, response) {

        console.log('A request found.');

        var requrl = url.parse(request.url);
            reqpath = requrl.path;
            reqproxy = reqpath.split("/")

        if (reqproxy[1] == "launchermeta") {

            console.log('Proxy LauncherMeta.');
            _path = reqpath.replace("/launchermeta", "");
            
            console.log('GET villa server file.');
            https_options = {
                "host": "launchermeta.mojang.com",
                "path": _path,
                "port": 443
            };
            request = https.get(https_options, function(respon) {
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
            https_options = {
                "host": "launcher.mojang.com",
                "path": _path,
                "port": 443
            };
            request = https.get(https_options, function(respon) {
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
            https_options = {
                "host": "resources.download.minecraft.net",
                "path": _path,
                "port": 443
            };
            request = https.get(https_options, function(respon) {
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
            https_options = {
                "host": "libraries.minecraft.net",
                "path": _path,
                "port": 443
            };
            request = https.get(https_options, function(respon) {
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

    }).listen(port);
    
    console.log('Service started.');
} else {
    console.log('Unset port.');
    exit;
};