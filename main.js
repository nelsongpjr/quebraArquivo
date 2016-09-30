var fs = require('fs');
var base64 = require('js-base64').Base64;



var base64str = base64_encode('img.jpg');

//console.log("buffer montado: " + buf);
base64_decode(base64str, "file.jpg");


function receive(package){
    var data = base64_decode(package);
    
    if(data.type === "package"){
        //solicita os outros pacotes
    }
    if(data.type === "cabecalho"){
        //inicia o recebimento dos outros pacotes
    }
    if(data.type === "teste"){
        teste();
    }
}

function base64_encode(file) {

    var bitmap = fs.readFileSync(file);
    var bufferAll = new Buffer(bitmap).toString('base64');

    var bufferBroke = [];
    var current_size = bufferAll.length;
    var current = 0;
    var limit = 0;
    var package_size = 50;
    var package_id = 0;
    var packages = 0

    for (current_size; current_size > 0; current_size = current_size - package_size) {

        var str = "";
        //    console.log("Tamanho: " + current_size);
        //  console.log(current);

        if (current_size > package_size) {
            limit = limit + package_size;
        } else {
            limit = limit + current_size;
        }

        for (current; current < limit; current++) {
            str = str.concat(bufferAll[current]);
        }
        //console.log(limit);
        //console.log(str);
        bufferBroke.push({
            id: package_id++,
            str: str
        });
        packages++;
    }
    /*
     for(var i = 0; i < bufferBroke.length; i++){
     console.log(bufferBroke[i].str);
     }
     console.log();
     console.log();
     console.log(bufferAll);
     */

    console.log(bufferBroke);
    return {
        type: "package",
        buffer: bufferBroke,
        sizeBits: bitmap.length / 0.125,
        name: file,
        qt_pacotes: packages
    };

}




function base64_decode(base64str) {
    var bitmap = new Buffer(base64str, 'base64');
    //fs.writeFileSync(fileName, bitmap);
    return bitmap;

}




