import React, { Component } from 'react';
import io from 'socket.io-client';


class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: ``,
      messages:[],
    //   trip num will go to room
      room: 1
    }

    this.updateMessage = this.updateMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.componentDidMount=this.componentDidMount.bind(this);
    this.scrollToBottom=this.scrollToBottom.bind(this);

  }
  componentDidMount() {
// socket stuff
    this.socket = io();
    this.socket.on(`${this.state.room} dispatched`, data => {
      console.log(data)
      this.updateMessage(data);
    })
    this.socket.on('room joined', data => {
      this.joinSuccess()
    })
    
  }
  updateMessage(message) {
      this.setState({
    messages: [...this.state.messages, message],
    input:''})
    this.scrollToBottom()
  }
  sendMessage() {

var message=this.state.input
         this.socket.emit('message sent', {
      message,
      room: this.state.room
    }) 
}


scrollToBottom() {
  if(this.el!==null)this.el.scrollIntoView({ behavior: "smooth" });
  
}

  render() {
var messages=this.state.messages.map((e,i)=>{
    return <div id={i}>{e} </div>
})

    return (
      <div className="Tiermessages">
      
              
            <div id="chat">
                  {
                  messages
                  }
                  <div ref={(el) => { this.el = el; }}></div>
              </div>
            <input value={this.state.input} onChange={e=>this.setState({input:e.target.value})}/>
            <button onClick={this.sendMessage}>Send </button>

              
                
              

      
      </div>
    );
  }
}


export default Chat;
