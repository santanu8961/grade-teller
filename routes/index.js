var express = require('express');
var router = express.Router();
var brain = require('brain.js');
var net = new brain.NeuralNetwork();
var data = require('../data/data.json')


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
router.post('/brain',(req,response)=>{
  console.log(req.body);
  // response.send('sh');
  var test = [];
  for(var i = 0; i<data.length;i++){
    var bad = 1-data[i].good;
    test.push({input:{
      bengali:data[i].bengali,
      english:data[i].english,
      maths:data[i].maths
    },output:{
      good:data[i].good,
      bad:bad
    }
    });

  }
  console.log(test)
  net.train(test);
  var y = new Promise((resolve,reject)=>{
    resolve(net.run({
      bengali:req.body.bengali,
      english:req.body.english,
      maths:req.body.maths
    }))
  })
  var outcome = y.then(
    function(res){
      console.log(res)
      // response.send(res)
      if (res.good >=0.0000000000000000 && res.good<0.3000000000000000) {
        response.send({grade:'C',good:res.good,name:req.body.name});
      } else if(res.good >=0.3000000000000000 && res.good<0.5000000000000000) {
        console.log('asb')
        response.send({grade:'B',good:res.good,name:req.body.name});
        
      } else if(res.good >=0.5000000000000000 && res.good<0.7000000000000000) {
        response.send({grade:'A',good:res.good,name:req.body.name});
        console.log('asb')
      } else if(res.good >=0.7000000000000000 && res.good<0.9000000000000000) {
        console.log('asb')
        response.send({grade:'A+',good:res.good,name:req.body.name});
      } else if(res.good >=0.9000000000000000 && res.good<1.0000000000000000) {
        console.log('asb')
        response.send({grade:'O',good:res.good,name:req.body.name});
      }
      
    }
      );
  // var x = setTimeout(()=>{console.log(outcome)},1000) 
})
module.exports = router;
