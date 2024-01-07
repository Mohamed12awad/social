import { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import axios from "axios";
import SingleBlog from "../singleBlogCard";
import { useAuth } from "../../../AuthContext";

const MyBlogs = () => {
  const { token } = useAuth();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/blogs", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        setBlogs(res.data);
      });
  }, [token]);
  //   console.log(blogs);
  // console.log(blogs.map((i) => i));

  return (
    <Container className="mt-5">
      <Row>
        {blogs.length === 0 && (
          <div className="text-capitalize fs-3 text-center my-5">
            <p>you do not have any blogs yet, do make us wait for you.</p>
          </div>
        )}
        {blogs &&
          blogs.map((i, x) => (
            <Col md="6" key={x}>
              <SingleBlog
                isVisable
                link={`https://picsum.photos/1200/400?random=${x}`}
                title={i.title}
                body={i.content}
                id={i._id}
              />
            </Col>
          ))}
      </Row>
    </Container>
  );
};
export default MyBlogs;
