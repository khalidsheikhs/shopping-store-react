import React, {Component} from "react";
import {Link} from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <header className="text-white bg-pink-600 py-3">
                <div className="mx-10">
                    {/* Home page link */}
                    <Link to={'/'}>Shopping Store</Link>
                </div>
            </header>
        );
    }
}

export default Header;