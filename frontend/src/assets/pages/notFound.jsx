import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="error-page my-5">
      <Container>
        <Row className="justify-content-center">
          <Col md="8" className="text-center">
            <h1 className="error-heading">404</h1>
            <p className="error-text">Oops! Page not found</p>
            <p className="error-description">
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </p>
            <Link to="/" className="btn btn-primary">
              Go to Home
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NotFound;
