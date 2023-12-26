


/* 



JavaScript

- funktio, map-funktio, => nuolifunktio, 
- [...lista]
- {...o}
- lista =[10,20]
- [a,b] = lista  //array destructuring
- objekti ={etunimi:"pekka",sukunimi:"liikanen"}
- {etunimi} = objekti  //object destructuring 
- split -> ["a","b"]
- filter , reduce
- JSON.stringify, JSON.parse
- false && ?

React 

- reducer, useState, useEffect, 


 */






import logo from './logo.svg';
import './App.css';
import Koulu from './Koulu';
import { useState, useReducer, useEffect } from "react"
import Nappain from './Nappain';
import {axios} from 'axios' // npm install axios , jos ei ole jo ladattu

let oppilas1 = { nimi: "Olli Oppilas" }

let oppilas2 = { nimi: "Mikko Mallikas" }
let oppilas3 = { nimi: "Kalle Kolmonen" }


let luokka1 = {
  nimi: "3A",
  opplaidenMäärä: 27,
  oppilaat: [oppilas1, oppilas3]
}

let luokka2 = {
  nimi: "2B",
  opplaidenMäärä: 24,
  oppilaat: [oppilas2]
}

let appiksenData = {
  koulut: [{
    oppilaidenMäärä: 100,
    luokat: [luokka1, luokka2]
  }],
  tallennetaanko: false,
  tietoAlustettu: false
}

function reducer(state, action) {
  switch (action.type) {

    case 'KOULUN_NIMI_MUUTTUI': {
      console.log("Koulun nimi muuttui", action)
      const tilaKopio = { ...state, tallennetaanko: true }
      tilaKopio.koulut[action.payload.index].nimi = action.payload.nimi
      return tilaKopio
    }

    case 'OPPILAAN_NIMI_MUUTTUI': {
      console.log("Oppilaan nimi muuttui", action)
      const tilaKopio = { ...state, tallennetaanko: true }
      tilaKopio.koulut[action.payload.kouluIndex].luokat[action.payload.luokkaIndex].oppilaat[action.payload.oppilasIndex].nimi = action.payload.nimi
      return tilaKopio
    }
    // STRICT MODE ON - tässä muodostetaan koko tilasta kopio, tukee concurrent modea
    // Vähän "krouvi" ratkaisu, mutta helppo 
    /*case 'LISÄÄ_OPPILAS': {
          console.log("Lisää oppilas", action)
          const kopio = JSON.parse(JSON.stringify(state))
          kopio.koulut[action.payload.kouluIndex].luokat[action.payload.luokkaIndex].oppilaat.push({nimi:"oletusnimioppilaalle tai tyhjä merkkijono tms"})
          return kopio
    }
     */
    // STRICT MODE OFF - tässä mutatoidaan tilaa eri "kierrosten" välillä (siis eri kerrat kun reducer funktiota kutsutaan)
    // luodaan vain pintakopio juuriobjektista, mutta lasten viittauksen viittailevat "vanhaan dataan" - toimii hyvin
    // tässä tenttiappista tehdessä, tässä kohtaa kurssia. Mutatointi viittaa tässä siihen, että palautettu data (returnin jälkeen)
    // sisältää muutoksia, vaikka juuriobjekti onkin uusi.

    // Tämä koodi ei toimi strict modessa, koska vaikka juuriobjekti on kopioitu, viittaavat "lapset" "vanhaan" dataan. React kuitenkin
    // tekee strict modessa toisen kutsun reduceriin vanhalla datalla (vanha viittaus), johon me olemme ekalla kierroksella lisänneet
    // jo yhden oppilaan 

    // Tämä johtuu siitä, että strict modessa toisen kierroksen reducer kutsussa käytetään samaa juuriobjektin viittausta
    // kuin mitä käytettiin ensimmäisellä kierroksella - olemme menneet ykköskierroksella muuttamaan objektia ja siksi
    // homma ei pelitä.

    case 'LISÄÄ_OPPILAS': {
      console.log('LISÄÄ_OPPILAS')
      const kopio = { ...state }
      kopio.koulut[action.payload.kouluIndex].luokat[action.payload.luokkaIndex].oppilaat.push({ nimi: "oletusnimioppilaalle" })
      return kopio
    }
    case 'LATAUS_ALOITETTIIN': 
      console.log ('LATAUS_ALOITETTIIN')
      return {...state,...action.payload}
    case 'LATAUS_EPÄONNISTUI': 
      console.log ('LATAUS_EPÄONNISTUI')
      return {...state,...action.payload}

    case 'LISÄÄ_KOULU': {
      console.log("Reduceria kutsuttiin", action)
      return { ...state, koulut: [...state.koulut, { nimi: "oletusnimi", luokat: [] }], tallennetaanko: true }
    }
    case 'PÄIVITÄ_TALLENNUSTILA':
      return { ...state, tallennetaanko: action.payload }

    case 'LATAUS_ONNISTUI':
      console.log('LATAUS_ONNISTUI')
      return { ...action.payload, latausAloitettu: false, tietoAlustettu: true }


    default:
      throw new Error("reduceriin tultiin jännällä actionilla");
  }
}

function App() {

  const [appData, dispatch] = useReducer(reducer, appiksenData);
  useEffect(() => {

    const getData = async () => {
      try {
        dispatch({ type: "LATAUS_ALOITETTIIN", payload: {latausAloitettu: true }})
        const result = await axios('http://localhost:8080');
        console.log("result:", result)
        dispatch({ type: "LATAUS_ONNISTUI", payload: result.data.data })
      } catch (error) { 
        dispatch({ type: "LATAUS_EPÄONNISTUI", payload: { latausEpäonnistui:true} })

      }
  
    }
    getData()
  }, []);
  useEffect(() => {

    const saveData = async () => {

      try {

        const result = await axios.post('http://localhost:8080', {
          data: appData
        })
        dispatch({ type: "PÄIVITÄ_TALLENNUSTILA", payload: false })
      } catch (error) {
        console.log("virhetilanne", error)
      }
    }
    if (appData.tallennetaanko == true) {
      saveData()
    }

  }, [appData.tallennetaanko]);


  return (
    <div>

      {appData.tietoAlustettu && appData.koulut.map((koulu, index) => <Koulu kouluIndex={index} koulu={koulu} dispatch={dispatch} />)}
      <button onClick={() => dispatch({ type: 'LISÄÄ_KOULU' })}>Lisää uus koulu</button>
    </div>
  );
}

export default App;
