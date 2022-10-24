import logo from './logo.svg';
import './App.css';
import { useState, useReducer, useEffect } from "react"
import axios from 'axios'

function reducer(state, action) {
  switch (action.type) {
    case 'ZZZZ':
    case 'YYYY':
    default:
      throw new Error("Action.type kentän arvoa ei tunnistettu");
  }
}
function App() {
  const [appData, dispatch] = useReducer(reducer, { dataInitialized: false });

  useEffect(() => {
    async function haeDataa() {
      let result = await axios('https://api.huuto.net/1.1/categories');
  
    }
    haeDataa();
  }, []);

  return (
    <div>
    </div>
  );
}

export default App;