import React, { Component } from 'react';
import axios from 'axios';
import glamorous from 'glamorous';

const Input=glamorous.input({
    display:'none'
})
const Label=glamorous.label({
    fontSize:12,
    padding:'  10.5px 20.1px ',
    borderRadius: 4,
    border: '1px solid',
    borderColor: '#E7E7E7',
    backgroundColor:'#384E77',
    color:'white'
})
const WholeFile=glamorous.div({
    display:'flex',
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'center',
    height:'100%',
    width:'100%'
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

function sendToback(photo){
    console.log(photo)
    return axios.post('/api/photoUpload', photo)
}

export default class FileUpload extends Component {
    constructor(){
        super()

        this.state={
            file: '',
            filename: '',
            filetype: ''
        }
        this.handlePhoto=this.handlePhoto.bind(this)
        this.sendPhoto=this.sendPhoto.bind(this)
    }

    handlePhoto(event){
        const reader = new FileReader()
            , file = event.target.files[0]
            // , _this = this
        
        reader.onload = photo => {
            this.setState({
                file: photo.target.result,
                filename: file.name,
                filetype: file.type
            })
        }
        reader.readAsDataURL(file)

    }

    sendPhoto(event){
        event.preventDefault()

        sendToback(this.state).then(response => {
            console.log(response.data)
            window.location.reload()
        })
    }

    render(){
        this.state.file && console.log(this.state.photo)
        return (
            <WholeFile>
            <div>
            <Label>
                <Input type="file" onChange={this.handlePhoto}/>
                CHOOSE
                </Label>
            </div>
            <div>

                <Button style={{marginTop:'20px'}} type='secondary' onClick={this.sendPhoto}>UPDATE</Button>
            </div>  
            </WholeFile>
        )
    }
}