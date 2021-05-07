import React from 'react';
import  { useState,  useEffect } from 'react';
import {getTransactionDate, getTransactionSearch} from '../controller/transaction_controler'
import DatePicker from "react-datepicker";
import Resumo from './Resumo';
import List from './List'
import Label from './Label';
import Pesquisa from './Pesquisa';
import Inclusao from './Inclusao';





function getperiodToday (data) {

  var a = data;
  var month = ("0" + (a.getMonth() + 1)).slice(-2);
  
  let period = ` ${a.getFullYear()}-${month}`
  return period.trim();
}



function Inicial() {


  const [pesquisa, SetPesquisa] = useState('');
  const [period, setPeriod] = useState(new Date());
  const [result, setResult] = useState([]);
  const [modal, setModal] = useState(false);
  



  useEffect(() => {
 
    async function getSelectResult() {
     

      if (pesquisa === ''){
      const apiPeriodToday = await getTransactionDate(getperiodToday(period));
      //console.log(apiPeriodToday)
      setResult(apiPeriodToday);
      }else{

        setTimeout(async ()=> { 
          const apiSearch = await getTransactionSearch(pesquisa)
        setResult(apiSearch)
      }, 3000)
     
      }
     
      
     
      
     
    }

    getSelectResult();
  }, [period, pesquisa]);



  const mostraInclusao = () =>{
    setModal(true)
    console.log(modal)
  }


  return ( 

    
    
  <div className="jumbotron " style={{position: 'absolute'}}>
  <h1 className="display-5">Bootcamp Full Stack - Desafio Final </h1>
  <p className="lead">Controle Financeiro Pessoal</p>
  
  
  <p className="lead">
    <a className="btn btn-primary btn-lg" href="#" role="button" onClick={() => mostraInclusao()} >Novo Lançamento</a>
    
  </p>

  <hr className="my-4"/>

  {modal == true ?(<Inclusao fecharModal={setModal}></Inclusao>):("")}

  <div className="row">
  < div className="col-md-6">
      <div className="form-group">


          
          <Label name="Mês/Ano:"></Label>
            <DatePicker 
                selected={period}
                onChange={date => setPeriod(date)}
                dateFormat="MM/yyyy"
                showMonthYearPicker />
       </div>
       </div>

              <div className="col-md-4">
              <div className="form-group ">
              <Label name="Pesquisa:"></Label>
               <Pesquisa name="pesquisa" pesquisarFunc={SetPesquisa}></Pesquisa>

              </div>
              </div>
             


</div>



   <div style={{ paddingTop: '20px', paddingBottom: '10px'}}>
   <Resumo registro ={result} ></Resumo>
   </div>

   {result.map((item) => <List dia={item.day} category={item.category} description={item.description} 
   value={item.value} type={item.type} month={item.yearMonth} id={item._id} yearMonthDay={item.yearMonthDay} updateList={setResult} hasSearch={pesquisa} fecharModal={setModal}></List>)}

   
</div>
  )
}

export default Inicial;