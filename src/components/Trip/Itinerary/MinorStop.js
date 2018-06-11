import React, { Component } from 'react';
import glamorous, { P, Div } from 'glamorous'

const DeleteButton = glamorous.button({
    background: 'none',
    border: 'none',
    fontSize: '13px',
    marginBottom: '10px'
})

const MinorDiv = glamorous.div({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alighItems: 'center'
})

class MinorStop extends Component {
    constructor() {
        super();
            this.state = {
                clicked: false,
        }
    }

    componentDidUpdate(prevProps) {
        if(this.state.clicked) {
            if(this.props.destType !== '' && this.props.destid !== '') {
                if(this.props.destType !== 'Minor') {
                    this.setState({clicked: false})
                } else {
                    if(this.props.destid !== this.props.minorStop.sub_destid){
                    this.setState({clicked: false})
                    }
                }
            }
        }
      }

    handleNameClick = () => {
        this.setState({ clicked: !this.state.clicked })
        this.props.handleDestType('Minor', this.props.minorStop.sub_destid)
    }

    render() {
        const { minorStop } = this.props
        return (
        <MinorDiv>
            <P fontSize='17px' marginLeft="25px" marginBottom="10px"
            // margin="10px 25px"
             onClick={this.handleNameClick}>{minorStop.sub_dest_name}</P>
            {
                this.state.clicked ? 
                <DeleteButton onClick={() => this.props.deleteSubDest(minorStop.sub_destid)}>X</DeleteButton> :
                null
            }
        </MinorDiv>
        );
    }
}

export default MinorStop;
