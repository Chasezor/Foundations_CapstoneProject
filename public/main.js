const MessageBoard = document.querySelector('#chatbox')
const form = document.querySelector('form')

const baseURL = `http://localhost:5000/api/ai`








const socket = io();

const msgCallback = ({ data: msg }) => addMessageAi(msg[0].Wendy)
const errCallback = err => console.log(err)


const talkTo = body => axios.post(baseURL, body).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    const aiRep = () => axios.get(`http://localhost:5000/api/msg`).then(msgCallback).catch(errCallback)

    let message = document.querySelector('#usermsg')


    let bodyObj = {
        message: message.value,
    }

    talkTo(bodyObj)
    

    socket.emit('outGoing', `${message.value}`)
    
    message.value = ''
    document.querySelector('#usermsg').value = ''
    aiRep()


    
  

}


function addMessage(message)
{
    const postedMessage = document.createElement('div');
    postedMessage.classList.add('postMsg');
    postedMessage.setAttribute("id", 'postMsg');
    postedMessage.innerHTML = `<h4>${message}</h4>`
    MessageBoard.appendChild(postedMessage);

   
    if(postedMessage != null){
    setTimeout(function () {
        let he = document.getElementById('postMsg');
        he.parentElement.removeChild(he);
    }, 6000);
    }
}

function addMessageAi(message)
{
    const postedMessage = document.createElement('div');
    postedMessage.classList.add('postMsgAi');
    postedMessage.setAttribute("id", 'postMsgAi');
    postedMessage.innerHTML = `<h4>${message}</h4>`
    MessageBoard.appendChild(postedMessage);

    
    if(postedMessage != null){
    setTimeout(function () {
        let ae = document.getElementById('postMsgAi');
        ae.parentElement.removeChild(ae);
    }, 6000);
    }
}

socket.on('msg',(data) =>{
    addMessage(data)
    console.log(data)
})

form.addEventListener('submit', submitHandler)
console.log('script is linked')

