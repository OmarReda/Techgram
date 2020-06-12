import React, { useState, useContext } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from "reactstrap";
import { Link, useHistory, Redirect } from "react-router-dom";
import { UserContext } from "../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NavBar = (props) => {
  const { state, dispatch } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const history = useHistory();

  const renderList = () => {
    if (state) {
      return [
        <NavItem>
          <Link to="/">
            <i className="fas fa-search home-icon"></i>
          </Link>
        </NavItem>,
        <NavItem>
          <Link to="/">
            <i className="fas fa-globe-africa home-icon"></i>
          </Link>
        </NavItem>,
        <NavItem>
          <Link to="/myfollowingpost">
            <i className="fas fa-heart home-icon"></i>
          </Link>
        </NavItem>,
        <NavItem>
          <Link to="/create">
            <i className="fas fa-cloud-upload-alt home-icon"></i>
          </Link>
        </NavItem>,
        <NavItem>
          <Link to="/profile">
            <img className="profile-nav" src={state.pic} />
          </Link>
        </NavItem>,
        <NavItem>
          <Link
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push("/signin");
              Redirect("/signin");
              toast.dark("👾 You haved Logged Out, Bye! 👋", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }}
          >
            <i className="fas fa-sign-out-alt home-icon"></i>
          </Link>
        </NavItem>,
      ];
    } else {
      return [
        <NavItem>
          <Link to="/signin">
            <i className="fas fa-user-lock home-icon"></i>
          </Link>
        </NavItem>,
        <NavItem>
          <Link to="/signup">
            <i className="fas fa-user-plus home-icon"></i>
          </Link>
        </NavItem>,
      ];
    }
  };

  return (
    <div>
      <Navbar light expand="md">
        <Container>
          <NavbarBrand href="/">
            <span className="primary-color">Tech</span>gram
          </NavbarBrand>
          <NavbarToggler onClick={toggle} aria-controls="basic-navbar-nav" />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {renderList()}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
