const bodyparser = require('body-parser')
const fs = require('fs');
const express = require('express')  //Jos ei toimi, niin "npm install express"
const cors = require('cors');
const { Pool } = require('pg');
const app = express()
const port = 8080
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const saltRounds = 10;
//const myPlaintextPassword = 'kissa';

//const User = require("./userModel");
 
 
app.use(express.json());



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

//let data = fs.readFileSync('./kouludata.json', { encoding: 'utf8', flag: 'r' });

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

let password = "salasana"
let email = "vilho@gmail.com"



// Handling post request
app.post("/signup", async (req, res, next) => {
  const { email, password } = req.body;
  let result; 
  try {

    let hashed = await bcrypt.hash(password, saltRounds)
    result = await pool.query("insert into users (email, password) values ($1,$2) returning id",[email, hashed])

  } catch (error){
    
    //const error = new Error("Error! Something went wrong.");
    return next(error);
  }
  let token;
  try {
    token = jwt.sign(
      { userId: result.rows[0].id, email: email },
      "secretkeyappearshere",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }
  res
    .status(201)
    .json({
      success: true,
      data: { userId: result.rows[0].id,
          email: email, token: token },
    });
});
 



// Handling post request
app.post("/login", async (req, res, next) => {
  let { email, password } = req.body;
 
  let existingUser;
  let passwordMatch=false;
  try {
//    existingUser = await User.findOne({ email: email });
    let result = await pool.query ("select * from users where email=$1",[email])
    existingUser = {password:result.rows[0].password,email:result.rows[0].email, id:result.rows[0].id};
    passwordMatch = await bcrypt.compare(password, existingUser.password)

  } catch {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }


  if (!existingUser || !passwordMatch) {
    const error = Error("Wrong details please check at once");
    return next(error);
  }
  let token;
  try {
    //Creating jwt token
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "secretkeyappearshere",    //dotenv! -> tätä hyvä käyttää!! 
      { expiresIn: "1h" }
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }
 
  res
    .status(200)
    .json({
      success: true,
      data: {
        userId: existingUser.id,
        email: existingUser.email,
        token: token,
      },
    });
});



const verifyToken = (req, res, next) =>{

  const token = req.headers.authorization?.split(' ')[1]; 
  //Authorization: 'Bearer TOKEN'
  if(!token)
  {
      res.status(200).json({success:false, message: "Error!Token was not provided."});
  }
  //Decoding the token
  const decodedToken = jwt.verify(token,"secretkeyappearshere" );
  req.decoded = decodedToken
  next() 
} 

app.use(verifyToken)

app.get('/', (req, res) => {
  console.log(req.decoded)
  //SELECT 
  console.log("Palvelimeen tultiin kyselemään dataa")
 //const data = fs.readFileSync('./kouludata.json', { encoding: 'utf8', flag: 'r' }); //Voi kestää useita sekunteja!
 res.send("Nyt ollaan palvelussa, joka edellyttää kirjautumisen")
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