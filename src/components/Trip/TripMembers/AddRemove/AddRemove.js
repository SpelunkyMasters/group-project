import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import glamorous from 'glamorous';
import plus from '../../../../assets/img/plus.png';


const EachMember=glamorous.div({
    padding:'5px',
    border:'2px black solid',
    borderRadius:'5px',
    marginBottom:'5px',
    width:'280px',
    backgroundColor:'white'
  })
  const FirstLine=glamorous.div({
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
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

  const Img=glamorous.img({
    borderRadius:'50%',
    height:30
  })
  const SearchList=glamorous.div({
    height:'90px',
    overflow:'auto',
    padding:' 5px 0'
  })
class AddRemove extends Component {
    constructor() {
        super();
        this.state = {
            user_list: [],
            showList:[],
            filteredList:[]
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
              return <EachMember key={i}>
                        <FirstLine>
                        <Img src={e.picture} alt="profile" />
                        <div>{e.first_name} {e.last_name} </div>
                        <DeleteButton onClick={()=>this.sendInvite(i, e.userid)}>
                        <img src={plus} alt="add" height='12px'/>
                        </DeleteButton> 
                        </FirstLine>
                        
                     </EachMember>
          })
          this.setState({
            user_list: res.data,
            showList,
            filteredList
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
                return <EachMember key={i}>
                            <FirstLine>
                                <Img src={e.picture} alt="profile" />
                                <div>{e.first_name} {e.last_name} </div>
                                <DeleteButton onClick={()=>this.sendInvite(i, e.userid)}>
                                    <img src={plus} alt="add" height='12px'/>
                                </DeleteButton> 
                            </FirstLine>
                
                        </EachMember>
            })
            this.setState({showList, filteredList})  }
}
sendInvite(i, userid){
    //sending invite and removing that person from the list
    axios.post('/api/invite',{userid, tripid:this.props.tripid}).then(res=>{
        var filteredList=this.state.filteredList.filter(e=>e.userid!==userid);
        var showList=filteredList.map((e,i)=>{
            return <EachMember key={i}>
                      <FirstLine>
                      <Img src={e.picture} alt="profile" />
                      <div>{e.first_name} {e.last_name} </div>
                      <DeleteButton onClick={()=>this.sendInvite(i, e.userid)}>
                      <img src={plus} alt="add" height='12px'/>
                      </DeleteButton> 
                      </FirstLine>
                      
                   </EachMember>
        })
        var invite=this.state.user_list.filter(e=>e.userid===userid)[0]
        this.props.newInvite(invite)
       
        console.log("showList",showList)
        this.setState({showList, filteredList})
    })
}
  render() {


    return (
      <SearchList>
          {this.state.showList}
      </SearchList>
    );
  }
}

function mapStateToProps(state){
    return {users:state.users}
}

export default connect(mapStateToProps)(AddRemove) ;
