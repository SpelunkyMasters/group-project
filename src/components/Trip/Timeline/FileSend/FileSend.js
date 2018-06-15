import React, { Component } from 'react';
import axios from 'axios';
import glamorous from 'glamorous';

const Input=glamorous.input({
    display:'none'
})
const Label=glamorous.label({
    fontSize:12,
    padding:'  6px 5.3px ',
    borderRadius: 4,
    border: '1px solid',
    borderColor: '#E7E7E7',
    backgroundColor:'#384E77',
    color:'white'
})



function sendToback(photo){
    // console.log(photo)
    return axios.post('/api/photoSend', photo)
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
            sendToback(this.state).then(response => {
                this.props.getUrl(response.data.Location)
            })
        }
        // console.log("FILE IS", file)
        if(file) {reader.readAsDataURL(file)

        }
        
    }


    render(){
        // this.state.file && console.log(this.state.photo)
        return (
            <div>
                <Label>
                <Input type="file" onChange={this.handlePhoto}/>
                CHOOSE
                </Label>
           
      
            </div>
        )
    }
}