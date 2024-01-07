import { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Container } from "reactstrap";
import axios from "axios";
import { useAuth } from "../../../AuthContext";

const CreateBlog = ({ id }) => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
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
      const response = await axios.post(
        "http://localhost:5000/api/blogs",
        {
          title: formData.title,
          content: formData.content,
          author: id,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.status === 200) {
        setFormData({
          ...formData,
          title: "",
          content: "",
        });
      }
      //   console.log("Blog created:", response.data);
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <Container>
      <h2 className="my-4">Create a New Blog</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            type="text"
            name="title"
            id="title"
            placeholder="Enter blog title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="content">Content</Label>
          <Input
            type="textarea"
            name="content"
            id="content"
            placeholder="Enter blog content"
            value={formData.content}
            onChange={handleInputChange}
          />
        </FormGroup>
        <Button color="primary">Create Blog</Button>
      </Form>
    </Container>
  );
};

export default CreateBlog;
