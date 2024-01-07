import { Col, Row, Container } from "reactstrap";
import {
  FaEnvelope,
  FaFacebook,
  FaGem,
  FaGithub,
  FaGoogle,
  FaHome,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaPrint,
  FaTwitter,
} from "react-icons/fa";

export default function Footer() {
  return (
    <div className="text-center text-lg-start text-muted mt-5">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href="" className="me-4 text-reset">
            <FaFacebook />
          </a>
          <a href="" className="me-4 text-reset">
            <FaTwitter />
          </a>
          <a href="" className="me-4 text-reset">
            <FaGoogle />
          </a>
          <a href="" className="me-4 text-reset">
            <FaInstagram />
          </a>
          <a href="" className="me-4 text-reset">
            <FaLinkedin />
          </a>
          <a href="" className="me-4 text-reset">
            <FaGithub />
          </a>
        </div>
      </section>

      <section className="">
        <Container className="text-center text-md-start mt-5">
          <Row className="mt-3">
            <Col md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <FaGem />
                Company name
              </h6>
              <p>
                Here you can use rows and columns to organize your footer
                content. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit.
              </p>
            </Col>

            <Col md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Products</h6>
              <p>
                <a href="#!" className="text-reset">
                  Angular
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  React
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Vue
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Laravel
                </a>
              </p>
            </Col>

            <Col md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <a href="#!" className="text-reset">
                  Pricing
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Settings
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Orders
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Help
                </a>
              </p>
            </Col>

            <Col md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <FaHome className="me-2" />
                New York, NY 10012, US
              </p>
              <p>
                <FaEnvelope className="me-2" />
                info@example.com
              </p>
              <p>
                <FaPhone className="me-2" />
                <a
                  href="tel:+201287131456"
                  className="text-decoration-none text-muted"
                >
                  +20 1287131456
                </a>
              </p>
              <p>
                <FaPrint className="me-2" />
                <a
                  href="tel:+201068874897"
                  className="text-decoration-none text-muted"
                >
                  +20 1068874897
                </a>
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © {new Date().getFullYear()} Copyright:
        <a className="text-reset fw-bold ms-1" href="">
          M-Awad
        </a>
      </div>
    </div>
  );
}