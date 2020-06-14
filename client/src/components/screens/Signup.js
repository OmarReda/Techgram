import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  FormGroup,
  Input,
  FormText,
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
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);

  useEffect(() => {
    if (url) {
      uploadFields();
    }
  }, [url]);

  const uploadPic = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Techgram");
    data.append("cloud_name", "djvh0aebv");
    fetch("https://api.cloudinary.com/v1_1/djvh0aebv/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadFields = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      toast.error("😕 Invalid Email 😔", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        password,
        email,
        pic: url,
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

  const PostData = () => {
    if (image) {
      uploadPic();
    } else {
      uploadFields();
    }
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
          <FormGroup>
            <Input
              type="file"
              name="file"
              id="file"
              className="inputfile"
              required
              onChange={(e) => setImage(e.target.files[0])}
            />
            <FormText color="muted">
              <span className="primary-color">
                *Profile Picture is optional*
              </span>
              <br />
              The maximum file size is 10MB. Please be patient while we upload
              your post.
            </FormText>
          </FormGroup>
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
