import React from 'react';
import {Button, Card, ProgressBar, Stack} from "react-bootstrap";
import {currencyFormatter} from "../utils";
import {FaMoneyCheckAlt, FaTrash} from "react-icons/fa";
import {useCategories} from "../context/CategoryContexts";
import "../styles/CategoryCard.css"

const CategoryCard = ({Cid, name, amount, max, onAddTransactionClick, onTransactionHistoryClick}) => {
    const {deleteCategory} = useCategories();

    function dynamicVariant(amount, max) {
        let ratio = (amount / max) * 100
        if (ratio < 50) return "info";
        if (ratio > 50 && ratio < 90) return "warning";
        return "danger";
    }

    return (
        <Card className="category-card" style={{
            boxShadow: ".225rem .225rem .45rem rgba(0,0,0,.5)"
        }}>
            <Card.Body className="category-card-body">
                <Card.Title className="pb-4">
                    <Stack direction="vertical" gap="2" className="fw-normal">
                        <div className="d-flex">
                            <p className="me-auto"><FaMoneyCheckAlt className="category-icon"/> {name}</p>
                            <Button className="ms-2 delete-btn" onClick={() => {
                                deleteCategory({id: Cid})
                            }}><FaTrash className="trash-icon"/></Button>
                        </div>
                        <div className="d-flex align-items-baseline">
                            {currencyFormatter.format(amount)}
                            <span className="text-muted fs-6 ps-1">/ {currencyFormatter.format(max)}</span>
                        </div>
                    </Stack>
                </Card.Title>
                <ProgressBar className="category-progress-bar rounded-pill h-25" variant={dynamicVariant(amount, max)}
                             now={amount} min={0} max={max} label={`${Math.round((amount / max) * 100).toFixed(0)}%`}
                />
                <Stack className="pt-4" direction="horizontal" gap="2">
                    <Button className="expense-btn ms-auto" onClick={onAddTransactionClick}>add Transaction</Button>
                    <Button className="show-expense-btn" onClick={onTransactionHistoryClick}>Transaction
                        History</Button>
                </Stack>
            </Card.Body>
        </Card>
    );
};

export default CategoryCard;