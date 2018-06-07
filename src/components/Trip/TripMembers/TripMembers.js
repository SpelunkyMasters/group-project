import React, { Component } from 'react';
import {connect} from 'react-redux';
import AddRemove from './AddRemove/AddRemove';
import axios from 'axios';
import glamorous from 'glamorous';


class TripMembers extends Component {
  constructor(){
    super();
    this.state={
      filter:'',
      users:[],
      invited:[]
    }
    this.deleteFromTrip=this.deleteFromTrip.bind(this)
    this.newInvite=this.newInvite.bind(this)
    this.deleteFromInvited=this.deleteFromInvited.bind(this)
  }
  componentDidMount(){
    //getting all the invited users, mapping thru them and saving them in state
    axios.get(`/api/tripusers/${this.props.match.params.id}`).then(res=>{
      var invited=res.data.map((e, i)=>{
        return (<div key={i}><img src={e.picture} alt="profile" width='50px' height='50px'/> 
        {e.email} {e.first_name} {e.last_name} <button onClick={()=>this.deleteFromInvited(i, e.userid)}>delete</button> </div>)
      })
      this.setState({invited}) 
    })
    //mapping thru users that are in this trip
       var users=this.props.users.map((e, i)=>{
      return (<div key={i}><img src={e.picture} alt="profile" width='50px' height='50px'/> 
      {e.email} {e.first_name} {e.last_name} <button onClick={()=>this.deleteFromTrip(i, e.userid)}>delete</button> </div>)
    }) 
    this.setState({users})
  }
  deleteFromInvited(i,userid){
        //deleting user from invites table
    axios.delete(`/api/invite/${userid}/${this.props.match.params.id}`).then(res=>{
      //removing this user from the list
      var invited=this.state.invited.slice();
      invited.splice(i,1);
      this.setState({invited})
    })
  }
  newInvite(e){
var i=this.state.invited.length;
var invited=<div key={i}><img src={e.picture} alt="profile" width='50px' height='50px'/> 
{e.email} {e.first_name} {e.last_name} <button onClick={()=>this.deleteFromInvited(i, e.userid)}>delete</button> </div>
this.setState({invited:[...this.state.invited, invited]})
  }
  deleteFromTrip(i, userid){
    //deleting user from database
    axios.delete(`/api/trip/${userid}/${this.props.match.params.id}`).then(res=>{
      //removing this user from the list
      var users=this.state.users.slice();
      users.splice(i,1);
      console.log('users', users)
      this.setState({users})
    })
  }
  render() {

    return (
      <div >
          TripMembers
          {this.state.users}
          Invited people
          {this.state.invited}
          <input value={this.state.filter} onChange={e=>this.setState({filter:e.target.value})} type='text'/>
          {/* showing AddRemove component if input field is not empty */}
          {
            this.state.filter.length>0?
            <AddRemove newInvite={this.newInvite} filter={this.state.filter} tripid={this.props.match.params.id}/>:
            <p></p>
          }
          
      </div>
    );
  }
}

function mapStateToProps(state){
  return {users:state.users}
}
export default connect(mapStateToProps)(TripMembers) ;
