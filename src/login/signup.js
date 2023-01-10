import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {BASELINE} from "../util/index"

import '../App.css';

function Signup() {
  const [fname, setfname] = useState('')
  const [lname, setlname] = useState('')
  const [role, setrole] = useState('')
  const [pnum, setpnum] = useState('')
  const [address, setaddress] = useState('')
  const [zip, setzip] = useState('')
  const [email, setemail] = useState('')
  const [pswd, setpswd] = useState('')
  const [cpswd, setcpswd] = useState('')
  const { user_gmail } = useParams(); //gmail_id


  useEffect(() => {
    if(user_gmail) {
      setemail(user_gmail);
      document.getElementById("email").value = user_gmail;
      document.getElementById("email").readOnly = true;

    }
  }, []);

  async function onCreate() {
    let error = false

    if (fname != "" && lname != "" && role != "" && pnum.length != 10 && address != "" && zip != "") {
      if (pswd.length > 5) {
        if (pswd == cpswd) {
          var data = {
            fname: fname,
            lname: lname,
            role: role,
            pnum: pnum,
            address: address,
            zip: zip,
            email: email,
            pswd: pswd
          }
          axios.post(BASELINE+'user/add/info', data)
            .then(function (response) {
              alert(response.data.success);
              window.location.replace("https://mockwebsite.min.farm");
            })
            .catch(function (error) {
              alert(error);
            });
        } else {
          alert("Password is not match!");
        }
      } else {
        alert("Password is short!");
      }
    }
  }



  return (
    <div className="Signup bg-gray-100 flex items-center p-8">

      <div className="max-w-2xl mx-auto bg-white p-16 rounded-xl">

        <div className="grid gap-6 mb-6 lg:grid-cols-2">
          <div>
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First name</label>
            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Sean" onInput={e => setfname(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last name</label>
            <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Kim" onInput={e => setlname(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Role</label>
            <div>
              <select
                id="countries" onChange={e => setrole(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-5000"
              >
                <option defaultValue>Choose a Role</option>
                <option value="P">Parents</option>
                <option value="ST">Student</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone number</label>
            <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" onInput={e => setpnum(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Address</label>
            <input type="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="15160 NW Laidlaw Rd Suite 116, Portland, OR" onInput={e => setaddress(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Zip</label>
            <input type="number" id="visitors" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="97229" onInput={e => setzip(e.target.value)} required />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
          <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="seank@mmtprep.com" onInput={e => setemail(e.target.value)} required />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
          <input type="password" id="password" minLength="5" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" onInput={e => setpswd(e.target.value)} required />
        </div>
        <div className="mb-6">
          <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Confirm password</label>
          <input type="password" id="confirm_password" minLength="5" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" onInput={e => setcpswd(e.target.value)} required />
        </div>
        <div className="flex items-start mb-6">
          <Link to="/Login" className="text-blue-600 hover:underline dark:text-blue-500"> Go back to Signin </Link>
        </div>
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={onCreate}
        >Submit</button>

        <p className="mt-5">These input field components is part of a larger, open-source library of Tailwind CSS components. Learn
          more by going to the official <a className="text-blue-600 hover:underline"
            href="https://flowbite.com/docs/getting-started/introduction/" target="_blank">Flowbite
            Documentation</a>.
        </p>
      </div>

    </div>
  );
}

export default Signup;
