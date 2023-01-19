import React from 'react';
import {Button, Card, ProgressBar, Stack} from "react-bootstrap";
import {currencyFormatter} from "../utils";

const CategoryCard = ({name, amount, max, onAddTransactionClick, onTransactionHistoryClick}) => {

    function dynamicVariant(amount, max) {
        let ratio = (amount / max) * 100
        if (ratio < 50) return "info";
        if (ratio > 50 && ratio < 90) return "warning";
        return "danger";
    }

    return (
        <Card className="category-card" style={{
            minWidth: "415px"
        }}>
            <Card.Body>
                <Card.Title className="pb-4">
                    <Stack direction="horizontal" gap="2" className="fw-normal">
                        <div className="me-auto">{name}</div>
                        <div className="d-flex align-items-baseline">
                            {currencyFormatter.format(amount)}
                            <span className="text-muted fs-6 ps-1">/ {currencyFormatter.format(max)}</span>
                        </div>
                    </Stack>
                </Card.Title>
                <ProgressBar className="category-progress-bar rounded-pill" variant={dynamicVariant(amount, max)}
                             now={amount} min={0} max={max} label={`${Math.round((amount / max) * 100).toFixed(0)}%`}/>
                <Stack className="pt-4" direction="horizontal" gap="2">
                    <Button className="expense-btn ms-auto" style={{
                        background: "chocolate",
                        borderColor: "#fff"
                    }} onClick={onAddTransactionClick}>add Transaction</Button>
                    <Button className="show-expense-btn" style={{
                        background: "greenyellow",
                        borderColor: "#fff"
                    }} onClick={onTransactionHistoryClick}>Transaction History</Button>
                </Stack>
            </Card.Body>
        </Card>
    );
};

export default CategoryCard;