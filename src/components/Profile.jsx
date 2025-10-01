import React, { useEffect, useState } from 'react'
import { CgProfile } from 'react-icons/cg';
const Profile = ({ elementRef, isVisible }) => {
    const [showModal, setshowModal] = useState(false)
    let parsedUser = { firstname: '', lastname: '', email: '', address: "", createdAt: '' }
    try {
        const raw = localStorage.getItem('user')
        if (raw) parsedUser = JSON.parse(raw)
    } catch (e) {
        // ignore parse errors and use defaults
    }

    const [user, setUser] = useState(parsedUser)

    const [formData, setFormData] = useState({
        firstname: parsedUser.firstname || '',
        lastname: parsedUser.lastname || '',
        email: parsedUser.email || '',
        address: parsedUser.address || '',
        createdAt: parsedUser.createdAt || ''
    })
    function handleChange(e) {
        setFormData({
            ...formData, [e.target.id]: e.target.value
        }
        )
    }
    function handleUpdate() {
        try {
            localStorage.setItem('user', JSON.stringify(formData))
            setUser(formData)
            setshowModal(false)
        } catch (e) {
            console.error('Failed to save user to localStorage', e)
        }
    }
    return (<>

        <div className='container-fluid'>
            <div className="container v col-md-6">
                <div className="header mt-5  d-flex justify-content-between align-items-center">
                    <h1 className=''> <CgProfile />profile</h1>
                    <button className='btn btn-primary' id='btn' onClick={() => setshowModal(true)}>Update Profile</button>
                </div>
                <div className='profile-div'
                    style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.8s ease-in-out', width: "100%" }}
                    ref={elementRef}>
                    <h4> <strong>firstName :</strong> {user.firstname}</h4>
                    <h4><strong>lastname</strong> {user.lastname}</h4>
                    <h4><strong>Email : </strong>{user.email}</h4>
                    <h4><strong>Address : </strong>{user.address}</h4>
                    <h4><strong>Logged in : </strong>{user.createdAt}</h4>
                </div>
            </div>
        </div>
        {showModal && <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"></h5>
                        <button type="button" className="btn-close" onClick={() => setshowModal(false)} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="firstname" className="form-label">first Name</label>
                                <input type="text" className="form-control" id="firstname" value={formData.firstname} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastname" className="form-label">Last Name</label>
                                <input type="text" className="form-control" id="lastname" value={formData.lastname} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Address</label>
                                <input type="text" className="form-control" id="createdAt" value={formData.address} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" value={formData.email} onChange={handleChange} id="email" />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setshowModal(false)}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleUpdate} >update</button>
                    </div>
                </div>
            </div>
        </div>}
    </>
    )
}

export default Profile
