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
} from "reactstrap";
import { UserContext } from "../../App";

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
        console.log(result);
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
        console.log(result);
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
        console.log(result);
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
        console.log(result);
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      });
  };

  return (
    <div className="home">
      <Container>
        <div className="row">
          {data.map((item) => {
            return (
              <Card className="home-card col-md-7 offset-md-1" key={item._id}>
                <CardBody>
                  <CardTitle>
                    <img
                      className="user-pic"
                      src="https://images.unsplash.com/photo-1536104968055-4d61aa56f46a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                    />
                    {item.postedBy.name}
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
          })}

          <div className="trending col-md-3">
            <h4>
              <span className="primary-color">Tren</span>ding
            </h4>
            <ul>
              <li>
                <span>
                  <h6>#IBM_Cloud</h6>
                  <p>This is a trending post, Hello World!</p>
                </span>
              </li>
              <li>
                <span>
                  <h6>#AWS</h6>
                  <p>This is a trending post, Hello World!</p>
                </span>
              </li>
              <li>
                <span>
                  <h6>#IoT</h6>
                  <p>This is a trending post, Hello World!</p>
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
        </div>
      </Container>
    </div>
  );
};

export default Home;
