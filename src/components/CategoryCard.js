import React from 'react';
import {Button, Card, ProgressBar, Stack} from "react-bootstrap";
import {currencyFormatter} from "../utils";

const CategoryCard = ({name, amount, max}) => {

    function dynamicVariant(amount, max) {
        let ratio = (amount / max) * 100
        if (ratio < 50) return "info";
        if (ratio > 50 && ratio < 90) return "warning";
        return "danger";
    }

    return (
        <Card className="category-card">
            <Card.Body>
                <Card.Title className="pb-3">
                    <Stack direction="horizontal" gap="2" className="fw-normal">
                        <div className="me-auto">{name}</div>
                        <div className="d-flex align-items-baseline">
                            {currencyFormatter.format(amount)}
                            <span className="text-muted fs-6 ps-1">/ {currencyFormatter.format(max)}</span>
                        </div>
                    </Stack>
                </Card.Title>
                <ProgressBar className="category-progress-bar rounded-pill" variant={dynamicVariant(amount, max)}
                             now={amount} min={0} max={max} label={`${(amount / max) * 100}%`}/>
                <Stack className="pt-3" direction="horizontal" gap="2">
                    <Button className="expense-btn ms-auto" style={{
                        background: "chocolate",
                        borderColor: "#fff"
                    }}>Add Expense</Button>
                    <Button className="show-expense-btn" style={{
                        background: "greenyellow",
                        borderColor: "#fff"
                    }}>Show Expenses</Button>
                </Stack>
            </Card.Body>
        </Card>
    );
};

export default CategoryCard;