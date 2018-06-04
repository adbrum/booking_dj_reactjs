import React from 'react'
import { connect } from 'react-redux'

export const DisplayLogin = ({ login }) => {
  return <p>O utilizador está {login.toString()}</p>
}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}

export default connect(mapStateToProps)(DisplayLogin)