import { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../AuthContext";
// import Box from "./box";

const UserProfile = () => {
  const { token } = useAuth();
  const { id } = useParams();

  const [blog, setBlog] = useState({});
  const [author, setAuthor] = useState({});
  const [authorBlogs, setAuthorBlogs] = useState([]);
  const [isFriendAdded, setIsFriendAdded] = useState(false);

  const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:5000",
    Authorization: `${token}`,
  });

  const fetchBlog = async () => {
    try {
      await instance.get(`/api/blogs/${id}`).then((res) => {
        // console.log(res.data);
        setBlog(res.data.blog);
        setAuthor(res.data.blog.author);
        setAuthorBlogs(res.data.otherBlogs);
      });
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };
  useEffect(() => {
    fetchBlog();
  }, [id]);

  const handleAddFriend = async () => {
    try {
      const friendId = author._id;
      await instance.post(`http://localhost:5000/api/friends/send/${friendId}`);
      setIsFriendAdded(true);
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  return (
    <Container className="my-4">
      <Row>
        <Col md="8">
          <Card className="mb-4">
            <img
              className="object-fit-cover rounded-top"
              alt="Sample"
              src="https://picsum.photos/1200/400"
              height={200}
            />
            <CardBody>
              <h1>{blog.title}</h1>
              <p>{blog.content}</p>
            </CardBody>
          </Card>
          {/* <Box /> */}
        </Col>
        <Col md="4">
          <Card className="mb-4">
            <CardBody>
              <h4>Author Details</h4>
              <p>Name: {author?.username}</p>
              <p>Email: {author?.email}</p>
              {/* <p>Location: {author?.location}</p> */}
              <Button
                color="primary"
                onClick={handleAddFriend}
                disabled={isFriendAdded}
              >
                {!isFriendAdded ? "Add Friend" : "Friend Added"}
              </Button>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <h4>Author&#39;s Posts</h4>

              {/* {authorBlogs} */}
              {authorBlogs &&
                authorBlogs.map((i) => (
                  <Link
                    to={`/blogs/${i._id}`}
                    style={{ textDecoration: "none" }}
                    key={i._id}
                  >
                    <div className="p-3">
                      <span className="h6 text-truncate d-block">
                        {i.title}
                      </span>
                      <p className="text-muted text-truncate">{i.content}</p>
                    </div>
                  </Link>
                ))}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
