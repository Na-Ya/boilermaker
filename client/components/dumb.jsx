import React from 'react';
import { connect } from 'react-redux';

function Navbar (props) {

  const { currentChannel } = props;

  return (
    <nav>
      <h3># { currentChannel }</h3>
      <h2>NAME OF CHANNEL</h2>
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
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);