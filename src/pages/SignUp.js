// Style File --------------------------------------------------
import "./css/login.css";
// From React and Redux ----------------------------------------
import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
// Bootstrap Components
import Container from "react-bootstrap/esm/Container";
// Fortawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
// Phone number component
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
// ##############################################################
export default function Signup() {
    const back = () => {
        window.history.back()
    };
    const [fname, setFName]= useState("")
    const [lname, setLName]= useState("")
    const [username, setUsername]= useState("")
    const [password, setPassword]= useState("")
    const [repassword, setRepassword]= useState("")
    const [email, setEmail]= useState("")
    const [mobile, setMobile]= useState("")
    const [adress, setAdress]= useState("")
    // TEST INPUT LOGIC --------------------------------------
    const testInput = (inputName, inputId)=> {
        if(inputName === ""){
            document.getElementById(`${inputId}`).classList.add("isInvalid")
        }else {
            document.getElementById(`${inputId}`).classList.remove("isInvalid")
        }
    }
    const testFNameInput = ()=> {
        testInput(fname, "registerFName")
    }
    const testLNameInput = ()=> {
        testInput(lname, "registerLName")
    }
    const testUsernameInput = ()=> {
        testInput(username, "registerUsername")
    }
    const testPassInput = ()=> {
        testInput(password, "registerPassword")
    }
    const testRepassInput = ()=> {
        testInput(repassword, "registerRepeatPassword")
    }
    const testEmailInput = ()=> {
        testInput(email, "registerEmail")
    }
    const testMobileInput = ()=> {
        if(mobile === ""){
            document.querySelector('[type="tel"]').classList.add("isInvalid")
            document.getElementById("lableForMobile").classList.add("lableForMobileRed")
        }else {
            document.querySelector('[type="tel"]').classList.remove("isInvalid")
            document.getElementById("lableForMobile").classList.remove("lableForMobileRed")
        }
    }
    const testAdressInput = ()=> {
        testInput(adress, "adress")
    }
    // ------------------------------------------------------------------------------------
    const [ireadValue, setIreadValue]= useState("false")
    const iRead = ()=> {
        if (ireadValue === "true"){
            setIreadValue("false")
        }else {
            setIreadValue("true")
        }
    }
    // async function sendLoginValue(){
    //     testInput(name,"registerName");
    //     testInput(username,"registerUsername");
    //     testInput(password,"registerPassword");
    //     testInput(repassword,"registerRepeatPassword");
    //     testInput(email,"registerEmail");
    //     testInput(mobile,"mobile");
    //     testInput(adress,"adress");

    //     if(
    //         name!== "" && 
    //         username !== "" && 
    //         password !== "" && 
    //         repassword !== "" && 
    //         email !== "" && 
    //         mobile !== "" && 
    //         adress !== "" ){
    //         try{
    //             let result = await fetch('https://fakestoreapi.com/users',{
    //                 method:'POST',
    //                 headers:{
    //                     "Content-Type":"application/json",
    //                     "Accept":'application/json'
    //                 },
    //                 body:JSON.stringify({
    //                     email: email,
    //                     username: username,
    //                     password: password,
    //                     name:name,
    //                     address:adress,
    //                     phone:mobile,
    //                 })
    //             });
    //             let json = await result.json();
    //             if(result.status===200){
    //                 document.getElementById("errorLogin").innerText=""
    //                 if(ireadValue === "true"){
    //                     console.log("done", json)
    //                 }else {
    //                     console.log("read the terms please!")
    //                 }
    //                 window.location.href="./"
    //             }
    //         }catch(error) {
    //             document.getElementById("errorLogin").innerText="wrong!"
    //         }
    //     }
    // }
return (
    <>
        <Container>
            <div className="loginLinks">
                <div className="back" onClick={back}>
                    <FontAwesomeIcon icon={faAngleLeft} className="backIcon" />
                </div>
                <ul className="nav nav-pills nav-justified" id="ex1" role="tablist">
                    <li className="nav-item" role="presentation">
                        <Link className="nav-link current" id="tab-register" data-mdb-toggle="pill" to="/signup" role="tab"
                            aria-controls="pills-register" aria-selected="false">Sign Up</Link>
                    </li>
                    <li className="nav-item" role="presentation">
                        <Link className="nav-link" id="tab-login" data-mdb-toggle="pill" to="/" role="tab"
                        aria-controls="pills-login" aria-selected="true">RK STORE</Link>
                    </li>
                </ul>
            </div>
            <div className="tab-content">
                <div className="tab-pane fade show active" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                    <form>
                        <p className="mainFormTitle">Sign up</p>
                        <div className="inputsConatiner">
                            <div>
                                {/* <!-- First Name input --> */}
                                <div className="form-outline formInput">
                                    <label className="form-label" htmlFor="registerFName">First Name</label>
                                    <input type="text" className="form-control"
                                    id="registerFName"
                                    onBlur={testFNameInput}
                                    onChange={(e) => setFName(e.target.value)}
                                    />
                                </div>
                                {/* <!-- Last Name input --> */}
                                <div className="form-outline formInput">
                                    <label className="form-label" htmlFor="registerLName">Last Name</label>
                                    <input type="text" className="form-control"
                                    id="registerLName"
                                    onBlur={testLNameInput}
                                    onChange={(e) => setLName(e.target.value)}
                                    />
                                </div>
                                {/* <!-- Username input --> */}
                                <div className="form-outline formInput">
                                    <label className="form-label" htmlFor="registerUsername">Username</label>
                                    <input type="text" className="form-control" 
                                    id="registerUsername"
                                    onBlur={testUsernameInput}
                                    onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                {/* <!-- Email input --> */}
                                <div className="form-outline formInput">
                                    <label className="form-label" htmlFor="registerEmail">Email</label>
                                    <input type="email" className="form-control" 
                                    id="registerEmail"
                                    onBlur={testEmailInput}
                                    onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                {/* <!-- Password input --> */}
                                <div className="form-outline formInput">
                                    <label className="form-label" htmlFor="registerPassword">Password</label>
                                    <input type="password" className="form-control" 
                                    id="registerPassword"
                                    onBlur={testPassInput}
                                    onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                {/* <!-- Repeat Password input --> */}
                                <div className="form-outline formInput">
                                    <label className="form-label" htmlFor="registerRepeatPassword">Repeat password</label>
                                    <input type="password" className="form-control" 
                                    id="registerRepeatPassword"
                                    onBlur={testRepassInput}
                                    onChange={(e) => setRepassword(e.target.value)}
                                    />
                                </div>
                                {/* <!-- Address input --> */}
                                <div className="form-outline formInput">
                                    <label className="form-label" htmlFor="adress">Adress</label>
                                    <input type="text" className="form-control" 
                                    id="adress"
                                    onBlur={testAdressInput}
                                    onChange={(e) => setAdress(e.target.value)}
                                    />
                                </div>
                                {/* <!-- Mobile input --> */}
                                <label className="form-label" id="lableForMobile" htmlFor="mobile">Mobile</label>
                                <PhoneInput className="formInput phoneInput"
                                country={'eg'}
                                onBlur={testMobileInput}
                                onChange={setMobile}/>
                            </div>
                        </div>
                        {/* <!-- Checkbox --> */}
                        <div className="form-check">
                            <input className="form-check-input me-2" type="checkbox" value="" id="registerCheck"
                                aria-describedby="registerCheckHelpText" 
                                onClick={iRead}
                                />
                            <label className="form-check-label" htmlFor="registerCheck">
                                I have read and agree to the terms
                            </label>
                        </div>
                        <div id="errorLogin"></div>
                        {/* <!-- Submit button --> */}
                        <div onClick={(e)=>(e.preventDefault())} id="submit" className="btn btn-primary btn-block mb-3">Sign up</div>
                        <div className="text-center">
                            <p>I'am a member alredy! <Link to="/login">Login</Link></p>
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
