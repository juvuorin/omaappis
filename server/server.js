const http = require('http');
const fs = require('fs');


// Calling the readFileSync() method
// to read 'input.txt' file
/* const data = fs.readFileSync('./input.txt',
            {encoding:'utf8', flag:'r'});
 */
// Display the file data
//console.log(data);

const requestListener = function (req, res) {
  if (req.method === "GET") {
    console.log("Palvelimeen tuli", req.body)
    const data = fs.readFileSync('./kouludata.json', { encoding: 'utf8', flag: 'r' });
    //console.log("data", data)
    res.writeHead(200);
    res.end(data);
  } 
  if (req.method === "PUT") {
      

  }
  /*  let kouludata = {
     koulut: [{
       oppilaidenMäärä: 100, luokat: [{
         nimi: "3A", opplaidenMäärä: 27, oppilaat: [{ nimi: "Olli Oppilasklököäläöl" },
         { nimi: "Kalle Kolmonenölkklök" }, { nimi: "oletusnimiosdsdppilaalle" }]
       },
       { nimi: "2B", opplaidenMäärä: 24, oppilaat: [{ nimi: "Mikko Mallikas" }] }], nimi: "äöäöäöädsfgfgdgf"
     },
     { nimi: "Suoraman hikipinkojen koulu", luokat: [] }, { nimi: "oletusnimi", luokat: [] }], tallennetaanko: true, tietoAlustettu: true
   } */
}

server = http.createServer(function (req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  requestListener(req, res)
})
//const server = http.createServer(requestListener);
server.listen(8080);