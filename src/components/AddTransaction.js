import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useRef} from "react";
import {useCategories} from "../context/CategoryContexts";
import "../styles/AddTransaction.css";
import {useNavigate} from "react-router-dom";

export default function AddTransaction() {
    const descriptionRef = useRef();
    const typeRef = useRef();
    const amountRef = useRef();
    const categoryNameRef = useRef()
    const {addTransaction, category, defaultTransactionCategory} = useCategories();
    let navigate = useNavigate();
    function handleSubmit(e) {
        e.preventDefault();
        let dateObj = new Date()
        let currentDate = dateObj.getDate() + "/" + (dateObj.getMonth() + 1) + "/" + dateObj.getFullYear() + "";
        let currentTime = dateObj.getHours() + ":" + (dateObj.getMinutes() + 1) + ":" + dateObj.getSeconds() + "";

        addTransaction({
            transactionType: typeRef.current.value,
            description: descriptionRef.current.value,
            amount: parseFloat(amountRef.current.value),
            categoryName: categoryNameRef.current.value,
            date: currentDate,
            time: currentTime
        })
        navigate("/");
    }
    return (
        <Container className="add-transaction-modal">
            <div className="d-flex justify-content-center pb-5 pt-2"><h1 className="add-transaction-title">New
                Transaction</h1></div>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col lg={6} md={6} sm={12}>
                        <Form.Group className="pt-3 pb-3" controlId="type">
                            <Form.Label className="add-transaction-label">Transaction type</Form.Label>
                            <Form.Select className="shadow-sm" ref={typeRef} defaultValue={0}>
                                <option value={0}>None</option>
                                <option key={1} value={1}>Expense</option>
                                <option key={2} value={2}>Deposit</option>
                                <option key={3} value={3}>Withdrawal</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                        <Form.Group controlId="description" className="pt-3">
                            <Form.Label className="add-transaction-label">Description</Form.Label>
                            <Form.Control className="shadow-sm" ref={descriptionRef} type="text" required/>
                        </Form.Group>
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                        <Form.Group className="pt-3 pb-3" controlId="amount">
                            <Form.Label className="add-transaction-label">Amount</Form.Label>
                            <Form.Control className="shadow-sm" ref={amountRef} type="number" required min={0}
                                          step={0.01}/>
                        </Form.Group>
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                        <Form.Group className="pt-3 pb-3" controlId="categorySelection">
                            <Form.Label className="add-transaction-label">Category</Form.Label>
                            <Form.Select className="shadow-sm" ref={categoryNameRef} defaultValue={"1"}>
                                <option id={defaultTransactionCategory} value="1">Choose</option>
                                {category.map(category => (
                                    <option key={category.id} value={category.name}>{category.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <div className="d-flex justify-content-center">
                    <Button className="shadow-lg add-transaction-btn" type="submit" onSubmit={handleSubmit}>Add
                        Transaction</Button>
                </div>
            </Form>
        </Container>
    )

}