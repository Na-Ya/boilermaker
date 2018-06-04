import React from 'react';
import { connect } from 'react-redux';
import Login from './Login';

function Navbar (props) {

  const { currentChannel } = props;

  return (
    <nav>
      <h3># { currentChannel }</h3>
      <h2>NAME OF CHANNEL</h2>
      <Login />
    </nav>
  );
}

const mapStateToProps = function (state) {
  return {
    currentChannel: state.currentChannel
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    handleChange: function(){
      //you can pass in an argument if necessary
      //dispatch action creator with payload
      dispatch(console.log('nothing'))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
