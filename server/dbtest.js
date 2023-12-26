//uutta!
const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'admin',
  port: 5432,
})
/* pool.query('SELECT * FROM koulu', (err, res) => {
  console.log(err, res.rows)
  pool.end()
})
 */
const lisaaKoulu = async () => {
  try {
    let result = await pool.query("INSERT INTO koulu (etunimi) VALUES ('Jokelan yläaste')")
    console.log("näin monta koulua lisättiin:",result.rowCount)
  } catch (error) {
    console.log("virhetilanne",error)
  }
}
const haeKoulu = async () => {
  try {
    let result = await pool.query("SELECT * FROM koulu WHERE nimi='Jokelan yläaste'")
    console.log("tuotos:",result.rows)
    //console.log("näin mont,result.rowCount)
  } catch (error) {
    console.log("virhetilanne",error)
  }
}
//haeKoulu() 
lisaaKoulu() 
