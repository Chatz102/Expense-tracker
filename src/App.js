import React, {useState} from 'react';
import "./App.css";
import {Button, Container, Stack} from "react-bootstrap";
import CategoryCard from "./components/CategoryCard";
import AddCategory from "./components/AddCategory";
import {useCategories} from "./context/CategoryContexts";
import AddTransaction from "./components/AddTransaction";
import TransactionHistory from "./components/TransactionHistory";

function App() {
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);
    const [showTransactionHistoryModal, setShowTransactionHistoryModal] = useState(false);
    const [addTransactionModalCategoryId, setAddTransactionModelCategoryId] = useState();
    const [TransactionHistoryModalCategoryId, setTransactionHistoryModelCategoryId] = useState();
    const {category, getCategoryTransactions} = useCategories();

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
            <Container fluid className="app-container py-4 vh-100">
                <Stack direction="horizontal" gap="2" className="mb-4">
                    <h1 className="me-auto">Expense Tracker</h1>
                    <Button className="category-btn" style={{
                        background: "chocolate",
                        borderColor: "chocolate"
                    }} onClick={() => setShowAddCategoryModal(true)}>Add Category</Button>
                </Stack>
                <div className="category-container pb-5">
                    {category.map(category => {
                        const amount = getCategoryTransactions(category.id).reduce((total, expense) => total + expense.amount, 0);
                        return (
                            <CategoryCard key={category.id}
                                          name={category.name}
                                          amount={amount}
                                          max={category.max}
                                          onAddTransactionClick={() => openAddTransactionModal(category.id)}
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
