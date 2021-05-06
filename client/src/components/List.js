import React from 'react'
import { excluirTransaction } from '../controller/transaction_controler'

export default function List(props) {

  const setaValor = async (id, mes,search) =>{
     const dataresult = await excluirTransaction(id,mes,search)
     props.updateList(dataresult)
    

  }


  const corClassName = props.type === "+" ? "table-success" : "table-danger"
  return (
    <div style={{textAlign: "right", verticalAlign: "bottom"}}>
      <table class="table table-hover">

      <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col"></th>
      <th scope="col"></th>
      <th scope="col"></th>
      <th scope="col"></th>
    </tr>
  </thead>
    

<tbody>
 
    <tr  class={corClassName}>
      <th scope="row">{props.dia}</th>
      <td>{props.category}</td>
      <td>{props.description}</td>
      <td>{props.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
      <button type="button" className="btn btn-info btn-sm">Editar</button>
      <button type="button" className="btn btn-warning btn-sm" onClick={() => setaValor(props.id,props.month,props.hasSearch)}>Deletar</button>
    </tr>
    </tbody>    
    </table>
    </div>
  )
}
