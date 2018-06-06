import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import {connect} from 'react-redux';
import glamorous from 'glamorous';
import Message from './Message/Message';

const ChatBox=glamorous.div({
  height:'75vh',
  padding: '10px',
  width:'100%',
  overflow: 'auto'
},({theme})=>({
  backgroundColor:theme.white
}))

const InputField = glamorous.input({
  fontSize: "12px",
  width: '66.5vw',
  padding: '5px',
  borderRadius: "35px"
})

const SendButton = glamorous.button({
color: 'purple'
},
({theme}) => ({
  backgroundColor: theme.sunglow
})
)

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
    this.deleteMessage=this.deleteMessage.bind(this)

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
      this.updateMessage(data);
    })
    this.socket.on('room joined', data => {
      this.joinSuccess()
    })
    
  }
  updateMessage(message) {
    //sending null as first element in array if it was deleting and filtering it from messages
    if(message[0]===null) {
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
  //posting new message in data base and sending it to socket
  axios.post('/api/message',{message_text, tripid} ).then(res=>{
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
    return  <Message e={e} key={i} deleteMessage={this.deleteMessage} userid={this.props.user.userid}  />
})

    return (
      <div className="Tiermessages">
      
              
            <ChatBox>
                  {
                  messages
                  }
                  <div ref={(el) => { this.el = el; }}></div>
              </ChatBox>
              {/* inputing and sending message */}
            <InputField placeholder="Type it, bitch" value={this.state.input} onChange={e=>this.setState({input:e.target.value})}/>
            <SendButton onClick={this.sendMessage}>Send </SendButton>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {user:state.user}
}
export default connect(mapStateToProps)(Chat) ;
