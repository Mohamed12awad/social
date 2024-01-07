import { useEffect, useState } from "react";
import { FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";
import { useAuth } from "./../../../AuthContext";

function EditUser() {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
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
  const fetchData = async () => {
    try {
      const instance = axios.create({
        withCredentials: true,
        baseURL: "http://localhost:5000",
      });

      await instance.get("api/users/singleuser").then((response) => {
        if (response.status === 200) {
          return setFormData(response.data);
        }
      });
    } catch (error) {
      console.error("Login failed!", error.response.data.errMsg);
    }
  };
  // console.log(formData);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const instance = axios.create({
        withCredentials: true,
        baseURL: "http://localhost:5000",
        Authorization: `${token}`,
      });

      await instance
        .put(`api/users/${formData._id}`, {
          username: formData.username,
          email: formData.email,
        })
        .then((response) => {
          if (response.status !== 200) {
            return setFormErrors(response.data);
          }
        });
    } catch (error) {
      setFormErrors(error.response.data.errMsg);
      //   console.error("Login failed!", error.response.data.errMsg);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
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

          <Button color="primary" className="w-100 mt-4" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
