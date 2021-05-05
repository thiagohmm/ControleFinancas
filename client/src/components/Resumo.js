import React from 'react'
import List from './List'


export default function Resumo(props) {


const receitas = () =>{
 return props.registro.filter((item) => item.type === "+").reduce((acumulado, item) => acumulado + item.value, 0) 
}


const despesas = () =>{
  return props.registro.filter((item) => item.type === "-").reduce((acumulado, item) => acumulado + item.value, 0) 
 }


 const saldo = () =>{

  let lucro = receitas ()
  let dividas = despesas ()
  return lucro - dividas

 }

const total = () =>{
  return props.registro.length
}



  return (
    <div>

<table className="table table-hover">
 
  <tr className="table-active">
      <th scope="row">Total: {total()} </th>
      <td style={{color: "green"}}>Receitas: {receitas().toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} </td>
      <td style={{color: "red"}}>Despesas: {despesas().toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
      <td style={ saldo() >= 0 ? { color:'green'} : {color: 'red' }}>Saldo: R$ {saldo().toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
    </tr>
  </table>
      <div>
   
       
       
      </div>

    </div>
  )
}
