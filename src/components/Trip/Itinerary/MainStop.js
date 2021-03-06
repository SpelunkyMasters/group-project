import React, { Component } from 'react';
import axios from 'axios'
import MinorStop from './MinorStop'
import Search from './Search'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getItinerary } from '../../../ducks/reducer'
import glamorous, {Div} from 'glamorous';
import itineraryadd from '../../../assets/svg/itineraryadd.svg';
import { mediaQueries } from '../../styledComponents';


const MainDiv = glamorous.div({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    [mediaQueries.desktop]: {
        padding: '10px 0 10px 30px'
    }
})

const DeleteButton = glamorous.button({
    background: 'none',
    border: 'none',
    fontSize: '17px'
})

const AddImg = glamorous.img({
    width: 15,
    [mediaQueries.desktop]: {
        width: 26
    }
});

const AddButton = glamorous.button({
    background: 'none',
    border: 'none',
    fontSize: '25px',
    color: '#FFD23E',
})

const MainName = glamorous.h3({
    fontSize: '22px',
    fontWeight: "600",
    paddingBottom: '10px',
    [mediaQueries.desktop]: {
        fontSize: 36
    }
})

class MainStop extends Component {
    constructor() {
        super();
            this.state = {
                clicked: false,
                addClick: false
        }
    }

    componentDidUpdate(prevProps) {
        if(this.state.clicked) {
            if(this.props.destType !== '' && this.props.destid !== '') {
                if(this.props.destType !== 'Main') {
                    this.setState({clicked: false})
                } else {
                    if(this.props.destid !== this.props.mainStop.destid){
                    this.setState({clicked: false})
                    }
                }
            }
        }
        if(this.state.addClick) {
            if(this.props.searchid !== '') {
                if(this.props.searchid !== this.props.mainStop.destid) {
                    this.setState({ addClick: false})
                }
            }
        }

      }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
        this.props.handleDestType('Main', this.props.mainStop.destid)
    }

    handleAddClick = () => {
        this.setState({ addClick: !this.state.addClick })
        this.props.handleSearchId(this.props.mainStop.destid)
    }

    addToItinerary = (currentMarker) => {
        axios.post(`/api/itinerary/${this.props.match.params.id}?destType=Minor_Stop&destid=${this.props.mainStop.destid}`, currentMarker)
        .then( (results) => {
          this.props.getItinerary(this.props.match.params.id)
          this.handleAddClick();
        })
      }
    
    deleteDest = () => {
        axios.delete(`/api/itinerary/dest/${this.props.mainStop.destid}`).then(() => {
        this.props.getItinerary(this.props.match.params.id)
        })
    }

    deleteSubDest = (sub_destid) => {
        axios.delete(`/api/itinerary/sub/${sub_destid}`).then( () => {
            this.props.getItinerary(this.props.match.params.id)
        })
    }

    render() {
        const { mainStop } = this.props
        let mainNames = (this.props.index + 1) * 31
        let subNames = this.props.prevSubCount * 28
        let position = 188 + mainNames + subNames

        let subDests = mainStop.sub_dests.map( stop => {
            return (
                <MinorStop
                key={stop.sub_destid}
                minorStop={stop}
                deleteSubDest={this.deleteSubDest}
                handleDestType={this.props.handleDestType}
                destType={this.props.destType}
                destid={this.props.destid} />
            )
        })
        return (
        <div>
            <MainDiv>
                <Div display='flex'>
                    <MainName  onClick={this.handleClick}>{mainStop.dest_name}</MainName>
                        <AddButton onClick={this.handleAddClick}><AddImg src={itineraryadd} alt="add button"/></AddButton>
                </Div>
                {
                    this.state.clicked ?
                    <DeleteButton onClick={this.deleteDest}>X</DeleteButton> :
                    null
                }
                </MainDiv>
            {
                this.state.addClick ?
                <Search
                position={position}
                callback={this.addToItinerary} /> :
                null
            }
            {subDests}
        </div>
        );
    }
}

export default withRouter(connect(null, { getItinerary })(MainStop));
