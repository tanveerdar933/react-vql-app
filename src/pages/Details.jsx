import { Container, Row, Col, Card } from "react-bootstrap";
import UserForm from "../components/Form";

const Details = () => {
  return (
    <Container fluid>
      <Container>
        <Row style={{ height: "80vh" }} className="justify-content-center align-items-center">
          <Col xs={5}>
            <Card>
              <Card.Body>
                <h2 className="mb-3">Details Form</h2>
                <UserForm />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default Details