import React from 'react'
import styles from "./Dashboard.module.css"
const Dashboard = () => {
    const dashboardArray = [
        {
            dataName: "Total Products",
            quantity: 8,
            bgColor: "bg-primary"
        },
        {
            dataName: "Total Stock",
            quantity: 65,
            bgColor: "bg-success"
        },
        {
            dataName: "Total Products",
            quantity: 8,
            bgColor: "bg-warning"
        },
        {
            dataName: "Total Products",
            quantity: 8,
            bgColor: "bg-purple"
        }
    ]

    return (
        <div className='p-5'>
            <h1 className='my-3'>Dashboard</h1>
            <div className={styles.mainDiv}>
                {dashboardArray.map((items, index) => {
                    return <div key={index} className={`${items.bgColor} ${styles.dashboardArrayDiv}`}>
                        <center>  <h5>{items.dataName}</h5>
                            <p>{items.quantity}</p>
                        </center>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Dashboard
