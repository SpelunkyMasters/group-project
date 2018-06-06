import React, { Component } from 'react';
import glamorous from 'glamorous';
import { withRouter } from 'react-router-dom';

import { IconButton } from '../../styledComponents';

import edit from '../../../assets/img/edit.png';


const EditPosition = glamorous.div({
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 5
})

class EditBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEdit: true
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     if(nextProps.location.path === `/trip/${this.props.tripId}/nav`) {
    //         this.setState({
    //             showEdit: true
    //         })
    //     } else {
    //         this.setState({
    //             showEdit: false
    //         })
    //     }

    // }
    render() {
        const { tripId } = this.props;
    
        return(
            <EditPosition>
                {
                    this.state.showEdit
                        ? <IconButton type="secondary" onClick={ () => this.setState({edit: true})}><img src={edit} alt="edit details" width="15px"/></IconButton>
                        : null
                }
            </EditPosition>
        )
    }
}

export default withRouter(EditBar);