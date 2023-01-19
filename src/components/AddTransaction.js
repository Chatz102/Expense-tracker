import {Button, Form, Modal} from "react-bootstrap";
import {useRef} from "react";
import {useCategories} from "../context/CategoryContexts";

export default function AddTransaction({show, handleClose, defaultCategoryId}) {
    const descriptionRef = useRef();
    const typeRef = useRef();
    const amountRef = useRef();
    const categoryIdRef = useRef()
    const {addTransaction, category, defaultExpenseCategory} = useCategories();

    function handleSubmit(e) {
        e.preventDefault();
        let dateObj = new Date()
        let currentDate = dateObj.getDate() + "/" + (dateObj.getMonth() + 1) + "/" + dateObj.getFullYear() + "";

        addTransaction({
            transactionType: typeRef.current.value,
            description: descriptionRef.current.value,
            amount: parseFloat(amountRef.current.value),
            categoryId: categoryIdRef.current.value,
            date: currentDate
        })
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose} backdrop="static">
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="pt-3 pb-3" controlId="type">
                        <Form.Label>Transaction type</Form.Label>
                        <Form.Select ref={typeRef} defaultValue={0}>
                            <option value={0}>None</option>
                            <option key={1} value={1}>Expense</option>
                            <option key={2} value={2}>Deposit</option>
                            <option key={3} value={3}>Withdrawal</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control ref={descriptionRef} type="text" required/>
                    </Form.Group>
                    <Form.Group className="pt-3 pb-3" controlId="amount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control ref={amountRef} type="number" required min={0} step={0.01}/>
                    </Form.Group>
                    <Form.Group className="pt-3 pb-5" controlId="categorySelection">
                        <Form.Label>Category</Form.Label>
                        <Form.Select ref={categoryIdRef} defaultValue={defaultCategoryId}>
                            <option id={defaultExpenseCategory}>None</option>
                            {category.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button type="submit" variant="outline-success">Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )

}