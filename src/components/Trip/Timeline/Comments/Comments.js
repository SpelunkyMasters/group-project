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
      show: false
    }

    this.updateMessage = this.updateMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.componentDidMount=this.componentDidMount.bind(this);

  }
  componentDidMount() {
    //getting all the messages for this trip ordered by id
    console.log("postid",this.props.postid)
    axios.get(`/api/comment/${this.props.postid}`).then(res=>{
        console.log("COMPONENT did mount", res.data)
        console.log("postid",this.props.postid)
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
  componentWillReceiveProps(nextProps){
    //checking if props changed and filtering if they did
    if(this.props.postid!==nextProps.postid){
    //getting all the messages for this trip ordered by id
    axios.get(`/api/messages/${this.props.postid}`).then(res=>{
        console.log("COMPONENT did mount", res.data)
      this.setState({comments:res.data})
    })
    }
}
  updateMessage(comment) {
    //sending null as first element in array if it was deleting and filtering it from messages
    if(comment[0]===null) {
      console.log("ACHTUNG!!!")
      var comments=this.state.comments.filter(e=> e.commentid!=comment[1])
      this.setState({comments})}
    else{
    //updating messages array once new message received
    console.log("ANTIACHTUNG!")
      this.setState({
    comments: [...this.state.comments, comment],
    input:''})
    }

  }
  sendMessage() {

  var comment_text=this.state.input;
  var postid=this.props.postid;
  var {userid, first_name, last_name, email, picture}=this.props.user
  //posting new message in data base and sending it to socket
  axios.post('/api/comment',{comment_text, postid} ).then(res=>{
      console.log("RECEIVED THIS SHIT!", res.data)
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




  render() {

var comments=this.state.comments.map((e,i)=>{
    return <div id={i}><img src={e.picture} alt="profile" height='50px' width='50px'/>
    {e.first_name} {e.last_name} {e.comment_text} {e.userid==this.props.user.userid? <button onClick={()=>this.deleteMessage(e.commentid)}>delete </button>: <p> </p>}</div>
})

    return (
      <div className="Tiermessages">
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
