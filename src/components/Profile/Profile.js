import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import FileUpload from './FileUpload/FileUpload';
import {connect} from 'react-redux';
import {getUser,getTrips} from '../../ducks/reducer';
import axios from 'axios';
import glamorous from 'glamorous';
import arrow from '../../assets/svg/thin-arrow-pointing-left.svg'

import { mediaQueries } from '../styledComponents';

import Avatar from '../Avatar/Avatar';
import Btn from '../buttons/Btn/Btn';

import logoNoText from '../../assets/svg/logoNoText.svg'

import { colors } from '../styledComponents';

const ProfileDiv = glamorous.div({
  height: '100vh',
  backgroundImage: `url(${logoNoText})`,
  backgroundSize: '180%',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left 11px bottom -30px',
}, ({ theme }) => ({
  backgroundColor: theme.white
}))

const Header=glamorous.div({
  height: 70,
  display:'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '0 0 0 30px'
  

}, ({ theme }) => ({
    backgroundColor: theme.mainBg,
    color: theme.mainText
}))
const HeaderText=glamorous.h1({
  marginLeft:47,
  fontSize:30
})
const PictureEdit=glamorous.div({
  marginTop: 20,
  marginLeft: 35,
  display:'flex',
  height:'30vh',
  flexDirection:'row',
  alignItems: 'center',
})
// const ProfilePicture=glamorous.img({
//   borderRadius:'50%',
//    height:'120px',
//    marginLeft:20
// })
const InfoPart=glamorous.div({
  position: 'relative',
  top: 45,
  margin: '20px auto',
  backgroundColor: colors.white,
  borderRadius: 4,
  border: '1px solid',
  borderColor: colors.ind,
  width: '90vw',
  display: 'flex',
  flexDirection:'column',
  justifyContent: 'space-around',
  padding: 20
})
const P=glamorous.div({
  margin:'10px 0',
  height:19,
  color:'grey'
})
const Input=glamorous.input({
  fontSize:12,
  width:165,
  margin:0
})
const PHeader=glamorous.p({
  color:'black',
  display:'inline-block'
})
const ButtonDiv=glamorous.div({
  display:'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  marginTop:'20px'

})
const Button=glamorous.button({
  marginTop:2,
  height: 40,
  width:90.38,
  borderRadius: 4,
  border: '1px solid',
  borderColor: '#E7E7E7',
  },
  ({theme}) => ({
    backgroundColor: theme.sunglow
  })
  )

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
      <ProfileDiv>
      <Header>
        <NavLink to="/home"><button style={{backgroundColor: 'transparent',border: 'none'}} ><img  width='30px' 
        height='30px' src={arrow} alt="back button"/></button></NavLink>
        <HeaderText>Profile</HeaderText>
      </Header>
      <PictureEdit>
       <Avatar size="large"/>
        <FileUpload />
      </PictureEdit>
  
        {!this.state.edit?
        <InfoPart>
          <div>
        <P>First name: <PHeader>{this.state.first_name}</PHeader></P>
        <P>Last name: <PHeader>{this.state.last_name}</PHeader></P>
        <P>Email: <PHeader>{this.state.email}</PHeader></P>
          </div>
          
        <Btn type='secondary' style={{margin:'0 auto'}} onClick={()=>this.setState({edit:true})}>EDIT</Btn>
        </InfoPart>
                      :
        <InfoPart>
          <div>
        <P>First name: <Input value={this.state.first_name} onChange={e=>this.setState({first_name:e.target.value})}/></P>
        <P>Last name: <Input value={this.state.last_name} onChange={e=>this.setState({last_name:e.target.value})}/></P>
        <P>Email: <Input style={{width:'200px'}} value={this.state.email} onChange={e=>this.setState({email:e.target.value})}/></P>
          </div>
          <ButtonDiv>
        <Button onClick={()=>this.saveChanges()}>SAVE</Button>
        <Button style={{color:'white',backgroundColor:'#384E77'}} onClick={()=>this.cancelChanges()}>CANCEL</Button>
          </ButtonDiv>
        </InfoPart>
        }
      
        
        
        {/* <UserTravelHistory /> */}
      </ProfileDiv>
    );
  }
}

function mapStateToProps(state){
  return {user:state.user}
}
export default connect(mapStateToProps,{getUser, getTrips})(Profile) ;
