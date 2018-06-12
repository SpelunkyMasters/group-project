import React, { Component } from 'react';
import FileSend from './FileSend/FileSend';
import Comments from './Comments/Comments';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import axios from 'axios';
import glamorous from 'glamorous';
import cross from '../../../assets/img/cross.png';
import heart from '../../../assets/svg/57602.svg';

const TimelineBox=glamorous.div({
  height:'calc(100vh - 70px)',
  background: `white`,
  marginLeft: '-10px',
  width:'106.5%',
  
})
const InputField = glamorous.input({
  fontSize: '13px',
  width: '80%',
  margin:'0 auto',
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
const FirstPart=glamorous.div({
  display:'flex',
  flexFlow:'row',
  padding:20,
  height:'20%',
  alignItems: 'center',
  justifyContent: 'space-between',
})
const FirstHalf=glamorous.div({
  height:'100%',
  width:'70%',
  display:'flex',
  flexDirection:'column',
  justifyContent: 'space-around',
  alignItems: 'space-between',
})
const SecondHalf=glamorous.div({
  height:33,
  display:'flex',
  flexDirection:'row',
  justifyContent:'space-around',
  alignItems:'center'
})
const PrePost=glamorous.img({
  height:'70px',
  border:'1px black solid'

})
const ProfilePictureDiv=glamorous.div({
  height:'39px',
  width:'39px'
})
const ProfilePicture=glamorous.img({
  borderRadius:'50%',
  height:'100%',
  width:'100%'
})
const PostButton=glamorous.button({
  marginTop:2,
  height: 31,
  width:60.38,
  borderRadius: 4,
  border: '1px solid',
  borderColor: '#E7E7E7',
  },
  ({theme}) => ({
    backgroundColor: theme.sunglow
  })
  )
const UserInfo=glamorous.div({
  display:'flex',
  flexDirection:'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding:10
})
const Name=glamorous.div({
  marginLeft:5,
  width:'275px',
  height:'100%'
})
const PostName=glamorous.div({
  marginLeft:'5px',
  wordWrap: 'break-word'
})
const TimelinePosts=glamorous.div({
  height:'80%',
  overflow:'auto'
})
const LikeButton=glamorous.img({
  height:'20px',
  width:'20px',
  padding:'3px',
  borderRadius:'50%',
  border:'1px solid black',
},
({color}) => ({
  backgroundColor: color
}))
const DeleteButton=glamorous.div({
  backgroundColor:'transparent',
  border:'none',
   height:'20px'
})
const LikeDelete=glamorous.div({
  display:'flex',
  flexDirection:'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding:' 0 10px'
})
const LikeNumber=glamorous.span({
  fontSize:'20px',
  marginLeft:'10px'
})
const LikeDiv=glamorous.div({
  display:'flex',
  flexDirection:'row',
  alignItems: 'center',
})


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
      posts.forEach((e,i,arr)=>e.postid===post[2]?post[3]?arr[i].likes.push(post[0]):arr[i].likes.splice(arr[i].likes.indexOf(post[0]),1):e)
      this.setState({posts})
    }
    else{
    //updating messages array once new message received

      this.setState({
    posts: [post, ...this.state.posts],
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
console.log('like', like, 'likes', likes)
this.socket.emit('message sent', {
  message:[this.props.user.userid ,  null, postid, like],
  room: this.state.room
})
axios.put('/api/timeline',{postid,like})

}
  render() {
        //getting messages array
var posts=this.state.posts.map((e,i)=>{
  var color='';
  e.likes.includes(this.props.user.userid)?color='#ff6666': color='';
  return <div key={i}><UserInfo><ProfilePictureDiv><ProfilePicture src={e.picture} alt="profile"/></ProfilePictureDiv><Name>
  {e.first_name} {e.last_name}</Name></UserInfo>  <img src={e.post_image} alt="profile"  width='100%'/>
  <LikeDelete>
    {/* like/dislike button */}
    <LikeDiv >
    <LikeButton onClick={()=>this.likeIt(e.postid, e.likes)} src={heart} alt="like" color={color} />
    <LikeNumber>{e.likes.length}</LikeNumber>
    </LikeDiv> 
    {/* deleting message button */}
   {e.userid==this.props.user.userid? <DeleteButton onClick={()=>this.deleteMessage(e.postid)}>
   <img src={cross} alt="delete" height='100%'  />
    </DeleteButton>: <div> </div>}</LikeDelete>
   <PostName> {e.post_name}</PostName>
  {this.state.flag && <Comments room={'comment'+e.postid} postid={e.postid}/>}
   </div>
})
    return (
      <TimelineBox>
          <FirstPart>
          {this.state.url===''?
          <div>
          <PrePost src='http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder.png'alt='placeholder'/>
          </div>:
          <div>
          <PrePost src={this.state.url} alt="post"/>
          </div>}
          <FirstHalf>
          <InputField placeholder="Type in header" value={this.state.input} onChange={e=>this.setState({input:e.target.value})}/>
          <SecondHalf>
          <FileSend getUrl={this.getUrl}/>
          <div>
          <PostButton onClick={this.sendMessage}> POST </PostButton>
          </div>
          </SecondHalf>
          </FirstHalf>

          </FirstPart>
        <TimelinePosts>
          {posts}
        </TimelinePosts>
      </TimelineBox>
    );
  }
}

function mapStateToProps(state){
  return {user:state.user}
}
export default connect(mapStateToProps)(Timeline) ;
