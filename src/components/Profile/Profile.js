import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import FileUpload from './FileUpload/FileUpload';
import {connect} from 'react-redux';


class Profile extends Component {
  constructor(props){
    super(props);
    this.state={
      edit:false,
      first_name:this.props.user.first_name,
      last_name:this.props.user.last_name,
      email:this.props.user.email
    }
  }
  render() {
    return (
      <div className="Profile">
        <NavLink to="/home"><button>Home</button></NavLink>
        <h1>Profile</h1>
        {!this.state.edit?
        <div>
        <p>{this.state.first_name}</p>
        <p>{this.state.last_name}</p>
        <p>{this.state.email}</p>
        </div>
                      :
        <div>
        <input value={this.state.first_name} onChange={e=>this.setState({first_name:e.target.value})}/>
        <input value={this.state.last_name} onChange={e=>this.setState({last_name:e.target.value})}/>
        <input value={this.state.email} onChange={e=>this.setState({email:e.target.value})}/>
        </div>
        }
        <button onClick={()=>this.setState({edit:true})}>Edit</button>
        <FileUpload/>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {user:state.user}
}
export default connect(mapStateToProps)(Profile) ;
