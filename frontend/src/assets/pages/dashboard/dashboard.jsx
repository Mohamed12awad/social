import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import Sidebar from "../../components/dashboard/sidebar";
import EditUser from "../../components/dashboard/editUser";
import ProfileCard from "../../components/dashboard/profile";
import MyBlogs from "./../../components/dashboard/myBlogs";
import axios from "axios";
import CreateBlog from "../../components/dashboard/newBlog";
import UserList from "../../components/dashboard/people";

const Dashboard = () => {
  const [formData, setFormData] = useState("");
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

  useEffect(() => {
    fetchData();
  }, []);

  // const handleRefresh = async () => {
  //   await fetchData();
  // };

  return (
    <Container fluid>
      <Row>
        <Col sm="9">
          <Routes>
            <Route
              path="/"
              element={<ProfileCard user={formData} refreshData={fetchData} />}
            />
            <Route path="/edit" element={<EditUser />} />
            <Route path="/blogs" element={<MyBlogs />} />
            <Route
              path="/newBlog"
              element={<CreateBlog user={formData._id} />}
            />
            <Route path="/people" element={<UserList />} />
            {/* <Route exact path="/dashboard/view" component={ViewUserData} />
            <Route exact path="/dashboard/modify" component={ModifyUserData} /> */}
          </Routes>
        </Col>
        <Col sm="3">
          <Sidebar />
        </Col>
        {/* <EditUser /> */}
      </Row>
    </Container>
  );
};

export default Dashboard;
