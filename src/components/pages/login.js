import React, { useState } from "react";
import axios from "axios";

export default function Login({}) {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirm] = useState("");
  const [answer, setAnswer] = useState("");

  const handleTabClick = (tab) => { //For switching been tabs/forms
    setActiveTab(tab);
  };
  
  //Updates email variable based on email field input prior to submission
  const handleEmailInput = (event) => { 
    setEmail(event.target.value);
  };

  //Updates password variable based on password field input prior to submission
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirm = (event) => {
    setConfirm(event.target.value);
  };
  const handleAnswer = (event) => {
    setAnswer(event.target.value);
  };

  const submissionHandler = async (event) => {
    console.log(event);
    event.preventDefault(); //Prevents the page from refreshing upon form submission.
    const formURL = event.target.name; //Fetches name of submitted form - used as URL for form post.
    try {
      const response = await axios.post(formURL, {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        answer: answer
      }); 
      //After response (code 200) is received:
      console.log("Response received: ", response);
      if (formURL === "/login") {
        window.location.href = "/events";
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  }

  return (
    <div className="Login">
      <div className="tab">
        <div className="tab-buttons">
          <button className={activeTab === "login" ? "active" : ""} onClick={() => handleTabClick("login")}>Login</button>
          <button className={activeTab === "register" ? "active" : ""} onClick={() => handleTabClick("register")}>Register</button>
          <button className={activeTab === "reset" ? "active" : ""} onClick={() => handleTabClick("reset")}>Reset Password</button>
        </div>
        <div className="tab-content">
          {activeTab === "login" && (
            <div className="login-form">
              <p> Existing User </p>
              <form name="/login" action="/login" onSubmit={submissionHandler}>
                <label htmlFor="email">Email: </label> <br></br>
                <input type="email" id="email" value={email} onChange={handleEmailInput}/><br></br>
                <label htmlFor="password">Password: </label> <br></br>
                <input type="password" id="password" value={password} onChange={handlePassword}/><br></br>
                <button type="submit">Login</button>
              </form>
            </div>
          )}
          {activeTab === "register" && (
            <div className="register-form">
              <p> Create an Account </p>
              <form name="/register" action="/register" onSubmit={submissionHandler}>
                <label htmlFor="email">Email: </label> <br></br>
                <input type="email" id="email" value={email} onChange={handleEmailInput}/><br></br>
                <label htmlFor="password">Password: </label> <br></br>
                <input type="password" id="password" value={password} onChange={handlePassword}/><br></br>
                <label htmlFor="confirm-password">Confirm password: </label> <br></br>
                <input type="password" id="confirm-password" value={confirmPassword} onChange={handleConfirm}/><br></br>
                <label htmlFor="question">Security Question: </label> <br></br>
                <select id="question">
                  <option value="fathers-name">Fathers forename</option>
                  <option value="mothers-name">Mothers forename</option>
                  <option value="sisters-name">Mothers forename</option>
                  <option value="hometown">Where you were born</option>
                  <option value="food">Your favourite food</option>
                </select><br></br>
                <label htmlFor="answer">Answer: </label> <br></br>
                <input type="input" id="answer" value={answer} onChange={handleAnswer}/><br></br>
                <button type="submit">Register</button>
              </form>
            </div>
          )}
          {activeTab === "reset" && (
            <div className="reset-form">
              <p> Reset Password </p>
              <form name="/reset" action="/reset" onSubmit={submissionHandler}>
                <label htmlFor="email">Email: </label> <br></br>
                <input type="email" id="email" value={email} onChange={handleEmailInput}/><br></br>
                <label htmlFor="question">Security Question: </label> <br></br>
                <select id="question">
                  <option value="fathers-name">Fathers forename</option>
                  <option value="mothers-name">Mothers forename</option>
                  <option value="sisters-name">Mothers forename</option>
                  <option value="hometown">Where you were born</option>
                  <option value="food">Your favourite food</option>
                </select><br></br>
                <label htmlFor="answer">Answer: </label> <br></br>
                <input type="dropdown" id="answer" value={answer} onChange={handleAnswer}/><br></br>
                <label htmlFor="password">New Password: </label> <br></br>
                <input type="password" id="password" value={password} onChange={handlePassword}/><br></br>
                <label htmlFor="confirm-password">Confirm password: </label> <br></br>
                <input type="password" id="confirm-password" value={confirmPassword} onChange={handleConfirm}/><br></br>
                <button type="submit">Submit</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}