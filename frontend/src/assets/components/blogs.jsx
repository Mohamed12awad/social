import { Col, Container, Row } from "reactstrap";
import SingleBlog from "../components/singleBlogCard";
import { useEffect, useState } from "react";
import axios from "axios";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/blogs/all").then((res) => {
      setBlogs(res.data);
    });
  }, []);
  // console.log(blogs.map((i) => i));
  // console.log(blogs);

  return (
    <Container className="mt-5">
      <h2 className="text-center text-capitalize fw-bold my-4">Explore Now</h2>
      <Row>
        {blogs &&
          blogs.map((i, x) => (
            <Col md="6" key={x}>
              <SingleBlog
                link={`https://picsum.photos/1200/400?random=${x}`}
                title={i.title}
                body={i.content}
                id={i._id}
                author={i.author.username}
              />
            </Col>
          ))}
      </Row>
    </Container>
  );
};
export default Blogs;
