import React from 'react'
import { useNavigate } from 'react-router-dom';
const Logout = () => {
    const [showModal, setShowModal] = React.useState(true)
    const navigate = useNavigate();
    // automatically open modal on mount (set showModal true by default)
    // call setShowModal(false) to close
    function handleLogout() {
        try {
            localStorage.removeItem('user')
            navigate("/")
        } catch (e) {
            console.error('Failed to remove user from localStorage', e)
        }
    }
    return (
        <div>
            {showModal && (
                <div className="modal d-block" tabIndex={-1} role="dialog" aria-labelledby="modalTitleId" aria-hidden="false">
                    <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="modalTitleId">Logout</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">Are you want to logout ?</div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Logout
