import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";
import { Spinner, Progress, Button } from "reactstrap";

const Profile = () => {
  const [userProfile, setProfile] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const { userid } = useParams();
  const [showfollow, setShowFollow] = useState(
    state ? !state.following.includes(userid) : true
  );

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

  const followUser = () => {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data.id],
            },
          };
        });
        setShowFollow(false);
      });
  };

  const unfollowUser = () => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));

        setProfile((prevState) => {
          const newFollower = prevState.user.followers.filter(
            (item) => item != data._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower,
            },
          };
        });
        setShowFollow(true);
      });
  };

  return (
    <>
      {userProfile ? (
        <div className="profile container">
          <div className="row info">
            <div className="col-md-4">
              <img className="profile-pic" src={userProfile.user.pic} />
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
                    <span className="primary-color">
                      {userProfile.user.followers.length}
                    </span>{" "}
                    Followers
                  </h5>
                </div>
                <div className="col-md-4">
                  <h5>
                    <span className="primary-color">
                      {userProfile.user.following.length}
                    </span>{" "}
                    Following
                  </h5>
                </div>
              </div>
              <div className="follow">
                {showfollow ? (
                  <Button onClick={() => followUser()}>Follow</Button>
                ) : (
                  <Button
                    className="primary-color"
                    onClick={() => unfollowUser()}
                  >
                    Unfollow
                  </Button>
                )}
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
            style={{ height: "10px", marginTop: "15px" }}
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
