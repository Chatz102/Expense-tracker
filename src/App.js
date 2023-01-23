import React from 'react';
import "./App.css";
import {Link, Route, Routes} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AddTransaction from "./components/AddTransaction";
import TransactionHistory from "./components/TransactionHistory";
import {Container, Nav, Navbar, Offcanvas} from "react-bootstrap";
import NotFound from "./components/NotFound";
import AddCategory from "./components/AddCategory";

function App() {
    return (
        <>
            <Navbar id="theNavbar" key={"lg"} expand={"md"} className="top-nav mb-3">
                <Container fluid>
                    <Navbar.Brand href="#"><h1 className="brand-color">Expense Tracker</h1></Navbar.Brand>
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
                                <Link to="/" className="brand-color nav-link">
                                    Dashboard
                                </Link>
                                <Link to="/addCategory" className="brand-color nav-link">Add
                                    Expense
                                    Category
                                </Link>
                                <Link to="/addTransaction" className="brand-color nav-link">New
                                    Transaction
                                </Link>
                                <Link to="/transactionHistory" className="brand-color nav-link">Transaction
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
