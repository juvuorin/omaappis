import logo from './logo.svg';
import './App.css';
import { useState, useReducer, useEffect } from "react"
import axios from 'axios' // npm install axios , jos ei ole jo ladattu

function reducer(state, action) {
  switch (action.type) {
    case 'KATEGORIOIDEN_NOUTO_ALOITETTU':
      console.log("kategorioiden nouto aloitettu")
      return { ...state, kategorioidenNoutoAloitettu:true}
    case 'KATEGORIAT_NOUDETTU':
      console.log("kategoriat noudettu")
      return { ...state, kategoriat: action.payload/* ,kategorioidenNoutoAloitettu:false */ }
    case  'KATEGORIOIDEN_NOUTO_EPÄONNISTUI':
      console.log("datan nouto epäonnistui")
      return { ...state, kategorioidenNoutoEpäonnistui:true,kategorioidenNoutoAloitettu:false }
      case 'YYYY':
    default:
      throw new Error("Action.type kentän arvoa ei tunnistettu");
  }
}
function AppHuuto() {
  const [appData, dispatch] = useReducer(reducer, { kategoriat: [],kategorioidenNoutoAloitettu:false, kategorioidenNoutoEpäonnistui:false });

  useEffect(() => {
    async function haeDataa() {
      //      let result = await axios('https://api.huuto.net/1.1/categories');
      try {
        dispatch({ type: 'KATEGORIOIDEN_NOUTO_ALOITETTU'})
        let result = await axios('https://api.huuto.net/1.1/categories');        
        dispatch({ type: 'KATEGORIAT_NOUDETTU', payload: result.data.categories })
        console.log(result.data.categories)
      } catch (error) {
        console.log("Tuli muuten hitonmoinen ongelma:",error)
        dispatch({ type: 'KATEGORIOIDEN_NOUTO_EPÄONNISTUI' })
 
      }
    }
    haeDataa();
  }, []);

  return (
    <div>{appData.kategoriat.map(item => <div>{item.title}</div>)}

    {appData.kategorioidenNoutoAloitettu && "Noudetaan kategorialista huuto netistä!"}

    {appData.kategorioidenNoutoEpäonnistui && "Kategorioiden nouto epäonnistui"}

    </div>
  );
}

export default AppHuuto;