import React, { useEffect, useState } from 'react'
import { FaFilter } from 'react-icons/fa';

const Categories = ({ elementRef, isVisible }) => {
    const [categories, setCategories] = React.useState([])
    const [showModal, setShowModal] = React.useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [editIndex, setEditIndex] = React.useState(-1)
    const [formData, setFormData] = React.useState({ category: '', discription: '' })
    const url = 'http://localhost:3001/Categories'
    const category = formData.category
    const discription = formData.discription
    const newCategory = { category, discription }

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [category])

    const handleSubmit = (e) => {
        e.preventDefault();

        const category = e.target.category.value;
        const discription = e.target.discription.value;
        const newCategory = { category, discription };

        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCategory)
        })
            .then((res) => res.json())
            .then((data) => {
                setCategories((prev) => [...prev, data]); // update state with returned item
            })
            .catch((err) => console.error("Error:", err));

        e.target.category.value = '';
        e.target.discription.value = '';
    };
    function handleEdit(id) {
        const idx = categories.findIndex(c => c.id === id)
        if (idx === -1) return
        const item = categories[idx]
        setFormData({
            category: item.category || '',
            discription: item.discription || ''
        })
        setEditIndex(id)
        setShowModal(true)
        console.log("Edit category with id:", id);
    }

    async function handleUpdate(e) {
        if (editIndex === -1) {
            e.preventDefault()
            // return;
            // console.log(e.target);
            try {
                fetch(url, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newCategory)

                }).then(res => res.json())
                    .then(console.log)
                return;
            } catch (error) {
                console.log(error);

            }
        }
        try {
            const res = await fetch(`${url}/${editIndex}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            if (!res.ok) throw new Error('Update failed')
            const updated = await res.json()
            setCategories(categories.map(c => (c.id === editIndex ? updated : c)))
            setEditIndex(-1)
            setFormData({ category: '', discription: '' })
            setShowModal(false)
        } catch (err) {
            console.error('Error updating category:', err)
        }
    }
    function handleDelete(id) {
        fetch(`http://localhost:3001/Categories/${id}`, {
            method: "DELETE",
        })
            .then((res) => {
                if (!res.ok) throw new Error("Delete failed");
                setCategories(categories.filter((item) => item.id !== id));
            })
            .catch((err) => console.error("Error:", err));

    }
    return (
        <div className='container-fluid'>
            <div className="container">
                <h1 className='my-4 ' style={{ fontFamily: "fantasy" }}>category Mangment</h1>
                <div className="my-3">  <span className='bg-info p-2 rounded-3'> <FaFilter /></span>
                    <input type="text" name=""
                        style={{ padding: "5px 40% 5px 4px" }}
                        // value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="mx-3 rounded-2"
                        placeholder='search products by name' />
                    <button className='btn btn-primary ' id='btn' style={{ float: "right" }} onClick={() => setShowModal(true)} >Add Product</button>

                </div>

                <div className=' category-div' ref={elementRef}
                    style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.8s ease-in-out', width: "100%" }}

                >
                    {/* <div>
                        <form className="input-div d-flex flex-column m-3 bg-light p-3 rounded" onSubmit={handleSubmit}>
                            <label htmlFor="category" className='fw-bold'>Enter a category</label>
                            <input type="text" id="category" name="category" placeholder='category' className='rounded-1' />
                            <label htmlFor="discription" className='fw-bold'>Add Discription</label>
                            <input type="text" id="discription" placeholder='Discription' name="discription" className='rounded-1' />
                            <div className='d-flex gap-3 justify-content-end mt-3'>
                                <button type='button' className='btn btn-warning col-4'>cacel</button>
                                <button type='submit' className='btn btn-success col-4'>Add </button>
                            </div>
                        </form>
                    </div> */}
                    <div className=' bg-light rounded output-div'>
                        <h2 className='mx-3' style={{ fontFamily: "system-ui" }}>Categories List</h2>

                        <table className="table" style={{ width: "100%" }}>
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">category</th>
                                    <th scope="col">discription</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {categories.map((cat, index) => {
                                    return <tr key={cat.id ?? index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{cat.category}</td>
                                        <td>{cat.discription}</td>
                                        <td><button className='btn btn-warning' onClick={() => handleEdit(cat.id)}>Edit</button>
                                            <button className='btn btn-danger ms-3' onClick={() => handleDelete(cat.id)}>Delete</button>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {showModal && <div className="modal d-block" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{editIndex === -1 ? 'Add Category' : 'Edit Category'}</h5>
                            <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
                        </div>
                        <form >

                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">Category</label>
                                    <input type="text" className="form-control" id="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="discription" className="form-label">Discription</label>
                                    <input type="text" className="form-control" id="discription" value={formData.discription} onChange={(e) => setFormData({ ...formData, discription: e.target.value })} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleUpdate}>{editIndex == -1 ? "add" : "update"}</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Categories
