import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import FileUpload from './FileUpload/FileUpload';
import {connect} from 'react-redux';
import {getUser,getTrips} from '../../ducks/reducer';
import axios from 'axios';
import UserTravelHistory from './UserTravelHistory/UserTravelHistory'


class Profile extends Component {
  constructor(){
    super();
    this.state={
      edit:false,
      first_name:'',
      last_name:'',
      email:''
    }
  }
  componentDidMount(){
    this.props.getUser().then(res=>{
      this.props.getTrips(this.props.user.userid)
      this.setState({      first_name:this.props.user.first_name,
        last_name:this.props.user.last_name,
        email:this.props.user.email})
    })
  }
  cancelChanges(){
    this.setState({edit:false,
      first_name:this.props.user.first_name,
      last_name:this.props.user.last_name,
      email:this.props.user.email})
  }
  saveChanges(){
    const {first_name, last_name, email}=this.state;
    const{userid}=this.props.user
    axios.put('/api/user',{userid, first_name, last_name, email}).then(res=>{
      this.props.getUser().then(()=>this.cancelChanges())
      
    })
  }
  render() {
    return (
      <div className="Profile">
        <NavLink to="/home"><button>Home</button></NavLink>
        <h1>Profile</h1>
        <img src={this.props.user.picture} alt="profile" width='100px' height='100px'/>
        {!this.state.edit?
        <div>
        <p>{this.state.first_name}</p>
        <p>{this.state.last_name}</p>
        <p>{this.state.email}</p>
        <button onClick={()=>this.setState({edit:true})}>Edit</button>
        </div>
                      :
        <div>
        <input value={this.state.first_name} onChange={e=>this.setState({first_name:e.target.value})}/>
        <input value={this.state.last_name} onChange={e=>this.setState({last_name:e.target.value})}/>
        <input value={this.state.email} onChange={e=>this.setState({email:e.target.value})}/>
        <button onClick={()=>this.saveChanges()}>Save</button>
        <button onClick={()=>this.cancelChanges()}>Cancel</button>
        </div>
        }
      
        
        <FileUpload />
        <UserTravelHistory />
      </div>
    );
  }
}

function mapStateToProps(state){
  return {user:state.user}
}
export default connect(mapStateToProps,{getUser, getTrips})(Profile) ;
