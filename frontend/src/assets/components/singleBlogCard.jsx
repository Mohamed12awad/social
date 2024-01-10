/* eslint-disable react/prop-types */
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import axios from "axios";

const SingleBlog = ({ id, link, title, body, author, isVisable = false }) => {
  const { token } = useAuth();

  const handleDelete = async (e) => {
    await axios.delete(`http://localhost:5000/api/blogs/${e}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
  };
  return (
    <Link to={`/blogs/${id}`} style={{ textDecoration: "none" }}>
      <Card className="w-100 my-3 shadow text-capitalize">
        <img
          className="object-fit-cover rounded-top"
          alt="Sample"
          src={link}
          height={200}
        />
        <CardBody>
          <CardTitle tag="h5">{title}</CardTitle>
          <CardText className="text-truncate">{body}</CardText>
          <hr />
          <CardText className="fw-semibold text-truncate text-capitalize">
            created by : {author}
          </CardText>
          {isVisable && (
            <div className="d-flex justify-content-between">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log("i");
                }}
                color="info"
                className="w-25 z-55"
              >
                Edit
              </Button>
              <Button
                color="danger"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDelete(id);
                }}
              >
                Delete
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    </Link>
  );
};

export default SingleBlog;
