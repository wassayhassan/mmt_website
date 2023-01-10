import React, { useState, useEffect, useContext } from 'react';
import { useHistory, Link } from "react-router-dom";
import { GoogleLogin } from 'react-google-login'
import { gapi } from 'gapi-script'
import axios from "axios";
import { BASELINE, AFTER_LOGIN } from "../util/index"
import { UserContext } from '../context/UserContext';

import '../App.css';
const initialsignset = {
  userid: '', password: ''
}

function Login() {
  const clientId = "208805948909-71msnhkgi8b0drrbbi7pldbiepmdv194.apps.googleusercontent.com";
  const {user, savelogin} = useContext(UserContext);
  const [formState, updateformState] = useState(initialsignset);
  const [phoneNumber, setphoneNumber] = useState("");
  const [login_status, setlogin_status] = useState("");
  const history = useHistory();

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: clientId })
    })
  }, [])

  const responseGoogle = (res) => {
    console.log(res.profileObj.email);
    let data = {
      'email': res.profileObj.email
    }
    axios.post(BASELINE + 'google/get/info', data)
      .then(function (response) {
        if (response.data.message) {
          alert(response.data.message);
          savelogin(response.data);
          // window.location.replace(AFTER_LOGIN);
        } else {
          alert(response.data.register);
          history.push("/signup/" + response.data.gmail);
        }
      })
      .catch(function (error) {
        alert(error);
      });
  }

  const responseError = (err) => {
    console.log(err);
  }

  function onChange(e) {
    e.persist()
    updateformState(() => ({ ...formState, [e.target.name]: e.target.value }))
  }

  function printeverything() {
    if (formState.userid != "" && formState.password != "") {
      var data = {
        uid: formState.userid,
        password: formState.password,
      }

      axios.post(BASELINE + 'user/login', data)
        .then(function (response) {
          alert(response.data.message);
          if (response.data.login == "True") {
            savelogin(response.data);
            window.location.replace(AFTER_LOGIN);
          }
        })
        .catch(function (error) {
          alert(error);
        });
    }
  }

  return (
    <div className="Login">

      <div className="min-h-screen bg-gray-100 flex items-center">
        <div className="container mx-auto max-w-md shadow-md hover:shadow-lg transition duration-300">
          <div className="py-8 p-8 bg-white rounded-xl">
            <div className="mb-6">
              <label className="mr-4 text-gray-700 font-bold inline-block mb-2" htmlFor="name">Email</label>
              <input name="userid" type="text" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="Email" onChange={onChange} />
            </div>
            <div className="mb-6">
              <label className="mr-4 text-gray-700 font-bold inline-block mb-2" htmlFor="name">Password</label>
              <input name="password" type="password" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="Password" onChange={onChange} />
            </div>
            <Link to="/signup" className="text-sm text-gray-700 inline-block mt-4 hover:text-indigo-600 hover:underline hover:cursor-pointer transition duration-200">Sign up</Link>
            <button
              className="w-full mt-6 text-indigo-50 font-bold bg-indigo-600 py-3 rounded-md hover:bg-indigo-500 transition duration-300 mb-4"
              onClick={printeverything}
            >LOGIN</button>

            <button
              className="w-full text-indigo-50 font-bold bg-indigo-600 py-3 rounded-md hover:bg-indigo-500 transition duration-300 mb-4"
              onClick={printeverything}
            >One-time Login</button>
            <GoogleLogin
              className='w-full text-center'
              clientId="208805948909-71msnhkgi8b0drrbbi7pldbiepmdv194.apps.googleusercontent.com"
              buttonText="Sign in & Authorize MMTprep"
              onSuccess={responseGoogle}
              onFailure={responseError}
              cookiePolicy={'single_host_origin'}
              scope='openid email profile https://googleapis.com/auth/calendar'
            />

          </div>
        </div>
      </div>

    </div>
  );
}

export default Login;
