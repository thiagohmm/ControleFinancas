import React from 'react'

export default function Pesquisa(props) {
  return (
    <div>
       <input
                  type="text"
                  name={props.name}
                  onChange={e => props.pesquisarFunc(e.currentTarget.value)}
                  className="form-control"
                  
                />
      
    </div>
  )
}
