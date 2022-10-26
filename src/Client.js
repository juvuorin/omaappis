import logo from './logo.svg';
import './App.css';
import { useState, useReducer, useEffect } from "react"
import Nappain from './Nappain';
import axios from 'axios' // npm install axios , jos ei ole jo ladattu
import { getDefaultNormalizer } from '@testing-library/react';

const AppClient = () =>{
  const [data, setData]=useState("")
  useEffect(() => {
     const getData =async () => {
      const result = await axios('http://localhost:8080');        
      console.log("result:",result)
      setData(result.data)      
    }
    getData()
  }, []);


  return (
    <div>{data}
    </div>
  );
}

export default AppClient;