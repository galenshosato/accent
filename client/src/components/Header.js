import React from "react";
import logo from "../images/Accent_logo_small.png"

function Header() {
    return (
        <div class="header">
            <img src={logo} alt="logo" />
            <h1>ccent</h1>
        </div>
    )
}

export default Header