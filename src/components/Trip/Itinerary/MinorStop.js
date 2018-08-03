import React, { Component } from 'react';
import glamorous from 'glamorous'
import { mediaQueries } from '../../styledComponents';

const DeleteButton = glamorous.button({
    background: 'none',
    border: 'none',
    fontSize: '13px',
    marginBottom: '10px',
    [mediaQueries.desktop]: {
        fontSize: 22,
        position: 'relative',
        right: 1150
    } 
})

const MinorDiv = glamorous.div({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alighItems: 'center',
    [mediaQueries.desktop]: {
        paddingLeft: 40
    }
})

const MinorStopP = glamorous.p({
    fontSize: 17,
    marginLeft: 25,
    marginBottom: 10,
    [mediaQueries.desktop]: {
        fontSize: 28
    }
});

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
            <MinorStopP
             onClick={this.handleNameClick}>{minorStop.sub_dest_name}</MinorStopP>
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
