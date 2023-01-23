import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {useCategories} from "../context/CategoryContexts";
import {currencyFormatter} from "../utils";
import "../styles/TransactionHistory.css";
import {FaTrash} from "react-icons/fa";

export default function TransactionHistory() {
    const {transactionHistory, category, deleteTransaction} = useCategories();

    return (
        <Container className="transaction-history-modal">
            {transactionHistory < 1 ?
                <div className="d-flex vh-100 justify-content-center align-items-center text-white">
                    <p className="transactionHistory-title fs-3">Nothing to show here</p>
                </div>
                : category.map(transaction => {
                    let category_name = transaction.name;
                    return (
                        <div key={transaction.id} className="pb-3">
                            <div className="d-flex pt-3 w-100">
                                <h1 className="transactionHistory-title fs-3 me-auto">
                                    {transaction.name}
                                </h1>
                            </div>
                            <div>
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
                                    if (transaction.categoryName === category_name) {
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
                                            </Card>)
                                    }
                                })}
                            </div>
                        </div>
                    )
                })}
        </Container>
    )

}