import React from 'react'
import { auth } from './components/frebase';
import { db } from './components/frebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
const LoginPage = () => {
  const [transition, startTransition] = React.useTransition()
  const navigate = useNavigate()
  function handleSubmit(event) {
    event.preventDefault();
    startTransition(async () => {
      const email = event.target.email.value;
      const password = event.target.password.value;
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("Login successful:", user.email);
        // Fetch additional user data from Firestore
        const dataId = localStorage.getItem("docId")
        if (dataId) {
          const userDoc = await getDoc(doc(db, 'users', dataId));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            localStorage.setItem("user", JSON.stringify({
              firstname: userData.firstName,
              lastname: userData.lastName,
              email: userData.email,
              address: userData.address,
              createdAt: userData.createdAt && typeof userData.createdAt.toDate === 'function' ? userData.createdAt.toDate().toString() : (userData.createdAt || '')
            }));
          }
        }
        // Redirect or show dashboard
        navigate("/admin-dashboard")
      } catch (error) {
        console.error("Login failed:", error.message);
        alert("Invalid credentials or user not found.");
      }
    })
    // Add your login logic here
  }
  return (
    <div className='vh-100 d-flex justify-content-center align-items-center' style={{ background: "linear-gradient(135deg, rgb(24 25 26), rgb(203 215 224))" }}>
      <form action="" className='d-flex flex-column justify-content-center gap-2 align-items-center col-md-4 ' onSubmit={handleSubmit} style={{
        backgroundColor: "#2c2f33",
        minWidth: "300px",
        color: "white",
        borderRadius: "8px",
        padding: "30px",
        paddingBottom: "50px"
      }}>
        <h1>Login Page</h1>
        <div className="d-flex flex-column justify-content-center gap-2 align-items-start ">
          <label htmlFor="email" className='text-start login-label'>Email</label>
          <input type="email" name="email" id="email" className='rounded-2' />
        </div>
        <div className="d-flex flex-column justify-content-center gap-2 align-items-start ">
          <label htmlFor="password" className='text-start login-label'>Password</label>
          <input type="password" name="password" id="password" className='rounded-2' />
        </div>
        <div className='gap-3 d-flex'>
          <button className='btn btn-success mt-2' type="submit" disabled={transition} > {transition ? "loading ..." : "Login"}</button>
          <button className='btn btn-info mt-2' type="button" onClick={() => navigate("/register")} >Register</button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
