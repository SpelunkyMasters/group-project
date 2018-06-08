import React, { Component } from 'react';
import glamorous, { H5, Div } from 'glamorous'

const DeleteButton = glamorous.button({
    background: 'none',
    border: 'none'
})

class MinorStop extends Component {
    constructor() {
        super();
            this.state = {
                clicked: false
        }
    }

    handleNameClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    render() {
        const { minorStop } = this.props
        
        return (
        <Div display="flex" flexDirection="row"  justifyContent="space-between">
            <H5 fontSize='17px' marginLeft="25px" onClick={this.handleNameClick}>{minorStop.sub_dest_name}</H5>
            {
                this.state.clicked ? 
                <DeleteButton onClick={() => this.props.deleteSubDest(minorStop.sub_destid)}>X</DeleteButton> :
                null
            }
        </Div>
        );
    }
}

export default MinorStop;
