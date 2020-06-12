import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Container,
  Form,
  Spinner,
} from "reactstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    fetch("/allpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
      });
  }, []);

  const likePost = (id) => {
    //console.log(state._id);
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unlikePost = (id) => {
    //console.log(state._id);
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makeComment = (text, postId) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = (postid) => {
    fetch(`/deletepost/${postid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
        toast.warning("🤫 You deleted Your post 🗑️", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div className="home">
      <Container>
        <div className="row">
          <div className="trending col-md-3">
            <h4>
              <span className="primary-color">Tren</span>ding
            </h4>
            <ul>
              <li>
                <span>
                  <h6>#Pi_Technology</h6>
                  <p>This is trending for this month.</p>
                </span>
              </li>
              <li>
                <span>
                  <h6>#AWS_Slack</h6>
                  <p>This is trending for this month.</p>
                </span>
              </li>
              <li>
                <span>
                  <h6>#Cloud</h6>
                  <p>This is trending for this month.</p>
                </span>
              </li>
            </ul>
            <div>
              <div className="footer">
                <p>
                  <a href="#">About</a> - <a href="#">Help</a> -{" "}
                  <a href="#">Press</a> - <a href="#">API</a> -{" "}
                  <a href="#">Jobs</a> - <a href="#">Privacy</a> -{" "}
                  <a href="#">Terms</a> - <a href="#">Locations</a> -{" "}
                  <a href="#">Hashtags</a> - <a href="#">Language</a>
                </p>
                <p>© 2020 TECHGRAM BY OMAR REDA</p>
              </div>
            </div>
          </div>

          <div className="col-md-7 offset-md-1">
            {data.length > 0 ? (
              data.map((item) => {
                return (
                  <Card className="home-card " key={item._id}>
                    <CardBody>
                      <CardTitle>
                        <img className="user-pic" src={item.postedBy.pic} />
                        <Link
                          to={
                            item.postedBy._id !== state.id
                              ? "/profile/" + item.postedBy._id
                              : "/profile"
                          }
                        >
                          {item.postedBy.name}
                        </Link>{" "}
                        {item.postedBy._id == state.id && (
                          <i
                            className="fas fa-trash mr-3 home-icon"
                            style={{
                              float: "right",
                              fontSize: "20px",
                            }}
                            onClick={() => deletePost(item._id)}
                          ></i>
                        )}
                      </CardTitle>
                      <CardImg
                        className="home-card-img"
                        src={item.photo}
                        alt="post"
                      />
                      <div className="like">
                        {item.likes.includes(state.id) ? (
                          <div>
                            <i className="fa fa-heart"></i>
                            <i
                              className="far fa-thumbs-down"
                              style={{ marginLeft: "10px", color: "orange" }}
                              onClick={() => {
                                unlikePost(item._id);
                              }}
                            ></i>
                          </div>
                        ) : (
                          <i
                            className="far fa-thumbs-up"
                            style={{ color: "orange" }}
                            onClick={() => {
                              likePost(item._id);
                            }}
                          ></i>
                        )}
                      </div>
                      <CardSubtitle>{item.likes.length} Likes</CardSubtitle>
                      <CardSubtitle>{item.title}</CardSubtitle>
                      <CardText>{item.body}</CardText>

                      {item.comments.map((record) => {
                        return (
                          <CardText key={record._id}>
                            <span
                              className="primary-color"
                              style={{ fontWeight: "600" }}
                            >
                              {record.postedBy.name}
                            </span>{" "}
                            {record.text}
                          </CardText>
                        );
                      })}

                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          makeComment(e.target[0].value, item._id);
                        }}
                      >
                        <input type="text" placeholder="Comment" />
                      </Form>
                    </CardBody>
                  </Card>
                );
              })
            ) : (
              <div className="loading" style={{ paddingTop: "0px" }}>
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
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
