import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import { Input, Label } from "reactstrap";

const Profile = () => {
  const [mypics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState("");
  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setPics(result.mypost);
      });
  }, []);

  useEffect(() => {
    if (image) {
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
          fetch("/updatepic", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              pic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              localStorage.setItem(
                "user",
                JSON.stringify({ ...state, pic: result.pic })
              );
              dispatch({ type: "UPDATEPIC", payload: result.pic });
              //window.location.reload()
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image]);
  const updatePhoto = (file) => {
    setImage(file);
  };

  return (
    <div className="profile container">
      <div className="row info">
        <div className="col-md-4">
          <img className="profile-pic" src={state ? state.pic : "Loading"} />
        </div>
        <div className="col-md-8">
          <h3>{state ? state.name : "loading"}</h3>
          <h6 style={{ color: "gray" }}>{state ? state.email : "loading"}</h6>
          <div className="row counts">
            <div className="col-md-4">
              <h5>
                <span className="primary-color">{mypics.length}</span> Posts
              </h5>
            </div>
            <div className="col-md-4">
              <h5>
                <span className="primary-color">
                  {state ? state.followers.length : "0"}
                </span>{" "}
                Followers
              </h5>
            </div>
            <div className="col-md-4">
              <h5>
                <span className="primary-color">
                  {state ? state.following.length : "0"}
                </span>{" "}
                Following
              </h5>
            </div>
          </div>
          <div className="edit-profile-pic">
            <Input
              type="file"
              name="file"
              id="file"
              className="inputfile"
              required
              onChange={(e) => updatePhoto(e.target.files[0])}
            />
            <Label for="file">Edit Profile Picture</Label>
            <br />
            <span style={{ fontSize: "10px", color: "gray", width: "100%" }}>
              Image upload depends on the internet connection.
            </span>
            <span style={{ fontSize: "12px", color: "gray" }}>
              {" "}
              Please be patient after choosing a new image.
            </span>
          </div>
        </div>
      </div>
      <div className="gallery">
        <h4>
          <span className="primary-color">Gall</span>ery
        </h4>
        <div className="row">
          {mypics.length > 0 ? (
            mypics.map((item) => {
              return (
                <div className="col-md-4 post">
                  <div className="content-overlay"></div>
                  <img
                    className="gallery-img content-image"
                    key={item._id}
                    src={item.photo}
                    alt={item.title}
                  />
                  <div className="content-details fadeIn-bottom">
                    <h3 className="content-title">{item.title}</h3>
                    <p className="content-text" style={{ fontSize: "16px" }}>
                      {item.likes.length}{" "}
                      <i
                        className="far fa-heart"
                        style={{ color: "white" }}
                      ></i>
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div
              className="loading-profile"
              style={{
                paddingTop: "100px",
                margin: "0 auto",
                paddingBottom: "80px",
              }}
            >
              <h1
                style={{
                  fontFamily: "lobster",
                }}
              >
                {/* <Spinner
                  color="warning"
                  size="sm"
                  style={{ width: "2.5rem", height: "2.5rem" }}
                />{" "} */}
                <span className="primary-color">No Posts</span> Uploaded Yet.
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
