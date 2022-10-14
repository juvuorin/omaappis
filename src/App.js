import logo from './logo.svg';
import './App.css';
import Koulu from './Koulu';
import {useState} from "react" 
import Nappain from './Nappain';

let oppilas1 = {nimi:"Olli Oppilas"}

let oppilas2 = {nimi:"Mikko Mallikas"}
let oppilas3 = {nimi:"Kalle Kolmonen"}


let luokka1 = {nimi:"3A",
              opplaidenMäärä:27,
              oppilaat:[oppilas1, oppilas3]
              }

let luokka2 = {nimi:"2B",
              opplaidenMäärä:24,
              oppilaat:[oppilas2]
              }

let koulu_ = { oppilaidenMäärä:100,
              nimi:"Kangasalan ala-aste",
              luokat:[luokka1,luokka2]}  


function App() {
  const [koulu, setKoulu] = useState(koulu_)

  const koulunNimiMuuttui = (nimi) => {
    
    const kouluKopio = JSON.parse(JSON.stringify(koulu))
    kouluKopio.nimi = nimi
    
    setKoulu(kouluKopio)
    console.log(kouluKopio)
  }
  const oppilaanNimiMuuttui = (nimi,oppilaanIndex,luokanIndex) => {
    const kouluKopio = JSON.parse(JSON.stringify(koulu))
    kouluKopio.luokat[luokanIndex].oppilaat[oppilaanIndex].nimi = nimi
    console.log("OK")  
    setKoulu(kouluKopio)
    console.log(kouluKopio)
  }
  return (
      <div>
      <Koulu koulu = {koulu} oppilaanNimiMuuttui={oppilaanNimiMuuttui} koulunNimiMuuttui = {koulunNimiMuuttui}/> 

      </div>
  );
}

export default App;
