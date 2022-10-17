import logo from './logo.svg';
import './App.css';
import Koulu from './Koulu';
import { useState,useReducer } from "react"
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
  luokat: [luokka1, luokka2]
}

function reducer(state, action) {
  switch (action.type) {

    case 'KOULUN_NIMI_MUUTTUI':
      console.log("Reduceria kutsuttiin", action)
      return {...state, nimi: action.payload.nimi};
      
    case 'OPPILAAN_NIMI_MUUTTUI':
      console.log("Reduceria kutsuttiin", action)
      let nimi = action.payload.nimi
      let kouluKopio = {...state}
      kouluKopio.luokat[action.payload.luokanIndex].oppilaat[action.payload.oppilaanIndex].nimi = nimi      
      return kouluKopio
    
    
      default:
      throw new Error("reduceriin tultiin jännällä actionilla");
  }
}

function App() {

  const [koulu, dispatch] = useReducer(reducer, koulu_);

  return (
    <div>
      <Koulu koulu={koulu} dispatch={dispatch} />
    </div>
  );
}

export default App;
