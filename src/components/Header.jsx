import { Link, NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
    return(
        <header className="header">
            <div className="header_inner">
                <Link to="/" className="header_logo">ON SET</Link>

                <nav className = "header_nav">
                    <NavLink to="/" end className={({isActive}) => isActive ? "active" : ""}>홈</NavLink>
                    <NavLink to="/diary/write" className={({isActive}) => isActive ? "active" : ""}>경기일기</NavLink>
                    <NavLink to="/archive" className={({isActive}) => isActive ? "active" : ""}>아카이브</NavLink>
                </nav>
            </div>
        </header>
    )
};

export default Header;