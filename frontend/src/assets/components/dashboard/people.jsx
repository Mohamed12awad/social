import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
import axios from "axios";
import { useAuth } from "../../../AuthContext";

const UserList = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);

  // Fetch user data when the component mounts
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users", {
        headers: {
          Authorization: token,
        },
      });
      setUsers(response.data); // Update the users state with fetched data
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const addFriend = async (userId) => {
    const instance = axios.create({
      withCredentials: true,
      baseURL: "http://localhost:5000",
      Authorization: `${token}`,
    });

    await instance.post(`api/friends/send/${userId}`).then((response) => {
      if (response.status === 200) {
        //   console.log("driend request sent");
        console.log(`Added user with ID ${userId} as a friend.`);
      }
    });
  };

  return (
    <Container>
      <h2 className="my-4">User List</h2>
      <Row>
        {users &&
          users.map((user) => (
            <Col sm="4" key={user._id}>
              <Card className="my-3">
                <CardBody>
                  <CardTitle className="text-capitalize" tag="h5">
                    {user.username}
                  </CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">
                    {user.email}
                  </CardSubtitle>
                  {/* <p>Username: {user.username}</p> */}
                  {/* <p>Phone: {user.phone}</p> */}
                  <Button color="primary" onClick={() => addFriend(user._id)}>
                    Add Friend
                  </Button>
                </CardBody>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default UserList;
