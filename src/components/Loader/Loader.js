import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


import glamorous from 'glamorous';
import * as glamor from 'glamor';

import { getUser, getTrips, getInvites } from '../../ducks/reducer';

import logosolid from '../../assets/svg/logosolid.svg';
import { mediaQueries } from '../styledComponents';

const LoaderDiv = glamorous.div({
  // height: '100vh',
  // width: '100vw',
  marginTop: 40,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [mediaQueries.iPhone5]: {
    position: 'fixed',
    top: 0,
    left: -90
  },
  [mediaQueries.iPhone678]: {
    // position: 'fixed',
    top: 0,
    left: -170
  },
  [mediaQueries.iPhone678plusLAND]: {
    // position: 'fixed',
    // top: 0,
    left: -170
  },
})

const animations = props => {
  const caravanLogoSpin = glamor.css.keyframes({
    'from': { transform: 'rotate(0deg)'},
    'to': { transform: 'rotate(360deg)'}
    // '0%': { transform: 'scale(1)'},
    // '50%': { transform: 'scale(1.015)'},
    // '100%': { transform: 'scale(1)'}
  })
  return {animation: `${caravanLogoSpin} 120s infinite`}
  // return {animation: `${caravanLogoSpin} 1.5s infinite ease-in-out`}
}

const AnimatedLogo = glamorous.img(
  animations,
  {
    width: 700,
    [mediaQueries.iPhone678]: {
      width: 900
    },
    [mediaQueries.iPhone678plus]: {
      width: 1100
    },
    [mediaQueries.iPhone678plusLAND]: {
      width: 1600
    },
    [mediaQueries.desktop]: {
      width: 1400
    }
  }
);

class TripLoader extends Component {
  componentDidMount() {
    const { getUser, getTrips, getInvites} = this.props;

    getUser().then(res=>{
      getTrips(this.props.user.userid).then( () => {
        getInvites(this.props.user.userid).then( () => {
          setTimeout( () => {
            this.props.history.push("/home")
          }, 1500)
        })
      })
    })
  }

  render() {
    return (
      <LoaderDiv>  
        <AnimatedLogo src={ logosolid } alt="caravan logo" className="caravanLogoSpin"/>
      </LoaderDiv>
    );
  }
}

function mapStateToProps(state){
  return {
    trips:state.trips,
    user:state.user
  }
}

export default connect(mapStateToProps, {getUser, getTrips, getInvites})(withRouter(TripLoader));
