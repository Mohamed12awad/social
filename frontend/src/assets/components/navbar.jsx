import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUserAstronaut } from "react-icons/fa";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import { userData } from "../utils/authutils";
import { useAuth } from "../../AuthContext";

import axios from "axios";

function NavBar(args) {
  const { isAuthenticated, token, signOut } = useAuth();
  const [user, setUser] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  let userState = isAuthenticated();
  const handleLogOut = async () => {
    try {
      if (token) {
        await axios
          .get("http://localhost:5000/api/users/logout", {
            withCredentials: true,
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          })
          .then(() => {
            signOut();
            window.location.reload();
          });
      }
    } catch (err) {
      console.log("logout error: ", err);
    }
  };

  useEffect(() => {
    userData().then((data) => setUser(data));
  }, [userState]);

  return (
    <div>
      <Navbar {...args} expand="md" className="shadow-sm sticky-top">
        <Link to="/" className="text-decoration-none">
          <NavbarBrand tag="div" className="text-danger fw-bold">
            My Blogs
          </NavbarBrand>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mx-auto" navbar>
            <NavItem>
              <Link className="text-decoration-none" to="/">
                <NavLink>All Blogs</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <NavLink>About Us</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {!userState && (
            <>
              <Link to="/signin" className="text-decoration-none me-3">
                <NavbarText>Login</NavbarText>
              </Link>

              <Link to="/signup" className="text-decoration-none">
                <NavbarText>Create Account</NavbarText>
              </Link>
            </>
          )}
          {userState && (
            <>
              <Nav navbar>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    <FaUserAstronaut size="2em" color="black" />
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem disabled>
                      <span className="fw-bold fs-6 text-capitalize text-black text-truncate">
                        hello, {user?.username}
                      </span>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem
                      tag={Link}
                      to="/dashboard"
                      className="text-decoration-none text-black text-capitalize"
                    >
                      dashboard
                    </DropdownItem>
                    <DropdownItem onClick={handleLogOut}>Log Out</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
