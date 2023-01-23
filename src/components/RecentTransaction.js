import React from 'react';
import {Card, Stack} from "react-bootstrap";
import {useCategories} from "../context/CategoryContexts";
import "../styles/RecentTransaction.css"
import {currencyFormatter} from "../utils";

const RecentTransaction = ({Cname, transactionType, time, date, amount, onTransactionHistoryClick}) => {
    const {category} = useCategories();
    let transaction_type;
    let divColor;
    let textColor;
    let sign;

    if (transactionType === "1") {
        transaction_type = "Expense";
        divColor = "#EDAA25"
        textColor = "#fff"
        sign = "-";
    } else if (transactionType === "2") {
        transaction_type = "Deposit";
        divColor = "#0A7373";
        textColor = "#fff"
        sign = "+";
    } else if (transactionType === "3") {
        transaction_type = "Withdrawl";
        divColor = "#C43302";
        textColor = "#fff"
        sign = "-";
    }

    const divStyle = {
        backgroundColor: divColor,
        color: textColor,
        border: "1px solid " + divColor
    };


    return (
        <Card onClick={onTransactionHistoryClick} className="recent-Transaction-Card mt-3"
              style={divStyle}
        >
            <Card.Body className="Recent-card-body d-flex">
                <Stack className="me-auto" direction="horizontal" gap="2">
                    <div>
                        <h6>{transaction_type}</h6>
                        <p className="recent-category-title">
                            {category.map(category => {
                                let name;
                                if (category.name === Cname) {
                                    name = category.name;
                                }
                                return name;
                            })}
                        </p>
                    </div>
                </Stack>
                <div>
                    <div className="d-flex align-items-center pb-2">{date} {time}</div>
                    <div>{sign}{currencyFormatter.format(amount)}</div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default RecentTransaction;