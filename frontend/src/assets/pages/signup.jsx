import { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    username: "",
    other: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const instance = axios.create({
        withCredentials: true,
        baseURL: "http://localhost:5000",
      });

      await instance
        .post("api/users/signup", {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        })
        .then((response) => {
          if (response.status !== 200) {
            return setFormErrors(response.data);
          }
          setModalOpen(true);
        });
    } catch (error) {
      setFormErrors(error.response.data.errMsg);
      //   console.error("Login failed!", error.response.data.errMsg);
    }
  };
  //   console.log(formErrors);

  return (
    <>
      <div className="container mx-auto mt-5">
        <form
          className="bg-white shadow-md rounded p-4"
          onSubmit={handleSubmit}
        >
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              invalid={!!formErrors.email}
            />
            <span className="text-danger">{formErrors.email}</span>
          </FormGroup>
          <FormGroup>
            <Label for="username">User Name</Label>
            <Input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleInputChange}
              invalid={!!formErrors.username}
            />
            <span className="text-danger">{formErrors.username}</span>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              invalid={!!formErrors.password}
            />
            <span className="text-danger">{formErrors.password}</span>
          </FormGroup>

          {/* Other form fields similar to the above pattern */}

          <Button color="primary" className="w-100 mt-4" type="submit">
            Submit
          </Button>
        </form>

        <p className="text-center mt-4">
          <span className="text-gray-600">Already have an account? </span>
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>

        <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
          <ModalHeader>User registered successfully</ModalHeader>
          <ModalBody className="text-center">
            <Link to="/">
              <Button color="primary">Go to Login Page</Button>
            </Link>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
};

export default SignUp;
