import { useState } from "react";
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from "../../Components/card/Card";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/loader/Loader";
import { signInWithPopup,GoogleAuthProvider} from "firebase/auth";
import { useSelector } from "react-redux";
import { selectPreviousURL } from "../../redux/slice/cartSlice";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const previousURL = useSelector(selectPreviousURL)
  const navigate = useNavigate();

  const redirectUser =()=>{
    if(previousURL.includes("cart")){
      return navigate('/cart')
    }else{
      navigate('/')
    }
  }

 

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //const user = userCredential.user;
        setIsLoading(false);
        toast.success("login successful...");
        redirectUser()        
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  ///login with google
  const provider = new GoogleAuthProvider();
  const signInWithGoogle=()=>{
    signInWithPopup(auth, provider)
    .then((result) => {
     //   const user = result.user;
        toast.success("Login successfully")
        redirectUser()     
    }).catch((error) => {
        toast.error(error.message)
    });
  }



  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="Login" width="400" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Login</h2>

            <form onSubmit={loginUser}>
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
              <button type="submit" className="--btn --btn-primary --btn-block"
              >
                
                Login
              </button>
              <div className={styles.links}>
                <Link to="/reset">Reset password</Link>
              </div>
              <p>--or--</p>
            </form>
            <button className="--btn --btn-danger --btn-block" onClick={signInWithGoogle}>
              <FaGoogle color="#fff" />
              &nbsp;Login With Google
            </button>
            <span className={styles.register}>
              <p>Don't have an account ?</p>
              <Link to="/register"> Register</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
