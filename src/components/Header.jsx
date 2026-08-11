import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
    return(
        <header className="header">
            <div className="header_inner">
                <Link to="/" className="header_logo">ON SET</Link>

                <nav className = "header_nav">
                    <Link to="/">홈</Link>
                    <Link to="/diary/write">경기일기</Link>
                    <Link to="/archive">아카이브</Link>
                </nav>
            </div>
        </header>
    )
};

export default Header;