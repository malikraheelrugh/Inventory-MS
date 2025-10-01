import React, { useEffect, useState } from 'react'
import styles from "./Products.module.css"
import { FaFilter } from 'react-icons/fa';
import { data } from 'react-router-dom'
const Products = ({ elementRef, isVisible }) => {
    const [showModal, setshowModal] = useState(false)
    const [products, setProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [editingProduct, seteditingProduct] = useState(null)
    const [categories, setCategories] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [formData, setFormData] = useState({
        name: "",
        category: '',
        supplier: "",
        price: "",
        stock: ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handlSubmit = async () => {
        console.log(formData);
        try {
            await fetch('http://localhost:3001/Products', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)

            })
        } catch (error) {
            console.log("error", error);

        }
        setFormData({
            name: '',
            category: '',
            supplier: '',
            price: '',
            stock: ''
        })
        setshowModal(false)

    }
    useEffect(() => {
        fetch('http://localhost:3001/Categories')
            .then(res => res.json())
            .then(data => setCategories(data))
        fetch('http://localhost:3001/suppliers')
            .then(res => res.json())
            .then(data => setSuppliers(data))

        fetch('http://localhost:3001/Products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [formData])
    function handleDelete(id) {
        fetch(`http://localhost:3001/Products/${id}`, {
            method: "DELETE",
        })
            .then((res) => {
                if (!res.ok) throw new Error("Delete failed");
                setProducts(products.filter((item) => item.id !== id));
            })
            .catch((err) => console.error("Error:", err));
    }

    return (<>
        <div className="container-fluid">
            <div className="container" style={{ width: "90%" }}>
                <div className={` ${styles.mainDiv}`}>
                    <h1> products </h1>
                    <div className={styles.addProductDiv}>
                        <div className={styles.filter}>   <FaFilter /></div>
                        <input type="text" name=""
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`${styles.addProduct}  `}
                            placeholder='search products by name' />
                        <button className='btn btn-primary ' id='btn' onClick={() => setshowModal(true)}>Add Product</button>
                    </div>
                </div><center>
                    <table className="table" ref={elementRef}
                        style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.8s ease-in-out', marginTop: "27px" }}

                    >
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">name</th>
                                <th scope="col">category</th>
                                <th scope="col">supplier</th>
                                <th scope="col">price</th>
                                <th scope="col">stock</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {products.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())).map((product, index) => {
                                return <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>{product.supplier}</td>
                                    <td>{product.price}$</td>
                                    <td className={`badge rounded-pill ${Number(product.stock) < 10 ? "text-bg-warning" : "text-bg-primary"} ms-3`}>{product.stock}</td>
                                    <td><button className='btn btn-warning' onClick={() => setshowModal(true)}>Edit</button>
                                        <button className='btn btn-danger ms-3' onClick={() => handleDelete(product.id)}>Delete</button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>

                </center>
            </div></div>
        {showModal && (
            <div className={styles.overlay}>
                <div className={styles.modal}>
                    <h2>Enter Details</h2>
                    <label htmlFor="name">Enter Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className={styles.input}
                    />
                    <div className={styles.select}>
                        <select name='category' value={formData.category}
                            onChange={handleChange}>
                            <option value="">Select category</option>
                            {categories.map((cat, index) => <option key={index} value={cat.category}>{cat.category}</option>)}

                        </select>
                        <select name="supplier"
                            value={formData.supplier}
                            onChange={handleChange}>
                            <option value="">Select supplier</option>
                            {suppliers.map((supplier, index) => <option key={index} value={supplier.name}>{supplier.name}</option>)}

                        </select>
                    </div>
                    <label htmlFor="price">Enter Price</label>
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        className={styles.input}
                    />

                    <label htmlFor="stock">Enter Stock</label>
                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={formData.stock}
                        onChange={handleChange}
                        className={styles.input}
                    />

                    <div style={{ display: "flex", gap: "10px", justifyContent: "end" }}>

                        <button
                            className='btn btn-primary'
                            onClick={() => setshowModal(false)}>Close</button>
                        <button
                            onClick={() => {
                                handlSubmit()
                            }}

                            className='btn btn-success'
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        )}


    </>
    )
}

export default Products
