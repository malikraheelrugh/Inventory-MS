import React from 'react'
import { db, auth } from './components/frebase';
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
const RegisterUser = () => {
    const [transition, startTransition] = React.useTransition()
    const naavigate = useNavigate()
    function handleSubmit(event) {
        startTransition(async () => {
            event.preventDefault();
            console.log(db)
            if (event.target[3].value !== event.target[4].value) {
                alert("Passwords do not match!");
                return;
            }
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, event.target[2].value, event.target[3].value);
                const user = userCredential.user;
                console.log("User created:", user.uid);
                await addDoc(collection(db, "users"), {
                    uid: user.uid,
                    firstName: event.target[0].value,
                    lastName: event.target[1].value,
                    email: event.target[2].value,
                    createdAt: new Date()
                });
                naavigate("/admin-dashboard")
                console.log("Supplier added!");
            } catch (error) {
                alert("Error adding supplier:", error);
            }
        })
    }
    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: "linear-gradient(135deg, rgb(24 25 26), rgb(203 215 224))" }}>
            <form className="row g-3 needs-validation flex-column justify-content-center align-items-center col-md-8" noValidate onSubmit={handleSubmit} style={{
                backgroundColor: "#2c2f33",
                color: "white",
                borderRadius: "8px",
                padding: "20px"
            }}>
                <div className="col">
                    <label htmlFor="validationCustom01" className="form-label">First name</label>
                    <input type="text" className="form-control" id="validationCustom01" required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div className="col">
                    <label htmlFor="validationCustom02" className="form-label">Last name</label>
                    <input type="text" className="form-control" id="validationCustom02" required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div className="col">
                    <label htmlFor="validationCustomUsername" className="form-label">Enter Email</label>
                    <div className="input-group has-validation">
                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                        <input type="email" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required />
                        <div className="invalid-feedback">
                            Please choose a email.
                        </div>
                    </div>
                </div>
                <div className="col">
                    <label htmlFor="validationCustom03" className="form-label">password</label>
                    <input type="password" className="form-control" id="validationCustom03" required />
                    <div className="invalid-feedback">
                        Please provide a valid password.
                    </div>
                </div>
                <div className="col">
                    <label htmlFor="validationCustom04" className="form-label">confirm password</label>
                    <input type="password" className="form-control" id="validationCustom03" required />
                    <div className="invalid-feedback">
                        Please provide a valid password.
                    </div>
                </div>

                <div className="col">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                        <label className="form-check-label" htmlFor="invalidCheck">
                            Agree to terms and conditions
                        </label>
                        <div className="invalid-feedback">
                            You must agree before submitting.
                        </div>
                    </div>
                </div>
                <div className="col">
                    <button className="btn btn-primary" type="submit" disabled={transition}>{transition ? "loading ..." : "Register"}</button>
                    <button className="btn btn-secondary ms-3" type="button" onClick={() => naavigate("/")}>Login</button>
                </div>
            </form>
        </div>
    )
}

export default RegisterUser
