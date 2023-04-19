import React from "react";
import logo from "../images/Accent_logo_small.png"

function Header() {
    return (
        <div>
            <div class="header">
                <img src={logo} alt="logo" />
                <h1>ccent</h1>
            </div>
            <div id="header_text">
                <span>Designed by Actors</span>
                <span>Made for Everyone</span>
            </div>
        </div>
    )
}

export default Header