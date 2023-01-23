import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useRef} from "react";
import {useCategories} from "../context/CategoryContexts";
import "../styles/AddCategory.css";
import {useNavigate} from "react-router-dom";

export default function AddCategory() {
    const nameRef = useRef();
    const maxRef = useRef();
    const {addCategory} = useCategories();
    let navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        addCategory({
            name: nameRef.current.value,
            max: parseFloat(maxRef.current.value)
        })
        navigate("/");
    }

    return (
        <Container className="add-category-modal">
            <div className="d-flex justify-content-center pt-2">
                <h1 className="add-category-title">New Category</h1>
            </div>
            <div className="add-category-form">
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col lg={12} md={12}>
                            <Form.Group controlId="name">
                                <Form.Label className="add-category-label">Name</Form.Label>
                                <Form.Control className="shadow-sm" ref={nameRef} type="text" required/>
                            </Form.Group>
                        </Col>
                        <Col lg={12} md={12}>
                            <Form.Group className="pt-3 pb-5" controlId="max">
                                <Form.Label className="add-category-label">Maximum Spending Amount</Form.Label>
                                <Form.Control className="shadow-sm" ref={maxRef} type="number" required min={0}
                                              step={0.01}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-center">
                        <Button className="shadow-sm add-category-btn" type="submit" onSubmit={handleSubmit}>Add
                            Category</Button>
                    </div>
                </Form>
            </div>
        </Container>
    )
}