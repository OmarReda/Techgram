import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Toast,
  ToastBody,
  ToastHeader,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const Signup = (props) => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const PostData = () => {
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
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
          toast.success("👾 " + data.message + " 🚀", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          history.push("/signin");
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
            placeholder="Full Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={PostData}>Sign up</Button>
          <hr />
          <p className="policy">
            By signing up, you agree to our <span>Terms</span> ,{" "}
            <span>Data Policy</span> and <span>Cookies Policy</span>.
          </p>
        </CardBody>
      </Card>
      <Card className="Login-Signup">
        <CardBody>
          <p className="new-account">
            Have an account?
            <Link to="/signin">
              <span className="primary-color"> Login</span>
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
};
export default Signup;
