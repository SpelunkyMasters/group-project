import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import {connect} from 'react-redux';
import glamorous from 'glamorous';
import cross from '../../../../assets/img/cross.png';

const CommentBox=glamorous.div({
  maxHeight:'25vh',
  overflow:'auto',
  width:'100%'
})
const Button=glamorous.button({
  width: '40%',
marginLeft: '30%',
marginRight: '30%',
borderRadius: '4px',
border: '1px solid',
borderColor: '#E7E7E7',
backgroundColor: '#384E77',
color:'white'
})
const Comment=glamorous.div({
  display:'flex',
  flexDirection:'row',
  justifyContent: 'space-between',
  padding:5
})
const CommentName=glamorous.span({
  color: '#262626',
  fontWeight: '900',
  wordWrap: 'break-word',
  fontSize:14,
  fontFamily: 'Arial, Helvetica, sans-serif',
  letterSpacing:1
  
})
const CommentText=glamorous.span({
  wordWrap: 'break-word',
  fontWeight:'100',
  fontSize:14,
  fontFamily: 'Arial, Helvetica, sans-serif',
  letterSpacing:1
})
const DeleteButton=glamorous.div({
  backgroundColor:'transparent',
  border:'none',
   height:'8px'
})
const InputField = glamorous.input({
  fontSize: '13px',
  width: '65%',
  margin:'0 5px',
  height: '20px',
  padding: '3px 10px',
  borderRadius: '35px',
  marginRight: "9px",
  border: "none",
  boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.5) inset",
  ":focus": {
      outline: 0,
    }
  })
  const SendButton=glamorous.button({
    margin:'0 auto',
    height: 26,
    width:60.38,
    borderRadius: 4,
    border: '1px solid',
    borderColor: '#E7E7E7',
    },
    ({theme}) => ({
      backgroundColor: theme.sunglow
    })
    )
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

      this.setState({comments:comment[1]})}
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
  var comments=this.state.comments.filter(e=> e.commentid !== commentid)
  console.log(comments)
  this.setState({comments},()=>{  
    this.socket.emit('message sent', {
      message:[null, comments],
      room: this.state.room
    })
    axios.delete(`/api/comment/${commentid}`).then(res=>{
  // sending message to with null and messageid thru socket
  })})
  //deleting message from database

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
    return <Comment key={i}><div onClick={()=>this.selectName(e.first_name, e.last_name.charAt(0))} >
    <CommentName>{e.first_name} {e.last_name}</CommentName><CommentText> {e.comment_text}</CommentText> </div>
    {e.userid === this.props.user.userid? <DeleteButton onClick={()=>this.deleteMessage(e.commentid)}>
    <img src={cross} alt="delete" height='100%'/></DeleteButton>: <p> </p>}
    </Comment>
})

    return (
      <CommentBox>
      {/* showing/closing comments on click of the button  */}
      <Button onClick={()=>this.setState({show:!this.state.show})}>{this.state.show?'Hide comments':'Show comments'}</Button>
      {this.state.show?
      <div>
      {comments}
      <InputField placeholder='Add a comment...' value={this.state.input} onChange={e=>this.setState({input:e.target.value})}/>
            <SendButton onClick={this.sendMessage}>SEND </SendButton>
        </div>:
        <p></p>
    }

      </CommentBox>
    );
  }
}

function mapStateToProps(state){
  return {user:state.user}
}
export default connect(mapStateToProps)(Comments) ;
