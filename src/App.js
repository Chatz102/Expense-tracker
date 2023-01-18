import {Button, Container, Stack} from "react-bootstrap";
import "./App.css";
import CategoryCard from "./components/CategoryCard";

function App() {
    return (
        <Container className="my-4">
            <Stack direction="horizontal" gap="2" className="mb-4">
                <h1 className="me-auto">Expense Tracker</h1>
                <Button className="category-btn" variant="primary">Add Category</Button>
                <Button className="expense-btn" variant="outline-primary">Add Expense</Button>
            </Stack>
            <div className="category-container">
                <CategoryCard name="Food" amount={67000} max={100000}/>
            </div>
        </Container>
    );
}

export default App;
