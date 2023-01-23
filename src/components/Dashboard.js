import React from 'react';
import {useCategories} from "../context/CategoryContexts";
import {Container} from "react-bootstrap";
import CategoryCard from "./CategoryCard";
import RecentTransaction from "./RecentTransaction";


const Dashboard = () => {
    const {category, transactionHistory, getCategoryTransactions, getTransactionHistoryTransactions} = useCategories();

    return (
        <>
            <Container className="app-container py-4 vh-100">
                <div className="pt-2 pb-2">
                    <h1 className="dashboard-label1 fw-normal text-white fs-3 pb-1">Categories</h1>
                </div>
                <div className="category-container pb-5">
                    {category.map(category => {
                        const amount = getCategoryTransactions(category.name).reduce((total, expense) => total + expense.amount, 0);
                        return (
                            <CategoryCard key={category.id}
                                          Cid={category.id}
                                          name={category.name}
                                          amount={amount}
                                          max={category.max}
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
                            />
                        )
                    })}
                </div>
            </Container>
        </>
    );
};

export default Dashboard;