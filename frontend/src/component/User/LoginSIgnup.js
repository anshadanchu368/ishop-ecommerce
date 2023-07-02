
// import React, { useRef } from 'react'
// import './LoginSignup.css'


// const LoginSIgnup = () => {

//     const loginTab=useRef(null);
//     const registerTab =useRef(null);

//   return (
//     <>
//       <div className="loginSignUpContainer">
//         <div className="loginSignupBox">
//             <div>
//                 <div className="login_signup_toggle">
//                     <p onClick={(e)=>switchTabs(e,"login")}>LOGIN</p>
//                     <p onClick={(e)=>switchTabs(e,"register")}>Register</p>
//                 </div>
//                 <button ref={switcherTab}></button>
//             </div>
//             <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
//                 <div className="loginEmail">
//                     <input type="email" placeholder='Email' required value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)}/>
                    
//                 </div>
//                 <div className="loginPassword">
//                     <input type="password" placeholder='Password' required value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)}/>
//                 </div>
//                 <Link to="/password/forgot">Forgot Password ?</Link>
//                 <input type="submit" value="login" className='LoginBtn' />
//             </form>
//         </div>
//       </div>
//     </>
//   )
// }

// export default LoginSIgnup
