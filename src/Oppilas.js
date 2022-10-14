import logo from './logo.svg';
import './App.css';

const Oppilas = (props) => {
  return (
    <div>
      <div>{props.oppilas.nimi}
      <input type="text" onChange={(event)=>{ props.oppilaanNimiMuuttui(event.target.value,props.index,props.luokanIndex) }}  value = {props.oppilas.nimi}/>

      </div>
      <div>{props.tieto2}
      </div>
    </div>
  );
}

export default Oppilas;