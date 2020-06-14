import React, { useState, useContext } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ListGroup,
  ListGroupItem,
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

  const [modal, setModal] = useState(false);
  const Searchtoggle = () => {
    setModal(!modal);
    setSearch("");
  };
  const [search, setSearch] = useState("");
  const [userDetails, setUserDetails] = useState([]);

  const fetchUsers = (query) => {
    setSearch(query);
    fetch("/search-users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => res.json())
      .then((results) => {
        setUserDetails(results.user);
      });
  };

  const renderList = () => {
    if (state) {
      return [
        <NavItem key="1">
          <Link to="/" onClick={Searchtoggle}>
            <i className="fas fa-search home-icon"></i>
          </Link>
        </NavItem>,
        <NavItem key="2">
          <Link to="/">
            <i className="fas fa-globe-africa home-icon"></i>
          </Link>
        </NavItem>,
        <NavItem key="3">
          <Link to="/myfollowingpost">
            <i className="fas fa-heart home-icon"></i>
          </Link>
        </NavItem>,
        <NavItem key="4">
          <Link to="/create">
            <i className="fas fa-cloud-upload-alt home-icon"></i>
          </Link>
        </NavItem>,
        <NavItem key="5">
          <Link to="/profile">
            <img className="profile-nav" src={state.pic} alt="" />
          </Link>
        </NavItem>,
        <NavItem key="6">
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
        <NavItem key="7">
          <Link to="/signin">
            <i className="fas fa-user-lock home-icon"></i>
          </Link>
        </NavItem>,
        <NavItem key="8">
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
              <Modal isOpen={modal} toggle={Searchtoggle}>
                <ModalHeader toggle={Searchtoggle}>Search Users</ModalHeader>
                <ModalBody>
                  <input
                    type="text"
                    placeholder="User Search"
                    required
                    value={search}
                    onChange={(e) => fetchUsers(e.target.value)}
                  />
                  <ListGroup>
                    {userDetails.map((item) => {
                      return (
                        <Link
                          to={
                            item._id !== state.id
                              ? "/profile/" + item._id
                              : "/profile"
                          }
                          onClick={Searchtoggle}
                        >
                          <ListGroupItem>{item.email}</ListGroupItem>
                        </Link>
                      );
                    })}
                  </ListGroup>
                </ModalBody>
              </Modal>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
