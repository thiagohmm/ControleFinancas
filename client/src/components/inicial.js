import React from 'react';
import  { useState,  useEffect } from 'react';
import {getTransactionDate} from '../controller/transaction_controler'
import DatePicker from "react-datepicker";
import Resumo from './Resumo';
import List from './List'



const today = new Date();

function getperiodToday (data) {

  var a = data;
  var month = ("0" + (a.getMonth() + 1)).slice(-2);
  
  let period = ` ${a.getFullYear()}-${month}`
  return period.trim();
}



function Inicial() {



  const [period, setPeriod] = useState(new Date());
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
 
    async function getSelectResult() {
      setIsLoading(true);
      const apiPeriodToday = await getTransactionDate(getperiodToday(period));
      //console.log(apiPeriodToday)
      setResult(apiPeriodToday);
     
     
      
      setIsLoading(false);
      
    }

    getSelectResult();
  }, [period]);



 




  return ( 
  <div className="jumbotron " style={{position: 'absolute'}}>
  <h1 className="display-5">Bootcamp Full Stack - Desafio Final </h1>
  <p className="lead">Controle Financeiro Pessoal</p>
  
  
  <p className="lead">
    <a className="btn btn-primary btn-lg" href="#" role="button">Novo Lançamento</a>
    
  </p>

  <hr className="my-4"/>

<div style={{position: 'relative'}}>
<label>Mês/Ano</label>
  <DatePicker 
      selected={period}
      onChange={date => setPeriod(date)}
      dateFormat="MM/yyyy"
      showMonthYearPicker
     
    />
</div>


   <div style={{ paddingTop: '20px', paddingBottom: '10px'}}>
   <Resumo registro ={result} ></Resumo>
   </div>
   {result.map((item) => <List dia={item.day} category={item.category} description={item.description} value={item.value} type={item.type} month={item.yearMonth} id={item._id} updateList={setResult} ></List>)}
</div>
  )
}

export default Inicial;