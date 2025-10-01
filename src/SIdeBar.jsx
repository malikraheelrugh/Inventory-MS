import { useRef, useState, useEffect } from "react";
import styles from "./Sidebar.module.css"
//all components
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Categories from "./components/Categories";
import Orders from "./components/Orders";
import Suppliers from "./components/Suppliers";
import Users from "./components/Users";
import Profile from "./components/Profile";
//react icons
import { FaHome } from 'react-icons/fa';
import { AiOutlineProduct } from 'react-icons/ai';
import { BiSolidCategoryAlt } from 'react-icons/bi';
import { FaCartPlus } from 'react-icons/fa';
import { FaTruck } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';
import { LuSettings } from 'react-icons/lu';
import { AiOutlineLogout } from 'react-icons/ai';
function Sidebar() {
    const [activeTab, setActiveTab] = useState("Products");
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null)
    const handleTabChange = (tab) => {
        // ensure new tab starts hidden so the 2s delay can run before showing
        setIsVisible(false)
        setActiveTab(tab)
    }
    useEffect(() => {
        if (activeTab !== "Dashboard" && activeTab !== "Products" && activeTab != "Categories" && activeTab !== "Suppliers") {
            setIsVisible(false)
            return;
        }


        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, 500);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            try {
                observer.disconnect();
            } catch (e) {
                // ignore
            }
        };
    }, [activeTab])
    return (
        <>
            <div className="root-div d-flex" style={{ background: "#f8f9fa" }}>
                <div className={`${styles.Sidebar} text-bg-dark`}>
                    <h1 className={styles.SidebarHeading}>Inventory MS</h1>
                    <ul className={styles.sidebarList}>
                        <li
                            onClick={() => { handleTabChange("Dashboard"); }}
                            className={activeTab === "Dashboard" ? styles.active : ""}
                        >
                            <FaHome />  <span>Dashboard</span>
                        </li>
                        <li
                            onClick={() => handleTabChange("Products")}
                            className={activeTab === "Products" ? styles.active : ""}
                        >
                            <AiOutlineProduct /><span>Products</span>
                        </li>
                        <li
                            onClick={() => handleTabChange("Categories")}
                            className={activeTab === "Categories" ? styles.active : ""}
                        >
                            <BiSolidCategoryAlt /> <span>Categories</span>
                        </li>
                        <li
                            onClick={() => setActiveTab("Orders")}
                            className={activeTab === "Orders" ? styles.active : ""}
                        >
                            <FaCartPlus /><span>Orders</span>
                        </li>
                        <li
                            onClick={() => handleTabChange("Suppliers")}
                            className={activeTab === "Suppliers" ? styles.active : ""}
                        >
                            <FaTruck />  <span>Suppliers</span>
                        </li>
                        <li
                            onClick={() => setActiveTab("Users")}
                            className={activeTab === "Users" ? styles.active : ""}
                        >
                            <FaUsers /> <span>Users</span>
                        </li>
                        <li
                            onClick={() => setActiveTab("Profile")}
                            className={activeTab === "Profile" ? styles.active : ""}
                        >
                            <LuSettings /> <span>Profile</span>
                        </li>
                        <li
                            onClick={() => setActiveTab("Logout")}
                            className={activeTab === "Logout" ? styles.active : ""}
                        >
                            <AiOutlineLogout /><span>Logout</span>
                        </li>
                    </ul>
                </div>
                <main style={{ width: "100%" }}>
                    {activeTab == "Dashboard" && <Dashboard elementRef={elementRef} isVisible={isVisible} />}
                    {activeTab == "Products" && <Products elementRef={elementRef} isVisible={isVisible} />}
                    {activeTab == "Categories" && <Categories elementRef={elementRef} isVisible={isVisible} />}
                    {activeTab == "Orders" && <Orders />}
                    {activeTab == "Suppliers" && <Suppliers elementRef={elementRef} isVisible={isVisible} />}
                    {activeTab == "Users" && <Users />}
                    {activeTab == "Profile" && <Profile />}
                </main>
            </div>

        </>
    );
}

export default Sidebar;
