import React, { Component } from 'react';
import FileSend from './FileSend/FileSend';
import Comments from './Comments/Comments';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import axios from 'axios';

class Timeline extends Component {
  constructor(props){
    super(props);
    this.state={
      flag: true,
      url:'',
      input: '',
      posts:[],
    //   trip num will go to room
      room: "timeline"+this.props.match.params.id
    }
this.getUrl=this.getUrl.bind(this);
this.updateMessage = this.updateMessage.bind(this);
this.sendMessage = this.sendMessage.bind(this);
this.componentDidMount=this.componentDidMount.bind(this);

  }
  componentDidMount() {
    //getting all the messages for this trip ordered by id
    axios.get(`/api/timeline/${this.props.match.params.id}`).then(res=>{
      this.setState({posts:res.data})
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
  updateMessage(post) {
    //sending null as first element in array if it was deleting and filtering it from messages
    if(post[0]===null) {
      let posts=this.state.posts.filter(e=> e.postid!==post[1])
      this.setState({posts,
      flag:true})}
      // sending null as second element if like/dislike action happened
    else if(post[1]===null){
      let posts=this.state.posts.slice()
      //finding post that was liked/ disliked and push or remove userid based on like or dislike happened
      posts.forEach((e,i,arr)=>e.postid===post[2]? post[3]? arr[i].likes.push(post[0]): arr[i].likes.splice(arr[i].likes.indexOf(post[0]), 1):e)
      this.setState({posts})
    }
    else{
    //updating messages array once new message received

      this.setState({
    posts: [...this.state.posts, post],
    input:'',
    url:''})
    }

  }
  sendMessage() {
    var post_name=this.state.input;
    var post_image=this.state.url;
    var tripid=this.props.match.params.id;
    var {userid, picture, first_name, last_name, email}=this.props.user
if(post_image==='') alert('Choose a photo')
else{
    //posting new message in data base and sending it to socket
    axios.post('/api/timeline',{post_name, post_image, tripid} ).then(res=>{
      console.log("POST DATA", res.data)
      var{postid, tripid, post_image, post_name, likes}=res.data
      this.socket.emit('message sent', {
          message:{postid, tripid, post_image, post_name, likes, userid, picture, first_name, last_name, email},
          room: this.state.room
        })
  })  
}

  }
  deleteMessage(postid){
    this.setState({flag: false})
    // sending message to with null and messageid thru socket
      this.socket.emit('message sent', {
        message:[null, postid],
        room: this.state.room
      })
    //deleting message from database
    axios.delete(`/api/timeline/${postid}`).then(res=>{
      console.log("ACHTUNG!")
    })
  }
getUrl(url){
  // getting url from s3 
this.setState({url})
}
likeIt(postid, likes){
var like=true
// checking if array of likes includes this user and assign false if it is
if(likes)like=!likes.includes(this.props.user.userid)
this.socket.emit('message sent', {
  message:[this.props.user.userid ,  null, postid, like],
  room: this.state.room
})
axios.put('/api/timeline',{postid,like})

}
  render() {
        //getting messages array
var posts=this.state.posts.map((e,i)=>{
  return <div key={i}><div><img src={e.picture} alt="profile" height='50px' width='50px'/>
  {e.first_name} {e.last_name}</div> <div> {e.post_name}</div> <img src={e.post_image} alt="profile" height='200px' width='200px'/>
  <div>
    {/* like/dislike button */}
    <button onClick={()=>this.likeIt(e.postid, e.likes)}>
    <img src='https://cdn0.iconfinder.com/data/icons/basic-ui-elements-colored/700/08_heart-2-512.png' alt="like" height='20px' width='20px'/>
    </button> {e.likes.length}
    {/* deleting message button */}
   {e.userid==this.props.user.userid? <button onClick={()=>this.deleteMessage(e.postid)}>delete </button>: <p> </p>}</div>

  {this.state.flag && <Comments room={'comment'+e.postid} postid={e.postid}/>}
   </div>
})
    return (
      <div>
          Timeline
          <input value={this.state.input} onChange={e=>this.setState({input:e.target.value})}/>
          {this.state.url===''?
          <p>your picture will be here</p>:
          <img src={this.state.url} alt="post"/>}
          <FileSend getUrl={this.getUrl}/>
          <button onClick={this.sendMessage}> Post </button>
          {posts}
      </div>
    );
  }
}

function mapStateToProps(state){
  return {user:state.user}
}
export default connect(mapStateToProps)(Timeline) ;
