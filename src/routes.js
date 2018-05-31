import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Loader from './components/Loader/Loader';
import Trip from './components/Trip/Trip';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';

export default(
    <Switch>
        <Route exact path='/' component={Login}/>
        <Route path='/home' component={Home}/>
        <Route path='/trip/:id' component={Trip}/>
        <Route path='/loader' component={Loader}/>
        <Route path='/profile' component={Profile}/>
    </Switch>
)