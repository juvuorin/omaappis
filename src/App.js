import logo from './logo.svg';
import './App.css';
import Koulu from './Koulu';
import { useState, useReducer, useEffect } from "react"
import Nappain from './Nappain';

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

let koulu_ = {
  oppilaidenMäärä: 100,
  nimi: "Kangasalan ala-aste",
  luokat: [luokka1, luokka2],
  tallennetaanko: false,
  tietoAlustettu:false

}

function reducer(state, action) {
  switch (action.type) {

    case 'KOULUN_NIMI_MUUTTUI':
      console.log("Reduceria kutsuttiin", action)
      console.log("Koulun uusi nimi olisi:", action.payload)
      return { ...state, nimi: action.payload, tallennetaanko: true };

  
    case 'OPPILAAN_NIMI_MUUTTUI':
      console.log("Reduceria kutsuttiin", action)
      let nimi = action.payload.nimi
      let kouluKopio = { ...state }
      kouluKopio.luokat[action.payload.luokanIndex].oppilaat[action.payload.oppilaanIndex].nimi = nimi
      kouluKopio.tallennetaanko= true
      return kouluKopio
    case 'PÄIVITÄ_TALLENNUSTILA':
      return { ...state, tallennetaanko: action.payload }

    case 'ALUSTA_DATA':
      return {...action.payload, tietoAlustettu:true} 


    default:
      throw new Error("reduceriin tultiin jännällä actionilla");
  }
}

function App() {

  const [koulu, dispatch] = useReducer(reducer, koulu_);

  useEffect(() => {
    let kouludata = localStorage.getItem('kouludata');
    if (kouludata == null) {
      console.log("Data luettiin vakiosta")
      localStorage.setItem('kouludata', JSON.stringify(koulu_));
      dispatch({ type: "ALUSTA_DATA", payload: koulu_ })

    } else {
      console.log("Data luettiin local storagesta")

      dispatch({ type: "ALUSTA_DATA", payload: (JSON.parse(kouludata)) })
    }

  }, []);
  useEffect(() => {

    if (koulu.tallennetaanko == true) {
      console.log("koulun nimi pitää tallentaa")
      console.log("koulu:",koulu)
      
      localStorage.setItem('kouludata', JSON.stringify(koulu));
      dispatch({ type: "PÄIVITÄ_TALLENNUSTILA", payload: false })
    }
  }, [koulu.tallennetaanko]);


  return (
    <div>

      {koulu.tietoAlustettu && <Koulu koulu={koulu} dispatch={dispatch} />}
    </div>
  );
}

export default App;
