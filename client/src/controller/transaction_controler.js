import axios from 'axios';


export const getTransactionDate = async (period) =>{
  let dados = [];
  //console.log(period)
   await axios
    .get(`http://localhost:3001/api/transaction?period=${period}`)
    .then((res) => {
      //console.log(res)
      dados = res.data;

    
    })
    .catch((err) => {
      console.log(err);
    });
    console.log(dados);
  return dados;
  

}




export const getTransactionId = async (id) =>{
  let dados = [];
  //console.log(period)
   await axios
    .get(`http://localhost:3001/api/transaction?id=${id}`)
    .then((res) => {
      //console.log(res)
      dados = res.data;

    
    })
    .catch((err) => {
      console.log(err);
    });
    console.log(dados);
   return dados;
  

}


export const getTransactionSearch = async (search) =>{
  let dados = [];
  //console.log(period)
   await axios
    .get(`http://localhost:3001/api/transaction/${search}`)
    .then((res) => {
      //console.log(res)
      dados = res.data;

    
    })
    .catch((err) => {
      console.log(err);
    });
    console.log(dados);
  return dados;
  

}


export const excluirTransaction = async (id,mes,search) => {
  console.log(search);

  await axios.delete(`http://localhost:3001/api/transaction/${id}`).catch((err) => {
    console.log(err);
  });
  if (search === '' || search === undefined) {
  return getTransactionDate(mes) 
  }
  else{
    return getTransactionSearch(search)
  }
};





export const salvar = (transaction) => {
  console.log(transaction)
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios
    .post(
      'http://localhost:3001/api/transaction/',
      JSON.stringify(transaction)
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};


export const updateTransaction = (id, transaction) => {
  axios.put(`/api/transaction/${id}`, transaction)
    .then((res) => {
      console.log(res);
      console.log(res.data);
      // alert('Contato salvo com sucesso');
    })
    .catch((err) => {
      console.log(err);
    });
}

