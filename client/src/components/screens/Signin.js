import React, { useState, useContext } from "react";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = (props) => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const PostData = () => {
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          {
            toast.error("😕 " + data.error + " 😔", {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          toast.success("👾 Welcome Back! 🚀", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="card-container">
      <Card className="Login-card">
        <CardBody>
          <CardTitle>
            <span className="primary-color">Tech</span>gram
          </CardTitle>
          <input
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={PostData}>Login</Button>
          <hr />
          <p className="forget">
            <a href="/">Forget Your Password?</a>
          </p>
        </CardBody>
      </Card>
      <Card className="Login-Signup">
        <CardBody>
          <p className="new-account">
            Forget Your Password?
            <Link to="/signup">
              <span className="primary-color"> Sign up</span>
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default Signin;
