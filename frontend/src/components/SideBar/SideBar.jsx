import { Link } from "react-router-dom";

function SideBar() {
    return (
        <div >
            <ul>
                <li>
                    <Link>Summary</Link>
                </li>
                <li>
                    <Link>ORDER MANAGEMENT</Link>
                </li>
                <li>
                    <Link>PRODUCT MANAMENT</Link>
                </li>
                <li>
                    <Link>CUSTOMER MANAGEMENT</Link>
                </li>
                <li>
                    <Link>AUTHORIZATION</Link>
                </li>
                <li>
                    <Link>SETTING</Link>
                </li>
            </ul>
        </div>
    );
}

export default SideBar