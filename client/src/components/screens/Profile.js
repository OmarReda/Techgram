import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";

const Profile = () => {
  const [mypics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPics(result.mypost);
      });
  }, []);

  return (
    <div className="profile container">
      <div className="row info">
        <div className="col-md-4">
          <img
            className="profile-pic"
            src="https://images.unsplash.com/photo-1536104968055-4d61aa56f46a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          />
        </div>
        <div className="col-md-8">
          <h3>{state ? state.name : "loading"}</h3>
          <div className="row counts">
            <div className="col-md-4">
              <h5>
                <span className="primary-color">{mypics.length}</span> Posts
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
          {mypics.map((item) => {
            return (
              <div className="col-md-4 post">
                <div class="content-overlay"></div>
                <img
                  className="gallery-img content-image"
                  key={item._id}
                  src={item.photo}
                  alt={item.title}
                />
                <div class="content-details fadeIn-bottom">
                  <h3 class="content-title">{item.title}</h3>
                  <p class="content-text">{item._id}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
