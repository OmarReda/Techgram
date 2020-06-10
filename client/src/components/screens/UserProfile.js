import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";
import { Spinner, Progress } from "reactstrap";

const Profile = () => {
  const [userProfile, setProfile] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const { userid } = useParams();

  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setProfile(result);
      });
  }, []);

  return (
    <>
      {userProfile ? (
        <div className="profile container">
          <div className="row info">
            <div className="col-md-4">
              <img
                className="profile-pic"
                src="https://images.unsplash.com/photo-1536104968055-4d61aa56f46a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              />
            </div>
            <div className="col-md-8">
              <h3>{userProfile.user.name}</h3>
              <div className="row counts">
                <div className="col-md-4">
                  <h5>
                    <span className="primary-color">
                      {userProfile.posts.length}
                    </span>{" "}
                    Posts
                  </h5>
                </div>
                <div className="col-md-4">
                  <h5>
                    <span className="primary-color">50</span> Followers
                  </h5>
                </div>
                <div className="col-md-4">
                  <h5>
                    <span className="primary-color">120</span> Following
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className="gallery">
            <h4>
              <span className="primary-color">Gall</span>ery
            </h4>
            <div className="row">
              {userProfile.posts.map((item) => {
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
                      <p className="content-text">{item._id}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="loading">
          <Progress
            animated
            color="warning"
            value={100}
            style={{ height: "10px" }}
          />
          <h1
            style={{
              fontFamily: "lobster",
            }}
          >
            <Spinner
              color="warning"
              size="sm"
              style={{ width: "2.5rem", height: "2.5rem" }}
            />{" "}
            <span className="primary-color">Load</span>ing
          </h1>
        </div>
      )}
    </>
  );
};

export default Profile;
