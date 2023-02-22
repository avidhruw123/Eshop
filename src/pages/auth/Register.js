import React, { useState } from "react";
import styles from "./auth.module.scss";
import registerImg from "../../assets/register.png";
import Card from "../../Components/card/Card";
import { Link,useNavigate } from "react-router-dom";

import {createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../Components/loader/Loader";
import { toast } from 'react-toastify';



const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const[isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const registerUser=(e)=>{
    e.preventDefault();
    if(password !== cPassword){
        toast.error("password didn't match")
    }
    setIsLoading(true)

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {      
      const user = userCredential.user;
      console.log(user);
      setIsLoading(false);
      toast.success('Registration successfull...')
      navigate('/login')
    })
    .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
    });
  }



  

  return (
    <>
    
    {isLoading && <Loader/> }
    <section className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <h2>Register</h2>

          <form onSubmit={registerUser}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
              required
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Register
            </button>
          </form>

          <span className={styles.register}>
            <p>Already an account ?</p>
            <Link to="/Login"> Login</Link>
          </span>
        </div>
      </Card>
      <div className={styles.img}>
        <img src={registerImg} alt="Register" width="400" />
      </div>
    </section>
    </>
  );
};

export default Register;
