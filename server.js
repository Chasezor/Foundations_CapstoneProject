const express = require('express')
const path = require('path')
const world = require('./world')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors(
  {
    origin: "*"
  })
  )

const http = require('http').createServer(app)
const io = require('socket.io')(http)

const control = require('./control')

app.use(express.static(path.join(__dirname, "./public")));

io.on('connection', function(socket){
    console.log('client connected')
 
    socket.on('outGoing', msg =>{
        io.emit('msg', `${msg}`)

    })
})

app.post('/api/ai', world.callscript)

app.get('/api/msg', control.getData)


const port = process.env.PORT || 5000

console.log(port)

http.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })