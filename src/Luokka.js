import logo from './logo.svg';
import './App.css';
import Oppilas from './Oppilas';

const Luokka = (props) => {
  return (
    <>
      <div>Luokan nimi:{props.luokka.nimi}</div>
      <div>Oppilaat:</div>
      <div>{props.luokka.oppilaat.map((oppilas,index) => <Oppilas oppilaanNimiMuuttui={props.oppilaanNimiMuuttui} index={index} luokanIndex={props.luokanIndex} oppilas={oppilas} tieto2={10} />)}</div>
    </>
  );
}

export default Luokka;