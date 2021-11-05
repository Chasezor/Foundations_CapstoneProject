const fs = require('fs')
const inputs= []

let num1 = 10;
let num2 = 5;



const runPython =(text) =>{
    const {spawn} = require('child_process');

    const pythonCode = spawn('python3', ['hello.py', `${text}`])
    const pythonCode2 = spawn('python3', ['another.py', `${num1}`, `${num2}` ])

    const pythonCode3 = spawn('python3', ['main.py', `${text}`])


    pythonCode.stdout.on('data', (data) => {
        console.log(data.toString());
      });
    
    pythonCode2.stdout.on('data', (data) => {
        console.log(data.toString());

      });

    pythonCode3.stdout.on('data', (data) => {
        console.log(data.toString());

      });

      
}


module.exports = {
callscript: (req, res) =>{


    console.log(req.body.message)
    const str = req.body.message


    inputs.push(str)
    
    if(str) {
    const myJSON = JSON.stringify(inputs);
    fs.writeFile(`inputs.json`, myJSON, (err) => {
  

      if (err) throw err;
    })
    }

   
    runPython(str)
    res.status(200).send(str)
    },
}



