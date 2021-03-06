import React, { Component } from 'react';
import glamorous from 'glamorous';
import { mediaQueries } from '../../../styledComponents';

const MessageStyle = {
    me: {
        display:'flex',
        flexFlow:'column',
        alignItems:'flex-end',
        
    },
    notMe: {
        display:'flex',
        flexFlow:'column',
        alignItems:'flex-start'
    }
}
const MessageTextStyle = {
    me: {
        backgroundColor: '#384E77',
    },
    notMe: {
        backgroundColor: '#3e7350',
    }
}
const MessageBox=glamorous.div({
    // margin:'10px'
},
({check}) => MessageStyle[check]
)
const MessageText=glamorous.div({
    padding: 10,
    borderRadius: 5,
    maxWidth:'80%',
    marginTop: 5,
    marginBottom: 5,
    wordWrap:'break-word',
    color:'white',
    [mediaQueries.desktop]: {
        fontSize: 25
    }
},
({check}) => MessageTextStyle[check]
)


export default class Message extends Component {
    constructor(){
        super();
        this.state={
            clicked:false
        }
    }
  render() {
      const {e}= this.props
    return (
            <MessageBox check={e.userid===this.props.userid?"me":"notMe"}> 
                    <div>
                        {e.first_name+' '} 
                        {e.last_name[0]+'.'} 
                    </div>
                <MessageText check={e.userid===this.props.userid?"me":"notMe"} >
                    
                    <div onClick={()=>this.setState({clicked:!this.state.clicked})}>
                        {e.message_text} 
                    </div> 
                </MessageText >
                <span>
                    {  
                        e.userid===this.props.userid&&this.state.clicked? 
                        <button onClick={()=>this.props.deleteMessage(e.messageid)}>delete </button>:
                        null
                    }
                </span>
            </MessageBox>
  
    );
  }
}

