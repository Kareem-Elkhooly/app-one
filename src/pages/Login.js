// Style File --------------------------------------------------
import "./css/login.css";
// From React and Redux ----------------------------------------
import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
// Local storage --------------------------------------------
import Loginpic from "./../images/login.svg";
// Bootstrap Components
import Container from "react-bootstrap/esm/Container";
// Fortawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
// ##############################################################
export default function Login() {
    const back = () => {
        window.history.back()
    };
    const [nameValue, setNameValue]= useState("")
    const [passwordlValue, setPasswordValue]= useState("")
    const testNameInput = ()=> {
        if(nameValue === ""){
            document.getElementById("loginName").classList.add("isInvalid")
        }else {
            document.getElementById("loginName").classList.remove("isInvalid")
        }
    }
    const testPassInput = ()=> {
        if(passwordlValue === ""){
            document.getElementById("loginPassword").classList.add("isInvalid")
        }else {
            document.getElementById("loginPassword").classList.remove("isInvalid")
        }
    }
    const [rememberMeValue, setRememberMeValue]= useState("false")
    const rememberMe = ()=> {
        if (rememberMeValue === "true"){
            setRememberMeValue("false")
        }else {
            setRememberMeValue("true")
        }
    }
    async function sendLoginValue(){
        if(nameValue === ""){
            document.getElementById("loginName").classList.add("isInvalid")
        }else {
            document.getElementById("loginName").classList.remove("isInvalid")
        }
        if(passwordlValue === ""){
            document.getElementById("loginPassword").classList.add("isInvalid")
        }else {
            document.getElementById("loginPassword").classList.remove("isInvalid")
        }
        if(nameValue !== "" && passwordlValue !== ""){
            try{
                let result = await fetch('https://fakestoreapi.com/auth/login',{
                    method:'POST',
                    headers:{
                        "Content-Type":"application/json",
                        "Accept":'application/json'
                    },
                    body:JSON.stringify({
                        username: nameValue,
                        password: passwordlValue
                    })
                });
                let json = await result.json();
                if(result.status===200){
                    document.getElementById("errorLogin").innerText=""
                    if(rememberMeValue === "true"){
                        localStorage.setItem("token", json.token)
                        localStorage.setItem("userData", nameValue)
                    }else {
                        sessionStorage.setItem("token", json.token)
                        sessionStorage.setItem("userData", nameValue)
                    }
                    window.location.href="./"
                }
            }catch(error) {
                document.getElementById("errorLogin").innerText="Username or passowrd is wrong!"
            }
        }
    }
return (
    <>
        <Container>
            <div className="loginLinks">
                <div className="back" onClick={back}>
                    <FontAwesomeIcon icon={faAngleLeft} className="backIcon" />
                </div>
                <ul className="nav nav-pills nav-justified" id="ex1">
                    <li className="nav-item">
                        <Link className="nav-link current" id="login" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">RK STORE</Link>
                    </li> 
                </ul>
            </div>
            <div className="tab-content">
                <div>
                    <img
                    className="loginpic"
                    src={Loginpic}
                    alt="First slide"/>
                </div>
                <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                    <form>
                        <p className="mainFormTitle">Login</p>
                        {/* <!-- Email input --> */}
                        <div className="form-outline formInput">
                            <label className="form-label" htmlFor="loginName">Username</label>
                            <input
                            required
                            type="text" 
                            id="loginName" 
                            className="form-control" 
                            onBlur={testNameInput}
                            onChange={(e) => setNameValue(e.target.value)} />
                        </div>
                        {/* <!-- Password input --> */}
                        <div className="form-outline formInput">
                            <label className="form-label" htmlFor="loginPassword">Password</label>
                            <input 
                            required
                            type="password" 
                            id="loginPassword" 
                            className="form-control" 
                            onBlur={testPassInput}
                            onChange={(e) => setPasswordValue(e.target.value)}/>
                        </div>
                        {/* <!-- 2 column grid layout --> */}
                        <div className="col-md-6 w-100 d-flex justify-content-end">
                            {/* <!-- Simple link --> */}
                            <a href="#!">Forgot password?</a>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                {/* <!-- Checkbox --> */}
                                <div className="form-check mb-3 mb-md-0">
                                    <label className="form-check-label" htmlFor="loginCheck"> Remember me </label>
                                    <input onClick={rememberMe} className="form-check-input" type="checkbox" value={rememberMeValue} id="loginCheck"/>
                                </div>
                            </div>
                        </div>
                        <div id="errorLogin"></div>
                        {/* <!-- Submit button --> */}
                        <div onClick={sendLoginValue} id="submit" className="btn btn-primary btn-block mb-3">Login</div>
                        {/* <!-- Register buttons --> */}
                        <div className="text-center">
                            <p>Not a member? <Link to="/signup">Sign Up</Link></p>
                        </div>
                    </form>
                </div>
            </div>
            <div className="footer-copyright footer-copyright-postion">
                © 2024 Copyright: Made By Kareem-Elkhooly
            </div>
        </Container>
    </>
)
}
