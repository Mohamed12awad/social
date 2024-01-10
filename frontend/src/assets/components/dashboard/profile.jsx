/* eslint-disable react/prop-types */
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
} from "reactstrap";
import { useAuth } from "../../../AuthContext";
// import { useState } from "react";

const ProfileCard = ({ user, refreshData }) => {
  const { token } = useAuth();
  // const [seed, setSeed] = useState(false);

  // const reset = () => {
  //   setSeed(!seed);
  // };
  const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:5000",
    Authorization: `${token}`,
  });

  const handleVerify = async (e) => {
    await instance.post(`/api/users/secondVerify/${e}`);
  };

  const handleRemove = async (e) => {
    await instance.delete(`/api/friends/remove/${e}`).then(() => {
      refreshData();
    });
  };
  const handleDelete = async (e) => {
    await instance.delete(`/api/friends/DeleteRequest/${e}`).then(() => {
      refreshData();
    });
  };

  const handleApprove = async (e) => {
    await instance.post(`/api/friends/accept/${e}`).then(() => {
      refreshData();
    });
  };
  // console.log(user);
  return (
    user && (
      <>
        <Card className="profile-card text-capitalize my-5">
          <CardHeader>
            <CardTitle>{user.username}</CardTitle>
            <CardSubtitle>{user.email}</CardSubtitle>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                <ListGroup>
                  <ListGroupItem>
                    Member since: {user.createdAt.split("T")[0]}
                  </ListGroupItem>
                  <ListGroupItem>
                    Last updated: {user.updatedAt.split("T")[0]}
                  </ListGroupItem>
                  <ListGroupItem>
                    Verified: {user.isVerified ? "Yes" : "No"}
                  </ListGroupItem>
                </ListGroup>
              </Col>
              <Col>
                <CardText tag="div">
                  <span className="h5">Friends</span>
                  <ul className="list-unstyled ">
                    {user.friends &&
                      user.friends.map((friendId, x) => (
                        <li
                          className="d-flex text-capitalize justify-content-between my-3"
                          key={x}
                        >
                          <span>
                            {x + 1} : {friendId.username}
                          </span>
                          <Button
                            className="text-capitalize"
                            color="danger"
                            onClick={() => handleRemove(friendId._id)}
                          >
                            Remove
                          </Button>
                        </li>
                      ))}
                  </ul>
                </CardText>
              </Col>
            </Row>
            {!user.isVerified && (
              <Button
                onClick={() => handleVerify(user._id)}
                className="my-3"
                color="info"
              >
                Verifiy Account
              </Button>
            )}
          </CardBody>
        </Card>

        <Card className="profile-card text-capitalize my-5">
          <CardHeader>
            <CardTitle>friend Request Recived</CardTitle>
          </CardHeader>
          <CardBody>
            <ul className="list-unstyled">
              {user &&
                user.friendRequestsReceived.map((i, x) => (
                  <li key={x} className="d-flex justify-content-between my-3">
                    <span>{i.username}</span>
                    <Button onClick={() => handleApprove(i._id)}>
                      approve
                    </Button>
                  </li>
                ))}
              {user.friendRequestsReceived.length === 0 && (
                <li>no new requests</li>
              )}
            </ul>
          </CardBody>
        </Card>

        <Card className="profile-card text-capitalize my-5">
          <CardHeader>
            <CardTitle>friend Request Sent</CardTitle>
          </CardHeader>
          <CardBody>
            <ul className="list-unstyled">
              {user &&
                user.friendRequestsSent.map((i, x) => (
                  <li key={x} className="d-flex justify-content-between my-3">
                    <span>{i.username}</span>

                    <Button onClick={() => handleDelete(i._id)}>
                      Delete Request
                    </Button>
                  </li>
                ))}
              {user.friendRequestsSent.length === 0 && (
                <li>no new requests add more</li>
              )}
            </ul>
          </CardBody>
        </Card>
      </>
    )
  );
};

export default ProfileCard;
