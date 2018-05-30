import React, { Component } from 'react';
import {connect} from 'react-redux';
import AddRemove from './AddRemove/AddRemove';

class TripMembers extends Component {
  constructor(){
    super();
    this.state={
      filter:''
    }
  }
  render() {
    var users=this.props.users.map((e, i)=>{
      return (<div key={i}><img src={e.picture} alt="profile" width='50px' height='50px'/> {e.email} {e.first_name} {e.last_name}  </div>)
    })
    return (
      <div>
          TripMembers
          {users}
          <input value={this.state.filter} onChange={e=>this.setState({filter:e.target.value})} type='text'/>

          {
            this.state.filter.length>0?
            <AddRemove filter={this.state.filter}/>:
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
