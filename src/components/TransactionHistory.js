import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {useCategories} from "../context/CategoryContexts";
import {currencyFormatter} from "../utils";
import "../styles/TransactionHistory.css";
import {FaTrash} from "react-icons/fa";
import {useState} from "react";

export default function TransactionHistory() {
    const {transactions, transactionHistory, deleteTransaction} = useCategories();
    const [changeCategory, setChangeCategory] = useState();

    return (
        <Container className="transaction-history-modal">
            {transactions.map(transaction => {
                let transactionType;
                if (transaction.transactionType === "1") {
                    transactionType = "Expense"
                }
                if (transaction.transactionType === "2") {
                    transactionType = "Deposit"
                }
                if (transaction.transactionType === "3") {
                    transactionType = "WithDrawl"
                }
                setChangeCategory(transaction.categoryName);

                return (
                    <>
                        <div className="d-flex w-100">
                            <h1 className="me-auto">
                                {transaction.categoryName}
                            </h1>
                        </div>
                        <Card key={transaction.id} className="transaction-history-card m-2">
                            <Card.Body>
                                <Row>
                                    <Col lg={6} className="transactionId">
                                        <h6>Trans Id</h6>
                                        <p className="text-muted">{transaction.id}</p>
                                    </Col>
                                    <Col lg={6} className="transactionDescription">
                                        <h6>Description</h6>
                                        <p className="text-muted">{transaction.description}</p>
                                    </Col>
                                    <Col lg={6} className="transactionType">
                                        <h6>Transaction type</h6>
                                        <p className="text-muted">{transactionType}</p>
                                    </Col>
                                    <Col lg={6} className="dateCreated">
                                        <h6>Date</h6>
                                        <p className="text-muted">{transaction.date}</p>
                                    </Col>
                                    <Col lg={6} className="transactionAmount">
                                        <h6>Amount</h6>
                                        <p className="text-muted">{currencyFormatter.format(transaction.amount)}</p>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <div className="w-100 d-flex justify-content-end ps-3 pb-3 pe-2">
                                <Button className="delete-btn"
                                        onClick={() => deleteTransaction(transaction.id)}><FaTrash
                                    className="trash-icon"/></Button>
                            </div>
                        </Card>
                    </>
                )
            })}
            {transactionHistory.map(transaction => {
                let transactionType;
                if (transaction.transactionType === "1") {
                    transactionType = "Expense"
                }
                if (transaction.transactionType === "2") {
                    transactionType = "Deposit"
                }
                if (transaction.transactionType === "3") {
                    transactionType = "WithDrawl"
                }
                if (transaction.categoryName === changeCategory && transaction.transactionType !== "1") {
                    return (
                        <Card key={transaction.id} className="transaction-history-card m-2">
                            <Card.Body>
                                <Row>
                                    <Col lg={6} className="transactionId">
                                        <h6>Trans Id</h6>
                                        <p className="text-muted">{transaction.id}</p>
                                    </Col>
                                    <Col lg={6} className="transactionDescription">
                                        <h6>Description</h6>
                                        <p className="text-muted">{transaction.description}</p>
                                    </Col>
                                    <Col lg={6} className="transactionType">
                                        <h6>Transaction type</h6>
                                        <p className="text-muted">
                                            {transactionType}
                                        </p>
                                    </Col>
                                    <Col lg={6} className="dateCreated">
                                        <h6>Date</h6>
                                        <p className="text-muted">{transaction.date}</p>
                                    </Col>
                                    <Col lg={6} className="transactionAmount">
                                        <h6>Amount</h6>
                                        <p className="text-muted">{currencyFormatter.format(transaction.amount)}</p>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <div className=" d-flex w-100 justify-content-end pe-2 pb-2">
                                <Button className="delete-btn shadow-sm"
                                        onClick={() => deleteTransaction(transaction.id, transaction.transactionType)}><FaTrash
                                    className="trash-icon"/></Button>
                            </div>
                        </Card>
                    )
                }
            })}
        </Container>
    )

}