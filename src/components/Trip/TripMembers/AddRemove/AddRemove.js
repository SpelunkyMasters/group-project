import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

class AddRemove extends Component {
    constructor() {
        super();
        this.state = {
            user_list: [],
            showList:[]
        }
    }
    
componentDidMount(){
    //getting all the users that not invited yet,including the ones already in trip
axios.get(`/api/notinvited/${this.props.tripid}`).then( res => {
    console.log('users: ', res.data)
    
          //filtering string from parent
          var str=this.props.filter.toLowerCase();
          var tripUsers=[];
          //getting all the ids of the user in your trip
          const{users}=this.props
          for(var i=0; i<users.length;i++){
            tripUsers.push(users[i].userid)
          }
          //filtering out current users in your trip and the ones that does'nt have filter string
          var filteredList=res.data.filter(e=>!tripUsers.includes(e.userid)&&(e.first_name.toLowerCase()+' '+e.last_name.toLowerCase()).includes(str));
          //final list V
          var showList=filteredList.map((e,i)=>{
              return <div key={i}><img src={e.picture} alt="profile" width='50px' height='50px'/>
              {e.first_name} {e.last_name} <button onClick={()=>this.sendInvite(i, e.userid)}>Send invite </button>  </div>
          })
          this.setState({
            user_list: res.data,
            showList
        })
          
})
}
componentWillReceiveProps(nextProps){
    //checking if props changed and filtering if they did
    if(this.props.filter!==nextProps.filter){
            //filtering string from parent
            var str=nextProps.filter.toLowerCase();
            var tripUsers=[];
            //getting all the ids of the user in your trip
            const{users}=this.props
            for(var i=0; i<users.length;i++){
              tripUsers.push(users[i].userid)
            }
            //filtering out current users in your trip and the ones that does'nt have filter string
            var filteredList=this.state.user_list.filter(e=>!tripUsers.includes(e.userid)&&(e.first_name.toLowerCase()+' '+e.last_name.toLowerCase()).includes(str));
            //final list V
            var showList=filteredList.map((e,i)=>{
                return <div key={i}><img src={e.picture} alt="profile" width='50px' height='50px'/>
                {e.first_name} {e.last_name} <button onClick={()=>this.sendInvite(i, e.userid)}>Send invite </button>  </div>
            })
            this.setState({showList})  }
}
sendInvite(i, userid){
    //sending invite and removing that person from the list
    axios.post('/api/invite',{userid, tripid:this.props.tripid}).then(res=>{
        var showList=this.state.showList.slice();
        showList.splice(i,1);
        var invite=this.state.user_list.filter(e=>e.userid===userid)[0]
        this.props.newInvite(invite)
       
        console.log(showList)
        this.setState({showList})
    })
}
  render() {


    return (
      <div>
          AddRemove
          {this.state.showList}
      </div>
    );
  }
}

function mapStateToProps(state){
    return {users:state.users}
}

export default connect(mapStateToProps)(AddRemove) ;
