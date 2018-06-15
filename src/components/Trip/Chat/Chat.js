import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import {connect} from 'react-redux';
import glamorous from 'glamorous';
import Message from './Message/Message';
import image from '../../../assets/img/text_background.png'
import logo2 from '../../../assets/svg/logo2.svg';
import sendIcon from '../../../assets/img/send-button.svg'
import { mediaQueries } from '../../styledComponents';

const ChatBox=glamorous.div({
  height:'calc(100vh - 70px)',
  padding: '20px',
  width:'106.5%',
  background: `url('${logo2}') center, no-repeat`,
  backgroundPosition: 'fixed',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '700px',
  marginLeft: '-10px',
  [mediaQueries.iPhone678]:{
    height:'calc(100vh - 64px)',
  },
  [mediaQueries.iPhoneX]: {
    height:'calc(100vh - 64px)',
}})

const ChatView=glamorous.div({
  overflow: 'auto',
  height: 'calc(100vh - 135px)',
  marginBottom: '5px'
})

const InputField = glamorous.input({
  fontSize: '18px',
  width: '66.5vw',
  height: '25px',
  padding: '5px',
  borderRadius: '35px'
})

const SendButton = glamorous.button({
width: '39px',
height: '39px',
borderRadius: '50%',
marginLeft: '10px',
padding:'6px',
paddingLeft:'10px'
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
    if(this.state.input !== '') {
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
      <ChatBox>
        <ChatView>
          {
            messages
          }
          <div ref={(el) => { this.el = el; }}></div>
        </ChatView>
        {/* inputing and sending message */}
        <InputField placeholder="Type a message" value={this.state.input} onChange={e=>this.setState({input:e.target.value})}/>
        <SendButton onClick={this.sendMessage}><img  width='80%' height='80%' src={sendIcon} alt="send" /></SendButton>
      </ChatBox>
    );
  }
}

function mapStateToProps(state){
  return {user:state.user}
}
export default connect(mapStateToProps)(Chat) ;
