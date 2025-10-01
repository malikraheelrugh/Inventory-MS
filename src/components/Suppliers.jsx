import React, { useEffect } from 'react'

const Suppliers = ({ elementRef, isVisible }) => {
    const [showModal, setshowModal] = React.useState(false)
    const [suppliers, setsuppliers] = React.useState([])
    const [editIndex, seteditIndex] = React.useState(-1)
    const [searchTerm, setSearchTerm] = React.useState("")
    const [formData, setformData] = React.useState({
        name: '',
        contact: '',
        address: '',
        email: ''
    })
    const url = 'http://localhost:3001/suppliers'
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setsuppliers(data))
    }, [])

    const handleChange = (e) => {
        setformData({ ...formData, [e.target.id]: e.target.value })

    }
    const hanleAddSupplier = async () => {
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            const newItem = await res.json()
            // use returned item (with id) to update UI
            setsuppliers([...suppliers, newItem])
        } catch (error) {
            console.log("error", error);
        }
        setformData({
            name: '',
            contact: '',
            address: '',
            email: ''
        })
        setshowModal(false)
    }

    // Open modal to edit supplier with given id
    function handleEdit(id) {
        const idx = suppliers.findIndex(s => s.id === id)
        if (idx === -1) return
        const item = suppliers[idx]
        setformData({
            name: item.name || '',
            contact: item.contact || '',
            address: item.address || '',
            email: item.email || ''
        })
        seteditIndex(id)
        setshowModal(true)
    }

    // Send updated data to server and update UI
    async function handleUpdate() {
        if (editIndex === -1) return
        try {
            const res = await fetch(`${url}/${editIndex}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            if (!res.ok) throw new Error('Update failed')
            const updated = await res.json()
            setsuppliers(suppliers.map(s => (s.id === editIndex ? updated : s)))
            // reset
            seteditIndex(-1)
            setformData({ name: '', contact: '', address: '', email: '' })
            setshowModal(false)
        } catch (err) {
            console.error('Error updating supplier:', err)
        }
    }
    function handleDelete(id) {
        fetch(`http://localhost:3001/suppliers/${id}`, {
            method: "DELETE",
        })
            .then((res) => {
                if (!res.ok) throw new Error("Delete failed");
                setsuppliers(suppliers.filter((item) => item.id !== id));
            })
        // .catch((err) => console.error("Error:", err));
    }
    return (
        <div className='container-fluid'>
            <div className="container">
                <h1 className='m-4'>supplier</h1>
                <div className="d-flex justify-content-center align-items-center my-3">

                    <input type="text"
                        className=' rounded-2 p-1 col-9'
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder='search a supplier by name ' />
                    <button className='btn btn-primary' id='btn' onClick={() => { seteditIndex(-1); setformData({ name: '', contact: '', address: '', email: '' }); setshowModal(true); }}>Add Supplier</button>
                </div>
                <div className="supplier" ref={elementRef}
                    style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.8s ease-in-out', width: "100%" }}

                >
                    <table className="table" style={{ width: "90%", margin: "auto" }}>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">name</th>
                                <th scope="col">contact</th>
                                <th scope="col">address</th>
                                <th scope="col">email</th>
                                <th scope="col">action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suppliers.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())).map((item, index) => {
                                return <tr key={item.id ?? index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.contact}</td>
                                    <td>{item.address}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <button className='btn btn-warning' onClick={() => handleEdit(item.id)}>Edit</button>

                                        <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {showModal && <div className="modal d-block" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{editIndex === -1 ? 'Add Supplier' : 'Edit Supplier'}</h5>
                            <button type="button" className="btn-close" onClick={() => setshowModal(false)} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" value={formData.name} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="contact" className="form-label">Contact</label>
                                    <input type="text" className="form-control" id="contact" value={formData.contact} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input type="text" className="form-control" value={formData.address} onChange={handleChange} id="address" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" value={formData.email} onChange={handleChange} id="email" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setshowModal(false)}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={editIndex === -1 ? hanleAddSupplier : handleUpdate}>{editIndex === -1 ? 'Save changes' : 'Update'}</button>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Suppliers
