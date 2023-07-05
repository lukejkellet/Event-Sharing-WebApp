import React, { useState } from 'react';
import Navbar from '../Navbar';
import axios from 'axios'

function Settings() {
    const [oldEmail, setOldEmail] = useState('');
    const [newEmail, setEmail] = useState('');
    const [confirmPassword, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPass, SetConNewPass] = useState('');
    
    //Event handlers for when input field values are updated.
    const handleEmail = (event) => { 
      setEmail(event.target.value);
    };
    const handleOldEmail = (event) => { 
        setOldEmail(event.target.value);
    };
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };
    const handleNewPassword = (event) => {
        setNewPassword(event.target.value);
    }
    const handlePassConfirm = (event) => {
        SetConNewPass(event.target.value);
    }

    const submissionHandler = async (event) => {
        event.preventDefault(); //Prevents the page from refreshing upon form submission.
        const formURL = event.target.name; //Fetches name of submitted form - used as URL for form post.
        try {
          const response = await axios.post(formURL, {
            newEmail: newEmail,
            oldEmail: oldEmail,
            confirmPassword: confirmPassword,
            password: newPassword,
            newPasswordConfirm: confirmNewPass
          }); 
          //After response (code 200) is received:
          alert(response.data.message);
          axios.get("/logout")
          window.location.href = "/";
        } catch (error) {
          console.error(error);
          alert(error.response.data.message);
        }
      }

    return (
        <div className="main">
            <Navbar />
            <h1>Profile Settings</h1>
            <div className="contents">
                <div className="updateEmail">
                    <form name="changeEmail" action="/changeEmail" onSubmit={submissionHandler}>
                        <h2> Update Email </h2>
                        <label htmlFor="oldEmail">Current Email: </label>
                        <input type="email" id="oldEmail" value={oldEmail} onChange={handleOldEmail}/><br></br>
                        <label htmlFor="newEmail">New Email: </label>
                        <input type="email" id="newEmail" value={newEmail} onChange={handleEmail}/><br></br>
                        <label htmlFor='confirmPassword'>Password: </label>
                        <input type="password" id="confirmPassword" value={confirmPassword} onChange={handlePassword}/><br></br>
                        <button type="submit">Confirm</button>                    
                    </form>
                </div>
                <div className="updatePassword">
                    <form name="changePassword" action="/changePassword" onSubmit={submissionHandler}>
                        <h2> Update Password </h2>
                        <label htmlFor="oldEmail">Current Email: </label>
                        <input type="email" id="oldEmail" value={oldEmail} onChange={handleOldEmail}/><br></br>
                        <label htmlFor="newPassword">New Password: </label>
                        <input type="password" id="newPassword" value={newPassword} onChange={handleNewPassword}/><br></br>
                        <label htmlFor="confirmNew">Confirm Password: </label>
                        <input type="password" id="confirmNew" value={confirmNewPass} onChange={handlePassConfirm}/><br></br>
                        <button type="submit">Confirm</button>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default Settings;
