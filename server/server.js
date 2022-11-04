const bodyparser = require('body-parser')
const fs = require('fs');
const express = require('express')  //Jos ei toimi, niin "npm install express"
const cors = require('cors');
const { Pool } = require('pg');
const app = express()
const port = 8080

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'admin',
  port: 5432,
})


app.use(cors())  //jos ei toimi, niin "npm install cors"
app.use(express.json());
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

let data = fs.readFileSync('./kouludata.json', { encoding: 'utf8', flag: 'r' });

// jos x on mahdollista saada null arvo, niin kysymys voi olla "ilman tenttiä" 
// 

// {tenttiId:2, kysymys:"Onko kuu juustoa?"}
/* const lisääKysymys=(tenttiId, kysymys)=>{
values=[tenttiId, kysymys] 
  try {
    dbpool.query("INSERT INTO kysymys (tentti_id, kysymys) VALUES ($1,$2) ",values)
  }
  catch(e){

  }
  
}


 */




app.get('/', (req, res) => {

  //SELECT 
  console.log("Palvelimeen tultiin kyselemään dataa")
 //const data = fs.readFileSync('./kouludata.json', { encoding: 'utf8', flag: 'r' }); //Voi kestää useita sekunteja!
 res.send(data)
})
/* app.post('/luokat', async (req, res) => {  
  console.log ("nyt lisätään kysymystä")
  try {
    result = await pool.query("INSERT INTO luokka (koulu_id, nimi) VALUES ($1,$2) ",[req.body.kouluId,req.body.nimi])
    res.send('Tais datan tallennus onnistua')    
  }
  catch(e){
    res.status(500).send(e)
  }
 */  
  //app.post('/luokat/:luokkaId/oppilaat:', async (req, res) => {  

  app.post('/koulut/:kouluId/luokat/:luokkaId/oppilaat:', async (req, res) => {  
  const kouluId = Number(req.params.luokkaId)  
  const luokkaId = Number(req.params.kouluId)  
  
  console.log ("nyt lisätään kysymystä")
//    console.log ("kouluId",kouluId)
    try {
      result = await pool.query("INSERT INTO luokka (koulu_id, nimi) VALUES ($1,$2) ",[id,req.body.nimi])
      res.send('Tais datan tallennus onnistua')    
    }
    catch(e){
      res.status(500).send(e)
    }
  

  // console.log("Palvelimeen tultiin tallentelemaan dataa")
// data = req.body  //INSERT
 //fs.writeFileSync('kouludata.json', JSON.stringify(req.body));
 //res.send('Tais datan tallennus onnistua, kun tänne tultiin :)')
})


/* app.get('/', (req, res) => {
   console.log("Palvelimeen tultiin kyselemään dataa")
  const data = fs.readFileSync('./kouludata.json', { encoding: 'utf8', flag: 'r' }); //Voi kestää useita sekunteja!
  res.send(data)
})
app.post('/', (req, res) => {
  console.log("Palvelimeen tultiin tallentelemaan dataa")
  fs.writeFileSync('kouludata.json', JSON.stringify(req.body));
  res.send('Tais datan tallennus onnistua, kun tänne tultiin :)')
})

 */

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})