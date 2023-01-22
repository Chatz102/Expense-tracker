import {Button, Card, Col, Modal, Row} from "react-bootstrap";
import {useCategories} from "../context/CategoryContexts";
import {currencyFormatter} from "../utils";
import "../styles/TransactionHistory.css";
import {FaTrash} from "react-icons/fa";

export default function TransactionHistory({show, handleClose, defaultCategoryId}) {
    const {category, transactions, transactionHistory, deleteTransaction} = useCategories();

    return (
        <Modal className="transaction-history-modal" show={show} onHide={handleClose} backdrop="static"
               scrollable="true">
            <Modal.Header closeButton>
                <Modal.Title className="d-flex w-100">
                    <div className="me-auto">
                        {category.map(category => {
                            let name;
                            if (category.id === defaultCategoryId) {
                                name = category.name;
                            }
                            return name;
                        })}
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
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

                    if (transaction.categoryId === defaultCategoryId) {
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
                        )
                    }
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

                    if (transaction.categoryId === defaultCategoryId && transaction.transactionType !== "1") {
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
            </Modal.Body>
        </Modal>
    )

}