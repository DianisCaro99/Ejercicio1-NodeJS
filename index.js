const axios = require("axios");
const fs = require("fs");
const http = require("http");
const url = require("url");

async function getClientes() {
    const resp = await axios.get(
        "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json"
    );
    return resp.data;
};

async function getProveedores() {
    const resp = await axios.get(
        "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json"
    );
    return resp.data;
};

http
.createServer(function (req, res) {
    if (req.url === "/api/clientes") 
    {
        getClientes().then((datos)=> {
            fs.readFile("index.html", "UTF-8", (error, data) => {
                if (error){
                    res.writeHead(404, { "Content-Type": "text/html" });
                    return res.end("Error en petición - Clientes");
                }
                else{
                    res.writeHead(200, { "Content-Type": "text/html" });
                    var htmlbody = "<h1> Listado de clientes </h1>\n";
                    htmlbody += "<table class=\"table table-striped\">\n ";
                    htmlbody += "<thead>\n<tr>\n ";
                    htmlbody += "<th class=\"col-2\">ID</th>\n ";
                    htmlbody += "<th class=\"col-2\">Nombre</th>\n ";
                    htmlbody += "<th class=\"col-2\">Compañia</th>\n ";
                    htmlbody += "</tr>\n</thead>\n<tbody>\n";
                    for (let elem of datos)
                        htmlbody += `<tr><td>${elem.idCliente}</td><td>${elem.NombreCompania}</td><td>${elem.NombreContacto}</td></tr>\n`;
                    htmlbody += "</tbody>\n</table>";
                    dataReq = data.replace("{{Data}}", htmlbody);
                    res.write(dataReq);
                    return res.end();
                 }
                });
        });
    } 
    else if(req.url === "/api/proveedores"){
        getProveedores().then((datos)=> {
            fs.readFile("index.html", "UTF-8", (error, data) => {
                if (error){
                    res.writeHead(404, { "Content-Type": "text/html" });
                    return res.end("Error en petición - Proveedores");
                }
                else{
                    res.writeHead(200, { "Content-Type": "text/html" });
                    var htmlbody = "<h1> Listado de proveedores </h1>\n";
                    htmlbody += "<table class=\"table table-striped\">\n ";
                    htmlbody += "<thead>\n<tr>\n ";
                    htmlbody += "<th class=\"col-2\">ID</th>\n ";
                    htmlbody += "<th class=\"col-2\">Nombre</th>\n ";
                    htmlbody += "<th class=\"col-2\">Compañia</th>\n ";
                    htmlbody += "</tr>\n</thead>\n<tbody>\n";
                    for (let elem of datos)
                        htmlbody += `<tr><td>${elem.idproveedor}</td><td>${elem.nombrecompania}</td><td>${elem.nombrecontacto}</td></tr>\n`;
                    htmlbody += "</tbody>\n</table>";
                    dataReq = data.replace("{{Data}}", htmlbody);
                    res.write(dataReq);
                    return res.end();
                 }
        });
    }); 
    }
    else{
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end("Error en la petición - URL");
    }
}
).listen(8081);
