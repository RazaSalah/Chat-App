const Fbutton = document.getElementById('Fperson')
const Sbutton = document.getElementById('Sperson')

const Header = document.querySelector('.chat-header')
const chMessage = document.querySelector('.chat-messages')

const form = document.querySelector('.chat-form')
const input = document.querySelector('.chat-input')

const clear = document.querySelector('.clear-button')

const array = JSON.parse(localStorage.getItem('array')) || []

window.onload = () =>{

    array.forEach(e => {
     chMessage.innerHTML += messageElement(e)
    });
}

const messageElement = (m) => `
<div class="message ${m.sender === 'Jhon' ? 'sender' : 'reciver'}">
<div class="mesage-sender">${m.sender}</div>
<div class="chat-message">${m.text}</div>
<div class="message-time">${m.time}</div>
</div>` 

let sender = 'Jhon'

const messageSender = (senderName) =>{
    sender = senderName

    Header.innerHTML = `${senderName} Chatting...`
    input.placeholder = `Type here , ${senderName}...`

    if(senderName === 'Jhon'){
        Fbutton.classList.add('active-person')
        Sbutton.classList.remove('active-person')
    }
    if(senderName === 'Jane'){
        Sbutton.classList.add('active-person')
        Fbutton.classList.remove('active-person')
    }

    input.focus();
}

const sendChat= (message) =>{
    message.preventDefault()
    const time = new Date().toLocaleString('en-US', {hour:"numeric" , minute:"numeric" , hour12:true})
    const chatMessages = {
        sender : sender,
        text : input.value ,
        time
    }

    array.push(chatMessages)
    localStorage.setItem('array' , JSON.stringify(array))
    chMessage.innerHTML += messageElement(chatMessages)
    form.reset();
    form.scrollTop = form.scrollHeight
}

form.addEventListener('submit', sendChat)

clear.addEventListener('click' , () =>{
    localStorage.clear();
    chMessage.innerHTML =''
})