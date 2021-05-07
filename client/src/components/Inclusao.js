import React from 'react';
import  { useState,  useEffect } from 'react';
import { getTransactionId, salvar, updateTransaction } from '../controller/transaction_controler';
import Label from './Label';

export default function Inclusao(props) {
 
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [tipoGasto, setTipoGasto] = useState('-');
  const [id, setID] = useState('0');
  const [calendar, setCalendar] = useState();
  const [valor,setValor] = useState();
  


 
  useEffect ( () => {
    function load(){

      if (props.id){
       
    
     setDescricao(props.description)
    setCategoria(props.category)
    setTipoGasto(props.type)
    setID(props.id)
    setCalendar(props.yearMonthDay)
    setValor(props.value)

      }
   }
   
 
   
   load();

   
  
  },[])





  const onSubmit = (event) => {
    event.preventDefault();


    

    let dia = (calendar.split('-')[2])
    let mes =  +calendar.split('-')[1]
    let ano =  calendar.split('-')[0]
    let anomes = calendar.slice(0, -3)
   
    const transaction = {
      category: categoria,
      day: dia,
      description: descricao,
      month: mes,
      type: tipoGasto,
      value: valor,
      year: ano,
      yearMonth: anomes, 
      yearMonthDay: calendar

    }

    if (!props.id){
   
    const salvaTransaction =  () =>{
      const dataresult = salvar(transaction)
      } 
   

        salvaTransaction()
    }else{

      const atualizaTransaction = async () =>{
        const dataresult = await updateTransaction(id, transaction)
        } 

        atualizaTransaction()
    }




    
        props.fecharModal(false)

  }



  return (
    



  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Inclusão de Lançamento</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"onClick={() => props.fecharModal(false)}>
          <span aria-hidden="true"></span>
        </button>
      </div>
      <div className="modal-body">

   

      <div className="row">
      <div className="col-md-12">
      <div className="form-group">

      <div class="btn-group" role="group" aria-label="Basic radio toggle button group">


      {id === '0' ?(<><input type="radio" class="btn-check" name="tipoGasto" id="btnradio1" value="-" checked={tipoGasto === "-"}
          onChange={(e) => setTipoGasto(e.currentTarget.value)}/>
          <label class="btn btn-outline-primary" htmlFor="btnradio1">Despesa</label>

          <input type="radio" class="btn-check" name="tipoGasto" id="btnradio2" 
          value="+" checked={tipoGasto === "+"} onChange={(e) => setTipoGasto(e.currentTarget.value)}/>
          <label class="btn btn-outline-primary" htmlFor="btnradio2">Receita</label></>)
          
          
          
          :(
          <><input type="radio" class="btn-check" name="tipoGasto" id="btnradio1" value={tipoGasto} checked
           disabled/>
          <label class="btn btn-outline-primary" htmlFor="btnradio1">Despesa</label>

          <input type="radio" class="btn-check" name="tipoGasto" id="btnradio2" 
          value={tipoGasto}  disabled/>
          <label class="btn btn-outline-primary" htmlFor="btnradio2">Receita</label></>)}
             
          
 
      </div>

      <div className="row">
            <div className="col-md-12">
              <div className="form-group">
              <Label name="Descricão"></Label>
                <input
                  type="text"
                  name="descricao"
                  onChange={(e)=>setDescricao(e.currentTarget.value)}
                  value={descricao}
                                    
                />
              </div>
            </div>
            </div>


            <div className="row">
            <div className="col-md-12">
              <div className="form-group">
              <Label name="Categoria"></Label>
                <input
                  type="text"
                  name="categoria"
                  onChange={(e)=>setCategoria(e.currentTarget.value)}
                  value={categoria}
                                    
                />
              </div>
            </div>
            </div>




            <div className="row">
            <div className="col-md-6">
              <div className="form-group">
              <Label name="Valor"></Label>
                <input
                  type="text"
                  name="valor"
                  onChange={(e)=>setValor(e.currentTarget.value)}
                  value={valor}
                                    
                />
              </div>
            </div>


            <div className="col-md-6">
              <div className="form-group">
              <Label name="Valor"></Label>
                <input
                  type="date"
                  name="calendar"
                  onChange={(e)=>setCalendar(e.currentTarget.value)}
                  value={calendar}
                                    
                />
              </div>
            </div>




            </div>




     </div>
     </div>
     </div>
      
      
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={onSubmit} >Salvar</button>
      </div>
    </div>
  </div>


   
  )
}
