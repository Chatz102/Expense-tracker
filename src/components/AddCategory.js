import {Button, Form, Modal} from "react-bootstrap";
import {useRef} from "react";
import {useCategories} from "../context/CategoryContexts";

export default function AddCategory({show, handleClose}) {
    const nameRef = useRef();
    const maxRef = useRef();
    const {addCategory} = useCategories();

    function handleSubmit(e) {
        e.preventDefault();
        addCategory({
            name: nameRef.current.value,
            max: parseFloat(maxRef.current.value)
        })
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose} backdrop="static">
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control ref={nameRef} type="text" required/>
                    </Form.Group>
                    <Form.Group className="pt-3 pb-5" controlId="max">
                        <Form.Label>Maximum Spending Amount</Form.Label>
                        <Form.Control ref={maxRef} type="number" required min={0} step={0.01}/>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button type="submit" variant="outline-success">Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )

}