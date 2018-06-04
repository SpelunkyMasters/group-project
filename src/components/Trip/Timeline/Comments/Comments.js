import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import {connect} from 'react-redux';


class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: ``,
      comments:[],
    //   trip num will go to room
      room: this.props.room,
      show: false,
      address:'',
      addressOn:false
    }

    this.updateMessage = this.updateMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.componentDidMount=this.componentDidMount.bind(this);

  }
  componentDidMount() {
    //getting all the comments for this trip ordered by id
    axios.get(`/api/comment/${this.props.postid}`).then(res=>{
      this.setState({comments:res.data})
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
  updateMessage(comment) {
    //sending null as first element in array if it was deleting and filtering it from comments
    if(comment[0]===null) {
      var comments=this.state.comments.filter(e=> e.commentid!=comment[1])
      this.setState({comments})}
    else{
    //updating messages array once new comment received
      this.setState({
    comments: [...this.state.comments, comment],
    input:''})
    }

  }
  sendMessage() {

  var comment_text=this.state.input;
  var postid=this.props.postid;
  var {userid, first_name, last_name, email, picture}=this.props.user
  //posting new comment in data base and sending it to socket
  axios.post('/api/comment',{comment_text, postid} ).then(res=>{

    var {commentid, postid, comment_text}=res.data
    this.socket.emit('message sent', {
        message:{userid, first_name, last_name, email, picture,commentid, postid, comment_text},
        room: this.state.room
      })
})
}
deleteMessage(commentid){
  //deleting message from database
  axios.delete(`/api/comment/${commentid}`).then(res=>{
  // sending message to with null and messageid thru socket
    this.socket.emit('message sent', {
      message:[null, commentid],
      room: this.state.room
    })
  })
}
selectName(first_name, last_name){
  //putting name in front of the message
  if(!this.state.addressOn){
  this.setState({address:first_name+' '+last_name+'.,',
                addressOn:true,
                input:first_name+' '+last_name+'.,'+this.state.input})}
  else{
    var address=first_name+' '+last_name+'.,'
    var input=address+this.state.input.split(this.state.address).join('')
    this.setState({address, input})
  }

}
  render() {

var comments=this.state.comments.map((e,i)=>{
    return <div id={i}><div onClick={()=>this.selectName(e.first_name, e.last_name.charAt(0))} ><img src={e.picture} alt="profile" height='50px' width='50px'/>
    {e.first_name} {e.last_name} {e.comment_text} </div>{e.userid==this.props.user.userid? <button onClick={()=>this.deleteMessage(e.commentid)}>delete </button>: <p> </p>}</div>
})

    return (
      <div className="Tiermessages">
      {/* showing/closing comments on click of the button  */}
      <button onClick={()=>this.setState({show:!this.state.show})}>Show/Hide</button>
      {this.state.show?
      <div>
      {comments}
      <input value={this.state.input} onChange={e=>this.setState({input:e.target.value})}/>
            <button onClick={this.sendMessage}>Send </button>
        </div>:
        <p></p>
    }

      </div>
    );
  }
}

function mapStateToProps(state){
  return {user:state.user}
}
export default connect(mapStateToProps)(Comments) ;
