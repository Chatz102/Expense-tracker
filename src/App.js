import React, {useState} from 'react';
import "./App.css";
import {Container, Nav, Navbar, Offcanvas} from "react-bootstrap";
import CategoryCard from "./components/CategoryCard";
import AddCategory from "./components/AddCategory";
import {useCategories} from "./context/CategoryContexts";
import AddTransaction from "./components/AddTransaction";
import TransactionHistory from "./components/TransactionHistory";
import RecentTransaction from "./components/RecentTransaction";

function App() {
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);
    const [showTransactionHistoryModal, setShowTransactionHistoryModal] = useState(false);
    const [addTransactionModalCategoryId, setAddTransactionModelCategoryId] = useState();
    const [TransactionHistoryModalCategoryId, setTransactionHistoryModelCategoryId] = useState();
    const {category, transactionHistory, getCategoryTransactions, getTransactionHistoryTransactions} = useCategories();

    function openAddTransactionModal(categoryId) {
        setShowAddTransactionModal(true);
        setAddTransactionModelCategoryId(categoryId);
    }

    function openTransactionHistoryModal(categoryId) {
        setShowTransactionHistoryModal(true);
        setTransactionHistoryModelCategoryId(categoryId);
    }

    return (
        <>
            <Container className="app-container py-4 vh-100">
                <Navbar key={"lg"} expand={"sm"} className="top-nav mb-3">
                    <Container fluid>
                        <Navbar.Brand href="#"><h1 className="brand-color">Expense Tracker</h1></Navbar.Brand>
                        <Navbar.Toggle className="navbar-toggle" aria-controls={`offcanvasNavbar-expand-${"lg"}`}/>
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${"lg"}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${"lg"}`}
                            placement="end"
                            className="offcanvas-nav"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title className="brand-color" id={`offcanvasNavbarLabel-expand-${"lg"}`}>
                                    Expense Tracker
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className=" justify-content-end flex-grow-1 pe-3">
                                    <Nav.Link className="brand-color" onClick={() => setShowAddCategoryModal(true)}>Add
                                        Expense
                                        Category</Nav.Link>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
                <div className="pt-2 pb-2">
                    <h1 className="dashboard-label1 fw-normal text-white fs-3 pb-1">Categories</h1>
                </div>
                <div className="category-container pb-5">
                    {category.map(category => {
                        const amount = getCategoryTransactions(category.id).reduce((total, expense) => total + expense.amount, 0);
                        return (
                            <CategoryCard key={category.id}
                                          Cid={category.id}
                                          name={category.name}
                                          amount={amount}
                                          max={category.max}
                                          onAddTransactionClick={() => openAddTransactionModal(category.id)}
                                          onTransactionHistoryClick={() => openTransactionHistoryModal(category.id)}
                            />
                        )
                    })}
                </div>
                <div className="recent-transaction-section-title">
                    <h1 className="dashboard-label2 fw-normal fs-3 text-white mt-2 pb-1">Recent Transactions</h1>
                </div>
                <div className="recent-transactions-section pt-2 pb-5">
                    {transactionHistory.sort((a, b) => a.time < b.time ? 1 : -1).slice(0, 5).map(transaction => {
                        const amount = getTransactionHistoryTransactions(transaction.id).reduce((total, expense) => total + expense.amount, 0);
                        return (
                            <RecentTransaction key={transaction.id}
                                               Cid={transaction.categoryId}
                                               transactionType={transaction.transactionType}
                                               time={transaction.time}
                                               date={transaction.date}
                                               amount={amount}
                                               onTransactionHistoryClick={() => openTransactionHistoryModal(category.id)}
                            />
                        )
                    })}
                </div>
            </Container>
            <AddCategory show={showAddCategoryModal} handleClose={() => setShowAddCategoryModal(false)}/>
            <AddTransaction show={showAddTransactionModal} handleClose={() => setShowAddTransactionModal(false)}
                            defaultCategoryId={addTransactionModalCategoryId}
            />
            <TransactionHistory show={showTransactionHistoryModal}
                                handleClose={() => setShowTransactionHistoryModal(false)}
                                defaultCategoryId={TransactionHistoryModalCategoryId}
            />

        </>
    );
}

export default App;
