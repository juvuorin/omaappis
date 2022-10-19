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
      console.log("Reduceria kutsuttiin", action)
      console.log("Koulun uusi nimi olisi:", action.payload)
      const tilaKopio = { ...state, tallennetaanko: true }
      tilaKopio.koulut[action.payload.index].nimi = action.payload.nimi
      return tilaKopio
    }

    case 'OPPILAAN_NIMI_MUUTTUI': {
      console.log("Reduceria kutsuttiin", action)
      const tilaKopio = { ...state, tallennetaanko: true }
      tilaKopio.koulut[action.payload.koulunIndex].luokat[action.payload.luokanIndex].oppilaat[action.payload.oppilaanIndex].nimi = action.payload.nimi
      return tilaKopio
    }
    case 'LISÄÄ_KOULU': {
      console.log("Reduceria kutsuttiin", action)
      const uudetKoulut = [...state.koulut,{ nimi: "oletusnimi" ,luokat:[]}]
      return {...state, koulut:uudetKoulut}
    }
    case 'PÄIVITÄ_TALLENNUSTILA':
      return { ...state, tallennetaanko: action.payload }

    case 'ALUSTA_DATA':
      return { ...action.payload, tietoAlustettu: true }


    default:
      throw new Error("reduceriin tultiin jännällä actionilla");
  }
}

function App() {

  const [appData, dispatch] = useReducer(reducer, appiksenData);

  useEffect(() => {
    let kouludata = localStorage.getItem('kouludata');
    if (kouludata == null) {
      console.log("Data luettiin vakiosta")
      localStorage.setItem('kouludata', JSON.stringify(appiksenData));
      dispatch({ type: "ALUSTA_DATA", payload: appiksenData })

    } else {
      console.log("Data luettiin local storagesta")

      dispatch({ type: "ALUSTA_DATA", payload: (JSON.parse(kouludata)) })
    }

  }, []);
  useEffect(() => {

    if (appData.tallennetaanko == true) {
      console.log("koulun nimi pitää tallentaa")
      console.log("koulu:", appData)

      localStorage.setItem('kouludata', JSON.stringify(appData));
      dispatch({ type: "PÄIVITÄ_TALLENNUSTILA", payload: false })
    }
  }, [appData.tallennetaanko]);


  return (
    <div>

      {appData.tietoAlustettu && appData.koulut.map((koulu, index) => <Koulu koulunIndex={index} index={index} koulu={koulu} dispatch={dispatch} />)}
      <button onClick={() => dispatch({ type: 'LISÄÄ_KOULU' })}>Lisää uus koulu</button>
    </div>
  );
}

export default App;
