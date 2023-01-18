import {Button, Container, Stack} from "react-bootstrap";

function App() {
  return (
      <Container>
          <Stack direction="horizontal" gap="2">
              <h1>Expense Tracker</h1>
              <Button className="btn" variant="primary">Add Category</Button>
              <Button className="btn" variant="primary">Add Expense</Button>
          </Stack>
      </Container>
  );
}

export default App;
