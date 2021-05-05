const express = require('express');
const transactionRouter = express.Router();
const TransactionModel = require('../models/TransactionModel');


// transactionRouter.get('/' , async(req, res)=>{
//   res.send("É necessário informar o parametro cujo valor deve estar no formato yyyy-mm")
//   req.query("tagId")

// } )



transactionRouter.get('/', async(req, res)=>{
  try {
    const period = req.query.period;
    console.log(period)

    if(!req.query.period){
     res.send("É necessário informar o parametro \"period\", cujo valor deve estar no formato yyyy-mm")
    }else{
   
    const transaction = await TransactionModel.find({yearMonth: period}).sort()
    res.send(transaction)
    }
  } catch {

    res.status(500).send(error)

  }
 })
 

 transactionRouter.get('/:filter', async(req, res)=>{
  try {
    const filter = req.params.filter;
    console.log(filter)

    if(!req.params.filter){
     res.send("filtro não passado")
    }else{
   
    const transaction = await TransactionModel.find( { $or:[{'category': {'$regex': filter}} ,{'description': {'$regex': filter}}]})
    res.send(transaction)
    }
  } catch {

    res.status(500).send(error)

  }
 })


 transactionRouter.post('/:period', async (req, res)=>{

  try {
    
    const transaction = new TransactionModel(req.body);
    await transaction.save();

    res.send(transaction);


  } catch (error) {
    res.status(500).send(error)
  }


});

transactionRouter.delete('/:id', async (req, res) =>{

  try{
  
    const id = req.params.id;
  
    const transaction = TransactionModel.findByIdAndDelete(id,function (err, docs) {
      if (err){
          console.log(err)
      }
      else{
          console.log("Deleted : ", docs);
          res.status(200).send(docs)
      }
  });

} catch (error) {
    
  res.status(500).send(error)
}

})
   
 
transactionRouter.put('/:id', async (req, res) =>{

  try {
  
    const id = req.params.id;
    

    const transaction = TransactionModel.findByIdAndUpdate({_id: id}, req.body,{
      runValidators: true}, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
           res.status(200).send(docs)
        }
    });
  
  } catch (error) {
      
    res.status(500).send(error)
  }
  
  })
 
  
    
  



module.exports = transactionRouter;
