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
            src="https://images.unsplash.com/photo-1570483133451-ddc0616200d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
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
                <img key={item._id} src={item.photo} alt={item.title} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
