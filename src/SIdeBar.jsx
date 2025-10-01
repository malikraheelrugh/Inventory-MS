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
import Logout from "./components/Logout";
//react icons
import { BiMenu } from "react-icons/bi";
import { FaHome } from 'react-icons/fa';
import { AiOutlineProduct } from 'react-icons/ai';
import { BiSolidCategoryAlt } from 'react-icons/bi';
import { FaCartPlus } from 'react-icons/fa';
import { FaTruck } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';
import { CgClose } from "react-icons/cg";
import { CgProfile } from 'react-icons/cg';
import { AiOutlineLogout } from 'react-icons/ai';
function Sidebar() {
    const [activeTab, setActiveTab] = useState("Profile");
    const [isVisible, setIsVisible] = useState(false);
    const [closeSidebar, setCloseSidebar] = useState(true);
    const elementRef = useRef(null)
    const handleTabChange = (tab) => {
        // ensure new tab starts hidden so the 2s delay can run before showing
        setIsVisible(false)
        setActiveTab(tab)
    }
    useEffect(() => {
        if (activeTab !== "Dashboard" && activeTab !== "Products" && activeTab != "Categories" && activeTab !== "Suppliers" && activeTab !== "Profile") {
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
    function handleClosesidebar() {
        setCloseSidebar(!closeSidebar)
    }
    return (
        <>
            <div className="root-div d-flex" style={{ background: "#f8f9fa" }}>
                <div className={`${styles.Sidebar} text-bg-dark`} style={{ width: closeSidebar === true ? "70px" : "250px", transition: "width 0.3s" }}>
                    {closeSidebar == true ? <BiMenu className="closeSideBar" onClick={handleClosesidebar} /> : <CgClose onClick={handleClosesidebar} className="closeSideBar" />}
                    <h1 className={styles.SidebarHeading}>{closeSidebar === false ? "Inventory MS" : ""}</h1>
                    <ul className={`${styles.sidebarList}`}>
                        <li
                            onClick={() => { handleTabChange("Dashboard"); }}
                            className={activeTab === "Dashboard" ? styles.active : ""}
                        >
                            <FaHome /> {closeSidebar === false && <span>Dashboard</span>}
                        </li>
                        <li
                            onClick={() => handleTabChange("Products")}
                            className={activeTab === "Products" ? styles.active : ""}
                        >
                            <AiOutlineProduct />{closeSidebar === false && <span>Products</span>}
                        </li>
                        <li
                            onClick={() => handleTabChange("Categories")}
                            className={activeTab === "Categories" ? styles.active : ""}
                        >
                            <BiSolidCategoryAlt /> {closeSidebar === false && <span>Categories</span>}
                        </li>
                        <li
                            onClick={() => setActiveTab("Orders")}
                            className={activeTab === "Orders" ? styles.active : ""}
                        >
                            <FaCartPlus /> {closeSidebar === false && <span>Orders</span>}
                        </li>
                        <li
                            onClick={() => handleTabChange("Suppliers")}
                            className={activeTab === "Suppliers" ? styles.active : ""}
                        >
                            <FaTruck /> {closeSidebar === false && <span>Suppliers</span>}
                        </li>
                        <li
                            onClick={() => setActiveTab("Users")}
                            className={activeTab === "Users" ? styles.active : ""}
                        >
                            <FaUsers /> {closeSidebar === false && <span>Users</span>}
                        </li>
                        <li
                            onClick={() => handleTabChange("Profile")}
                            className={activeTab === "Profile" ? styles.active : ""}
                        >
                            <CgProfile /> {closeSidebar === false && <span>Profile</span>}
                        </li>
                        <li
                            onClick={() => setActiveTab("Logout")}
                            className={activeTab === "Logout" ? styles.active : ""}
                        >
                            <AiOutlineLogout /> {closeSidebar === false && <span>Logout</span>}
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
                    {activeTab == "Profile" && <Profile elementRef={elementRef} isVisible={isVisible} />}
                    {activeTab == "Logout" && <Logout elementRef={elementRef} isVisible={isVisible} />}
                </main>
            </div>

        </>
    );
}

export default Sidebar;
