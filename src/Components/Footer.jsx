import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </footer>
    );
    
}

export default Footer;