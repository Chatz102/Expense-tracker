import React, {useEffect} from 'react';
import "./App.css";
import {Link, Route, Routes, useLocation} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AddTransaction from "./components/AddTransaction";
import TransactionHistory from "./components/TransactionHistory";
import {Container, Nav, Navbar, Offcanvas} from "react-bootstrap";
import NotFound from "./components/NotFound";
import AddCategory from "./components/AddCategory";
import $ from "jquery";
import {FaBookmark, FaBookOpen, FaHome, FaMoneyBill} from "react-icons/fa";

function App() {
    const location = useLocation()
    let dashboard = $("#dashboard");
    let addCategory = $("#addCategory");
    let addTransaction = $("#addTransaction");
    let transactionHistory = $("#transactionHistory");

    // ...
    useEffect(() => {
        switch (location.pathname) {
            case "/":
                dashboard.css("cssText", "color:orange !important");
                addCategory.css("cssText", "color:white");
                addTransaction.css("cssText", "color:white");
                transactionHistory.css("cssText", "color:white");
                break;
            case "/addCategory":
                dashboard.css("cssText", "color:white");
                addCategory.css("cssText", "color:orange !important");
                addTransaction.css("cssText", "color:white");
                transactionHistory.css("cssText", "color:white");
                break;
            case "/addTransaction":
                dashboard.css("cssText", "color:white");
                addCategory.css("cssText", "color:white");
                addTransaction.css("cssText", "color:orange !important");
                transactionHistory.css("cssText", "color:white");
                break;
            case "/transactionHistory":
                dashboard.css("cssText", "color:white");
                addCategory.css("cssText", "color:white");
                addTransaction.css("cssText", "color:white");
                transactionHistory.css("cssText", "color:orange !important");
                break;
            default:
                break;
        }
    }, [location])

    return (
        <>
            <Navbar id="theNavbar" key={"lg"} expand={"md"} className="top-nav mb-3">
                <Container fluid>
                    <Link to="/" className="navbar-brand"><h1 className="brand-color">Expense Tracker</h1></Link>
                    <Navbar.Toggle className="navbar-toggle" aria-controls={`offcanvasNavbar-expand-${"md"}`}/>
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${"md"}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${"md"}`}
                        placement="end"
                        className="offcanvas-nav"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title className="brand-color" id={`offcanvasNavbarLabel-expand-${"md"}`}>
                                Expense Tracker
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className=" justify-content-end flex-grow-1">
                                <Link id="dashboard" to="/" className="brand-color nav-link"><FaHome/> Dashboard
                                </Link>
                                <Link id="addCategory" to="/addCategory"
                                      className="brand-color nav-link"><FaBookOpen/> Add
                                    Expense
                                    Category
                                </Link>
                                <Link id="addTransaction" to="/addTransaction"
                                      className="brand-color nav-link"><FaMoneyBill/> New
                                    Transaction
                                </Link>
                                <Link id="transactionHistory" to="/transactionHistory" className="brand-color nav-link"><FaBookmark/>Transaction
                                    History
                                </Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/addTransaction" element={<AddTransaction/>}/>
                <Route path="/addCategory" element={<AddCategory/>}/>
                <Route path="/transactionHistory" element={<TransactionHistory/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>

        </>
    );
}

export default App;
