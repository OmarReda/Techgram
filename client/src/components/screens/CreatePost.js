import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Input, FormText } from "reactstrap";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (url) {
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            toast.error("😕 " + data.error + " 😔", {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.success("Created Post Successfully 🚀", {
              position: "bottom-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);

  const postDetails = () => {
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

  return (
    <div className="new">
      <div className="new-post-title">
        <h2>
          <span className="primary-color">Create</span> New Post
        </h2>
      </div>
      <div className="new-post">
        <Form>
          <FormGroup>
            <Input
              type="text"
              name="title"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="body"
              placeholder="Body"
              required
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </FormGroup>
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
              You can only upload one file so be careful, the maximum file size
              is 10MB. Please be patient while we upload your post.
            </FormText>
          </FormGroup>
          <Button onClick={postDetails}>Submit</Button>
        </Form>
      </div>
    </div>
  );
};

export default CreatePost;
