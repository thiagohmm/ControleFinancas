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

export const excluirTransaction = async (id,mes) => {
  console.log('id para ser deletado', id);
  await axios.delete(`http://localhost:3001/api/transaction/${id}`).catch((err) => {
    console.log(err);
  });
  return getTransactionDate(mes)
};
