import logo from './logo.svg';
import './App.css';
import Luokka from './Luokka'

const Koulu = (props) => {
  return (
    <>
      <div>Koulun nimi:{props.luokka.nimi}</div>
      <div>Luokat:</div>
      <div>{props.koulu.luokat.map(luokka => <Luokka luokka={luokka} />)}</div>
    </>
  );
}

export default Luokka;