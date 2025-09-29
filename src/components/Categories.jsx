import React, { useEffect } from 'react'

const Categories = () => {
    const [categories, setCategories] = React.useState([])
    const url = 'http://localhost:3001/Categories'
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [categories])

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
                // setCategories((prev) => [...prev, data]); // ✅ Update state correctly
            })
            .catch((err) => console.error("Error:", err));

        e.target.category.value = '';
        e.target.discription.value = '';
    };
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
                <h1 className='m-3 '>category Mangment</h1>
                <div className=' category-div'>
                    <div>
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
                    </div>
                    <div className='m-3 p-3 bg-light rounded output-div'>
                        <h2 className='m-3'>Categories List</h2>
                        <table className="table" style={{ width: "90%" }}>
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
                                    return <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{cat.category}</td>
                                        <td>{cat.discription}</td>
                                        <td><button className='btn btn-warning'>Edit</button>
                                            <button className='btn btn-danger ms-3' onClick={() => handleDelete(cat.id)}>Delete</button>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categories
