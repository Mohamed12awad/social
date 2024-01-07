// Sidebar.js
import { Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar my-5 vh-100 text-end text-capitalize">
      <Link to="/dashboard/" style={{ textDecoration: "none" }}>
        <h5 className="h5 text-black">Dashboard</h5>
      </Link>
      <Nav vertical justified>
        <NavItem>
          <NavLink tag={Link} to="/dashboard/">
            View Your Data
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/dashboard/edit">
            Edit Personal Data
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/dashboard/blogs">
            view Your Blogs
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/dashboard/newBlog">
            Add new Blog
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className="text-capitalize"
            tag={Link}
            to="/dashboard/people"
          >
            see new people
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};

export default Sidebar;
