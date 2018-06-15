import React, { Component } from 'react';
import {connect} from 'react-redux';
import AddRemove from './AddRemove/AddRemove';
import axios from 'axios';
import glamorous from 'glamorous';
import {getUser, getAllUsers, getTrips} from '../../../ducks/reducer';
import cross from '../../../assets/img/cross.png';
import * as tripFns from '../../../utils/trips';

import logo2 from '../../../assets/svg/logo2.svg';

const TripMembersBox=glamorous.div({
  height:'calc(100vh - 70px)',
  backgroundImage: `url(${logo2})`,
  backgroundPosition: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '700px',
  padding:10,
  borderRadius:5,
  width:'106.5%',
  marginLeft: '-10px'
})
const Members=glamorous.div({
  marginTop: 20,
  height: 200,
  // backgroundColor: 'magenta',
  overflowY:'scroll'
})

const SearchMemberDiv = glamorous.div({
  position: 'relative',
  display:'flex', 
  lexDirection:'column',
  justifyContent:'center',
  alignItems:'center'
})
const Invited=glamorous.div({
  // backgroundColor: 'maroon',
  height: 200,
  overflowY:'scroll'
})


const H2=glamorous.h2({
  textAlign: 'center',
  paddingBottom:'10px',
  letterSpacing: '5px'
})
const Img=glamorous.img({
  borderRadius:'50%',
  height:30
})
const EachMember=glamorous.div({
  padding:'5px',
  border:'2px black solid',
  borderRadius:'5px',
  marginBottom:'5px',
  backgroundColor:'white'
})
const FirstLine=glamorous.div({
  display:'flex',
  flexDirection:'row',
  justifyContent:'flex-start',
  alignItems:'center'
})
const SecondLine=glamorous.div({
  display:'flex',
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center'
})
const DeleteButton=glamorous.div({
  backgroundColor:'transparent',
   border:'none',
    height:'12px'
})
const FullName=glamorous.div({
  marginLeft:20
})
const InputField = glamorous.input({
  fontSize: '13px',
  width: '65vw',
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


class TripMembers extends Component {
  constructor(){
    super();
    this.state={
      filter:'',
      users:[],
      invited:[],
      propsUsers:[],
      userid:null
    }
    this.deleteFromTrip=this.deleteFromTrip.bind(this)
    this.newInvite=this.newInvite.bind(this)
    this.deleteFromInvited=this.deleteFromInvited.bind(this)
  }
  componentDidMount(){

    if(!this.props.user.userid){
            this.props.getAllUsers(this.props.match.params.id).then(res=>{
        this.props.getUser();
        this.props.getTrips(this.props.user.userid).then(()=>{
          const { id } = this.props.match.params
          , { trips } = this.props;
  
      const currentTrip = tripFns.getCurrentTrip(trips, +id)
          , { userid } = currentTrip || 'Trip Name';
                  //mapping thru users that are in this trip
       var users=this.props.users.map((e, i)=>{
      return (<EachMember key={i}>
                <FirstLine>
                  <Img src={e.picture} alt="profile"/> 
                  <FullName>{e.first_name} {e.last_name}</FullName>
                </FirstLine>
                <SecondLine>
                  <div>{e.email}</div>
                  {userid===this.props.user.userid?
                  <DeleteButton onClick={()=>this.deleteFromTrip(i, e.userid)}>
                  <img src={cross} alt="delete" height='12px'/>
                  </DeleteButton>:
                  <div></div>
                  }
                  
                </SecondLine>
              </EachMember>)
    }) 
    this.setState({users, propsUsers: this.props.users,userid })
      }) 
         //getting all the invited users, mapping thru them and saving them in state
    axios.get(`/api/tripusers/${this.props.match.params.id}`).then(res=>{
      var invited=res.data.map((e, i)=>{
        return (<EachMember key={i}>
                  <FirstLine>
                    <Img src={e.picture} alt="profile" /> 
                    <FullName> {e.first_name} {e.last_name}</FullName>
                  </FirstLine>
                  <SecondLine>
                    <div>{e.email}</div>
                    {this.state.userid === this.props.user.userid?
                    <DeleteButton onClick={()=>this.deleteFromInvited(i, e.userid)}>
                    <img src={cross} alt="delete" height='12px'/>
                    </DeleteButton>:
                    <div></div>
                    }
                  </SecondLine>
                </EachMember>)
      })
      this.setState({invited, invitedList:res.data}) 
    })
        }) 
   
    }
    else{
      //getting trip organizer id
      const { id } = this.props.match.params
      , { trips } = this.props;

  const currentTrip = tripFns.getCurrentTrip(trips, +id)
      , { userid } = currentTrip || 'Trip Name';

      var users=this.props.users.map((e, i)=>{
        return (<EachMember key={i}>
                  <FirstLine>
                    <Img src={e.picture} alt="profile"/> 
                    <FullName>{e.first_name} {e.last_name}</FullName>
                  </FirstLine>
                  <SecondLine>
                    <div>{e.email}</div>
                    {userid === this.props.user.userid&&e.userid!==userid?
                    <DeleteButton onClick={()=>this.deleteFromTrip(i, e.userid)}>
                    <img src={cross} alt="delete" height='12px'/>
                    </DeleteButton>:
                    <div></div>
                    }
                    
                  </SecondLine>
                </EachMember>)
      }) 
      this.setState({users,propsUsers:this.props.users, userid})
         
           //getting all the invited users, mapping thru them and saving them in state
      axios.get(`/api/tripusers/${this.props.match.params.id}`).then(res=>{
        var invited=res.data.map((e, i)=>{
          return (<EachMember key={i}>
                    <FirstLine>
                      <Img src={e.picture} alt="profile" /> 
                      <FullName> {e.first_name} {e.last_name}</FullName>
                    </FirstLine>
                    <SecondLine>
                      <div>{e.email}</div>
                      {userid === this.props.user.userid?
                      <DeleteButton onClick={()=>this.deleteFromInvited(i, e.userid)}>
                      <img src={cross} alt="delete" height='12px'/>
                      </DeleteButton>:
                      <div></div>
                      }
                    </SecondLine>
                  </EachMember>)
        })
        this.setState({invited, invitedList:res.data}) 
      })
    }

    


  }
  deleteFromInvited(i,userid){
        //deleting user from invites table
    axios.delete(`/api/invite/${userid}/${this.props.match.params.id}`).then(res=>{
      //removing this user from the list
      var invitedList=this.state.invitedList.filter(e=>e.userid!==userid);
      var invited=invitedList.map((e, i)=>{
        return (<EachMember key={i}>
                  <FirstLine>
                    <Img src={e.picture} alt="profile" /> 
                    <FullName> {e.first_name} {e.last_name}</FullName>
                  </FirstLine>
                  <SecondLine>
                    <div>{e.email}</div>
                    {this.state.userid === this.props.user.userid?
                    <DeleteButton onClick={()=>this.deleteFromInvited(i, e.userid)}>
                    <img src={cross} alt="delete" height='12px'/>
                    </DeleteButton>:
                    <div></div>
                    }
                  </SecondLine>
                </EachMember>)
      })
      
      this.setState({invited, invitedList})
    })
  }
  newInvite(e){
var i=this.state.invited.length;
var invited=<EachMember key={i}>
              <FirstLine>
                <Img src={e.picture} alt="profile" />
                 <FullName>{e.first_name} {e.last_name}</FullName>
              </FirstLine>
              <SecondLine>
                <div>{e.email}</div>
                {this.state.userid === this.props.user.userid?
                <DeleteButton onClick={()=>this.deleteFromInvited(i, e.userid)}>
                <img src={cross} alt="delete" height='12px'/>
                </DeleteButton>:
                <div></div>
                }
              </SecondLine>
            </EachMember>
this.setState({invited:[...this.state.invited, invited], invitedList:[...this.state.invitedList, e]})
  }
deleteFromTrip(i, userid){
    //deleting user from database
    axios.delete(`/api/trip/${userid}/${this.props.match.params.id}`).then(res=>{
      //removing this user from the list
      var propsUsers=this.state.propsUsers.filter(e=>e.userid!==userid)
      var users=propsUsers.map((e, i)=>{
        return (<EachMember key={i}>
                  <FirstLine>
                    <Img src={e.picture} alt="profile"/> 
                    <FullName>{e.first_name} {e.last_name}</FullName>
                  </FirstLine>
                  <SecondLine>
                    <div>{e.email}</div>
                    {this.state.userid === this.props.user.userid?
                    <DeleteButton onClick={()=>this.deleteFromTrip(i, e.userid)}>
                    <img src={cross} alt="delete" height='12px'/>
                    </DeleteButton>:
                    <div></div>
                    }
                  </SecondLine>
                </EachMember>)
      }) 
      this.setState({users, propsUsers})
    })
  }
  render() {

    return (
      <TripMembersBox>
        <Invited>
        <H2>Invited</H2>
          
          {this.state.invited}
        </Invited>
        {this.state.userid === this.props.user.userid
        ///////////////////////////////////////////////////////
          ? <SearchMemberDiv>
              <InputField placeholder="Add to your Caravan..."value={this.state.filter} onChange={e=>this.setState({filter:e.target.value})} type='text'/>
              {/* showing AddRemove component if input field is not empty */}

              {
                this.state.filter.length>0?
                <AddRemove newInvite={this.newInvite} filter={this.state.filter} tripid={this.props.match.params.id}/>:
                <p></p>
              }
            </SearchMemberDiv>
          : <div></div>
        }
        <Members>
        <H2>Members </H2>
          
          {this.state.users}
        </Members>
        
          
      </TripMembersBox>
    );
  }
}

function mapStateToProps(state){
  return {users:state.users,
  user:state.user,
  trips:state.trips}
}
export default connect(mapStateToProps,{getUser, getAllUsers,getTrips})(TripMembers) ;
