import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom/dist';
import "bootstrap/dist/css/bootstrap.min.css";
import './Main.css';
import axios from 'axios';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password
    };
    setUser(userData);
    axios.post(`https://localhost:7145/api/Users/Login`,userData
    ).then((res)=>{
      console.log(res);
      alert("Successfully logged in!");
      localStorage.setItem('usertoken',res.data);
    }).catch((error)=>
    {
      alert("Check email id or password and try again. :')");
    });
    navigate('/homemain');
  };


  const handleNavigation = () => {
    // Perform any necessary logic here
    // Navigate to the desired route
    navigate('/register');
  };

  return (
    <section class="h-120 gradient-form" style={{ backgroundColor: '#3f3f3f' }}>
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-xl-10">
            <div class="card rounded-3 text-black">
              <div class="row g-0">
                <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                    <div class="text-center"><h1 class="mb-4">WalletWizard.com</h1></div>
                    <div class="text-center"><h4 class="mb-4">Your Ultimate Financial Companion</h4></div>
                    <p class="small mb-0 text-center">Seeking a smart and efficient way to manage your finances? 
                      <br></br>Look no further than WalletWizard!<br></br><br></br>
                      Our powerful app is designed to revolutionize the way you track your expenses, manage your budgets, and achieve your financial goals.
                      With WalletWizard, you can effortlessly monitor your income, expenses, and savings all in one place.
                      Gain valuable insights into your spending patterns, identify areas for improvement, and make informed financial decisions.
                    </p>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="card-body p-md-5 mx-md-4">

                    <div class="text-center">
                      {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        style="width: 185px;" alt="logo"> */}
                      <h4 class="mt-1 mb-5 pb-1">Welcome!</h4>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <p class="text-center">Please login to your account</p>

                      <div class="form-outline mb-4">
                        <input type="email" id="form2Example11" class="form-control"
                          placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                        {/* <label class="form-label" for="form2Example11">Username</label> */}
                      </div>

                      <div class="form-outline mb-4">
                        <input type="password" id="form2Example22" class="form-control"
                          placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        {/* <label class="form-label" for="form2Example22">Password</label> */}
                      </div>

                      <div class="text-center pt-1 mb-5 pb-1">
                        <button class="btn btn-primary btn-block fa-lg gradient-custom-1 mb-3 w-100" type="submit" onClick={handleSubmit}>
                          Log in
                        </button>
                        {/* <div>
                          <a class="text-muted" href="#!">Forgot password?</a>
                        </div> */}
                      </div>

                      <div class="d-flex align-items-center justify-content-center pb-4">
                        <p class="mb-0 me-2">Don't have an account?</p>
                        <div>
                          <button type="button" class="btn btn-outline-danger" onClick={handleNavigation} >Create new</button>
                        </div>
                      </div>

                    </form>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

  // <div className="login-container">
  //   <h2 style={{cursor: 'default'}}><font color="white">Welcome Back!</font></h2>
  //   <form onSubmit={handleSubmit}>
  //     <input
  //       type="email"
  //       placeholder="Email"
  //       value={email}
  //       onChange={(e) => setEmail(e.target.value)}
  //     />
  //     <input
  //       type="password"
  //       placeholder="Password"
  //       value={password}
  //       onChange={(e) => setPassword(e.target.value)}
  //     />
  //     <button type="submit">Login</button>
  //   </form>
  // </div>