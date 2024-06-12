// Layout.jsx
import Navbar from "./Navbar";
import PropTypes from "prop-types";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <Navbar />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
