import { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const SignIn = () => {
  // const [token, setToken] = useState(null);

  const navigate = useNavigate();

  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const instance = axios.create({
        withCredentials: true, // Send cookies with requests
        baseURL: "http://localhost:5000", // Your backend API URL
      });

      await instance
        .post("api/users/login", {
          email: formData.email,
          password: formData.password,
        })
        .then((response) => {
          if (response.status === 200) {
            signIn(response.data.user.token); // Update token in context
            navigate("/");
          }
        });
    } catch (error) {
      console.error("Login failed!", error.response.data);
    }
  };

  return (
    <>
      <Container className="w-50 mt-5">
        <h2>Sign In</h2>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </FormGroup>
          <Button color="primary" type="submit">
            Sign In
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default SignIn;
