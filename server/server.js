const http = require('http');
const url = require('url');
const fs = require('fs');

let server = http.createServer(async (req, res) => {
    let indirizzo = req.headers.host + req.url;
    let infoUrl = url.parse(indirizzo, true);

    let header = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    };

    console.log(infoUrl.pathname);
    switch(infoUrl.pathname) {

        case '/':
          console.log("OK...");
        break;

        case '/getRegister':
            fs.readFile('utenti.json', (err, file) => {
                res.writeHead(200, header);
                res.end(file);
            });
        break;

        case '/login':
            fs.readFile('utenti.json', (err, file) => {
                let register = JSON.parse(file);
                console.log(register);
                let param = "";

                req.on('data', (data) => {
                    param += data;
                    console.log('this is data' + data);
                });
                req.on('end', () => {
                    param=JSON.parse(param);
                    console.log(param);
                    console.log(register["users"]);
                    let accesso = false;
                    register["users"].forEach(item => {
                        if(item.email == param.mail && item.pwd == param.pwd){
                            console.log("accesso eseguito")
                            accesso = true;
                        }
                    });
                    accesso=JSON.stringify(accesso);
                    res.writeHead(200, header);
                    res.end(accesso);
                });
            });
            break;
            case '/register':
                fs.readFile('utenti.json', (err, file) => {
                    let register = JSON.parse(file);
                    console.log(register);
                    let param = "";
    
                    req.on('data', (data) => {
                        param += data;
                        console.log('this is data' + data);
                    });
                    req.on('end', () => {
                        param=JSON.parse(param);
                        console.log(param);
                        console.log(register["users"]);
                        let utente = 
                            {
                                "id": param["id"],
                                "genere": param["genere"],
                                "nome": param["nome"],
                                "cognome": param["cognome"],
                                "email": param["mail"],
                                "città": param["citta"],
                                "categoria": param["categoria"],
                                "data_scadenza_contratto": param["data_scadenza_contratto"],
                                "pwd": param["pwd"]
                            };
                        register["users"].push(utente);
                        file=JSON.stringify(register);
                        fs.writeFile("utenti.json", file, (err) =>{
                            if(!err){
                                res.writeHead(200,header);
                                res.end(JSON.stringify("aggiunto"));
                            }
                            else{
                                res.writeHead(500,header);
                                res.end(JSON.stringify("Errore durante la scrittura sul file: documento NON aggiornato"));
                            }
                        });
                    });
                });
            break;
    }
});

server.listen(8888);
console.log('il server è avviato sulla porta 8888');
