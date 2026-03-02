import { useNavigate, Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faChevronDown, faCircleUser} from "@fortawesome/free-solid-svg-icons";
import userService from "../../service/userService.js";
import orders from "./order.module.scss"

const Orders = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    window.location.href = "/";
  };
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userInfo = localStorage.getItem("userInfo");
        if (!userInfo) {
          navigate("/authentic/login");
          return;
        }

        const data = await userService.getProfile();
        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
        });
      } catch (err) {
        setError("Your session has expired. Please log in again!");
        localStorage.removeItem("userInfo");
        navigate("/login");
      }
    };

    fetchProfileData();
  }, [navigate]);

  return (
    <div style={{ marginInline: "400px" }}>
      <header>
        <Link to="/">
          <img src="/icon/image.png" alt="NabCoffeeShop" width={80}/>
        </Link>

        <NavLink to="/orders" style={({ isActive }) => ({ textDecoration: isActive ? "underline" : "none", textUnderlineOffset: isActive ? "4px" : "auto", fontWeight: isActive ? "bold" : "normal", })} >
            Orders
        </NavLink>

        <NavLink to="/profile" style={({ isActive }) => ({ textDecoration: isActive ? "underline" : "none", textUnderlineOffset: isActive ? "4px" : "auto", fontWeight: isActive ? "bold" : "normal", })} >
            Profile
        </NavLink>

        <li style={{listStyle: 'none', marginLeft: 'auto'}}>
            <div className={orders.down}>
                <div style={{display: 'flex'}} >
                    <FontAwesomeIcon icon={faCircleUser} style={{fontSize:'25px'}} />
                    <FontAwesomeIcon icon={faChevronDown} className={orders.iconDown} style={{fontSize:'20px'}}/>
                </div>
            
            <ul className={orders.listSetting}> 
                <li
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    borderBottom: "1px solid",
                    paddingBottom: "20px",
                }}
                >
                <span>
                    <FontAwesomeIcon icon={faCircleUser} style={{ fontSize: "32px" }}/>
                </span>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px", color: "#222222", }} >
                    <p>{formData.name}</p>
                    <p>{formData.email}</p>
                </div>
                </li>

                <div style={{ display: "flex", flexDirection: "column", gap: "30px", marginTop: "40px", }} >
                <Link to="/profile">
                    <p style={{ color: "#000", fontWeight: "300" }}>Profile</p>
                </Link>
                <p style={{ color: "#000", fontWeight: "300" }}>Orders</p>
                <p
                    onClick={handleLogout}
                    style={{
                    textAlign: "left",
                    color: "#000",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "300",
                    marginBottom: "20px",
                    }}
                >
                    Log out
                </p>
                </div>
            </ul>

            </div>
        
        </li>
      </header>
    </div>
  );
};

export default Orders;
