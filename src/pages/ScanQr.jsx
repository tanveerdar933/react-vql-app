import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import VQR from "../components/VQR";
import { useDataContext } from "../contexts/dataContext";

const ScanQr = () => {
  const { formData, setFormData } = useDataContext();
  const navigate = useNavigate();

  const onInit = (data) => {
    // console.log("onInit", data.detail);
  };

  const onScan = (data) => {
    const result = JSON.parse(data.detail.result).qrRes.split("$");
    setFormData({
      firstName: result[0],
      lastName: result[1]
    })
  };

  useEffect(() => {
    if (formData.firstName !== "") {
      console.clear();
      navigate("form");
    }
  }, [formData])

  return (
    <Container fluid>
      <Container>
        <Row style={{ height: "80vh" }} className="justify-content-center align-items-center">
          <Col xs={5}>
            <Card>
              <Card.Body className="d-flex flex-column align-items-center">
                <h1 className="mb-4">Scan it with Identifi me App</h1>
                <VQR
                  queryId="6565c38081738c00554d0334"
                  mode="dynamic"
                  qrcodeOwner="shareledger129j2ru5mvj9v2c7af9ym8keu844ca27myasuue"
                  app="Identifi Me"
                  metadata="{'correlationId':'123456'}"
                  onInit={onInit}
                  onScan={onScan}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default ScanQr