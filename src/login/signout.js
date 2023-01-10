import React, { Component } from 'react';
import { Navigate  } from "react-router-dom";
import axios from "axios";
import {BASELINE} from "../util/index";

import './css/App.css';

class Signout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: props
    };
  }

  async componentDidMount() {
    var self = this
    axios.post(BASELINE+'api/logout', {})
    .then(function(response){
      alert(response.data.message);
      window.location.replace("http://127.0.0.1:3000");
    })
    .catch(function(error){
      alert(error);
    });
  }

  render() {
  return (
    <div>

  </div>
  
  );
  }
}

export default Signout;
