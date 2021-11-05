const fs = require('fs')


const msg = require('./sample.json')


module.exports = {

getData: (req, res) =>{

    setTimeout(function () {

        fs.readFile('./sample.json', 'utf8' , (err, data) => {
            if (err) {
              console.error(err)
              return
            }
            console.log(data)
            res.status(200).send(data)
          })
         
    }, 700);
  


    }

}