import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import {connect} from 'react-redux';


class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: ``,
      messages:[],
    //   trip num will go to room
      room: this.props.match.params.id
    }

    this.updateMessage = this.updateMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.componentDidMount=this.componentDidMount.bind(this);
    this.scrollToBottom=this.scrollToBottom.bind(this);

  }
  componentDidMount() {
    //getting all the messages for this trip ordered by id
    axios.get(`/api/messages/${this.state.room}`).then(res=>{
      this.setState({messages:res.data})
      this.scrollToBottom()
    })
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
    //sending null as first element in array if it was deleting and filtering it from messages
    if(message[0]===null) {
      console.log("ACHTUNG!!!")
      var messages=this.state.messages.filter(e=> e.messageid!==message[1])
      this.setState({messages})}
    else{
    //updating messages array once new message received

      this.setState({
    messages: [...this.state.messages, message],
    input:''})
    }

    this.scrollToBottom()
  }
  sendMessage() {

  var message_text=this.state.input;
  var tripid=this.state.room;
  const {picture, first_name, last_name, userid}=this.props.user;
  console.log(picture, first_name, last_name, "All my info")
  //posting new message in data base and sending it to socket
  axios.post('/api/message',{message_text, tripid} ).then(res=>{
    console.log('MESSAGE ID is',res.data[0].messageid)
    this.socket.emit('message sent', {
        message:{message_text, picture, first_name, last_name, userid, messageid:res.data[0].messageid},
        room: this.state.room
      })
})
}
deleteMessage(messageid){
  //deleting message from database
  axios.delete(`/api/message/${messageid}`).then(res=>{
  // sending message to with null and messageid thru socket
    this.socket.emit('message sent', {
      message:[null, messageid],
      room: this.state.room
    })
  })
}


scrollToBottom() {
  if(this.el!==null)this.el.scrollIntoView({ behavior: "smooth" });
  
}

  render() {
    //getting messages array
var messages=this.state.messages.map((e,i)=>{
    return <div id={i}><img src={e.picture} alt="profile" height='50px' width='50px'/>
    {e.first_name} {e.last_name} {e.message_text} {e.userid===this.props.user.userid? <button onClick={()=>this.deleteMessage(e.messageid)}>delete </button>: <p> </p>}</div>
})

    return (
      <div className="Tiermessages">
      
              
            <div id="chat">
                  {
                  messages
                  }
                  <div ref={(el) => { this.el = el; }}></div>
              </div>
              {/* inputing and sending message */}
            <input value={this.state.input} onChange={e=>this.setState({input:e.target.value})}/>
            <button onClick={this.sendMessage}>Send </button>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {user:state.user}
}
export default connect(mapStateToProps)(Chat) ;
