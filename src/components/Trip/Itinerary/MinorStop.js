import React, { Component } from 'react';

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
        <div>
            <h5 onClick={this.handleNameClick}>{minorStop.sub_dest_name}</h5>
            {
                this.state.clicked ? 
                <button onClick={() => this.props.deleteSubDest(minorStop.sub_destid)}>Delete</button> :
                null
            }
        </div>
        );
    }
}

export default MinorStop;
