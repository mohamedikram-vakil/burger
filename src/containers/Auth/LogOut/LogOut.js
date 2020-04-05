import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from "../../../store/actions/index"
import { Redirect } from 'react-router-dom'
class LogOut extends Component{
    componentDidMount(){
        this.props.logOut()
    }
    render(){
        return<Redirect to="/"/>
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        logOut:()=>dispatch(actions.authLogout())
    }
}

export default connect(null,mapDispatchToProps)(LogOut);