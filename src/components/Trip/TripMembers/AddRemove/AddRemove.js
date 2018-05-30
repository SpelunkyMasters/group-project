import React, { Component } from 'react';
import axios from 'axios';

class AddRemove extends Component {
    constructor() {
        super();
        this.state = {
            user_list: []
        }
    }
componentDidMount(){
axios.get('/api/users').then( res => {
    console.log('users: ', res.data)
    this.setState({
        user_list: res.data
    })
})
}
  render() {

    return (
      <div>
          AddRemove
      </div>
    );
  }
}


export default AddRemove ;
