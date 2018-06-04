import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

export default class Login extends Component {
    constructor(props){
      super(props);   
      this.state = {
        email: '',
        password: ''
      }   
      this.logout = this.logout.bind(this);
    }

    logout(){
      axios.post('/auth/logout')
      .then(res => res.data)
      .then(user => {
        console.log('you successfully logged out')
      })
    }

    render(){
      return (
        <div>
          <form> 
            <label>Email: </label> 
            <input />
            <label>Password: </label> 
            <input />
            <button type="submit"> Submit </button>
          </form>
          <a href="/auth/google"><input type="image" src="https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png" /></a>
          <button type="button" onClick={this.logout}>Log out</button>
        </div>

      )
    }
}


// const mapStateToProps = function (state) {
//   return {
//     currentChannel: state.currentChannel
//   };
// };

// const mapDispatchToProps = function (dispatch) {
//   return {
//     handleChange: function(){
//       //you can pass in an argument if necessary
//       //dispatch action creator with payload
//     }
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Navbar);