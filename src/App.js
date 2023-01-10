import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import Nav from "./NavBar";
import Home from "./main_components/Home";
import Instructors from "./Instructors";
import ContactInformation from "./ContactInformation";
import ClassContents from "./ClassContents";
import Testmonial from "./Testmonial";
import PaymentReport from "./dashboard/manager_dashboard/invoice/PaymentReport";
import Login from "./login/loginNsignup";
import Signup from "./login/signup";

import BlogContents from "./Blog/BlogPage";
import Post from "./Blog/post";
import Classroom from "./classroom/Classroom";
import M_Dashboard from "./dashboard/manager_dashboard/m_dashboard"
import T_Dashboard from "./dashboard/teacher_dashboard/t_dashboard"
import Check from './classroom/check';
import DashboardMainTop from "./dashboard/user_dashboard";
import GroupChat from "./group_chat/group_chat";

import "./App.css";


function App() {
  document.title = "MMT Prep";

  return (
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/Login" component={Login} />
        <Route path="/signup/:user_gmail" component={Signup} />
        <Route path="/signup" component={Signup} />
        <Route path="/Instructors" component={Instructors} />
        <Route path="/BlogContents" component={BlogContents} />
        <Route path="/ContactInformation" component={ContactInformation} />
        <Route path="/ClassContents" component={ClassContents} />
        <Route path="/Testmonial" component={Testmonial} />
        <Route path="/PaymentReport" component={PaymentReport} />
        <Route path="/post/:id" component={Post} />

        <Route path="/dashboard">
          <Route path="/dashboard/manager" component={M_Dashboard} />
          <Route path="/dashboard/teacher" component={T_Dashboard} />
          <Route path="/dashboard/user" component={DashboardMainTop} />
        </Route>

        <Route path="/join/class/:id" component={Classroom} />
        <Route path='/drawing/:socketId' component={Check}/>

        <Route path="/groupchat" component={GroupChat} />

      </Switch>
    </div>
  );
}

export default App;
