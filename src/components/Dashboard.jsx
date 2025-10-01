import React, { useEffect, useRef, useState } from 'react'
import styles from "./Dashboard.module.css"
const Dashboard = ({ isVisible, elementRef }) => {
    const [product, setProduct] = useState({
        price: 0,
        stock: 0,
        length: 0
    });

    useEffect(() => {
        fetch("http://localhost:3001/Products")
            .then(res => res.json())
            .then((data) => {
                const Product = data.reduce((acc, item) => {
                    acc.price += Number(item.price) * Number(item.stock);
                    acc.stock += Number(item.stock);
                    return acc;
                }, { price: 0, stock: 0 });
                setProduct({
                    price: Product.price,
                    stock: Product.stock,
                    length: data.length
                });
            });
    }, []);

    const dashboardArray = [
        {
            dataName: "Total Products",
            quantity: product.length,
            bgColor: "bg-primary"
        },
        {
            dataName: "Total Stock",
            quantity: product.stock,
            bgColor: "bg-success"
        },
        {
            dataName: "Order Today",
            quantity: 8,
            bgColor: "bg-warning"
        },
        {
            dataName: "Revenue",
            quantity: `${product.price} $`,
            bgColor: "bg-purple"
        }
    ]

    return (
        <div className='p-5'>
            <h1 className='mb-3' style={{ marginLeft: "7%" }}>Dashboard</h1>
            <div className={styles.mainDiv} >
                {dashboardArray.map((items, index) => {
                    return <div key={index} ref={elementRef}
                        className={`${items.bgColor} ${styles.dashboardArrayDiv} col-md-5`}
                        style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.8s ease-in-out' }}>
                        <center>  <h2>{items.dataName}</h2>
                            <h1>{items.quantity}</h1>
                        </center>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Dashboard
