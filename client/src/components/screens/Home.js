import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  input,
  Container,
} from "reactstrap";

const Home = () => {
  return (
    <div className="home">
      <Container>
        <div className="row">
          <Card className="home-card col-md-7 offset-1">
            <CardBody>
              <CardTitle>
                <img
                  className="user-pic"
                  src="https://images.unsplash.com/photo-1570483133451-ddc0616200d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                />
                Kate Watson
              </CardTitle>
              <CardImg
                className="home-card-img"
                src="https://images.unsplash.com/photo-1560461396-41fd0b4f711c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                alt="post"
              />
              <div className="like">
                <i className="fa fa-heart"></i>
              </div>
              <CardSubtitle>Title</CardSubtitle>
              <CardText>This is amazing</CardText>
              <input type="text" placeholder="Comment" />
            </CardBody>
          </Card>
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
          <Card className="home-card col-md-7 offset-1">
            <CardBody>
              <CardTitle>
                <img
                  className="user-pic"
                  src="https://images.unsplash.com/photo-1570483133451-ddc0616200d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                />
                Kate Watson
              </CardTitle>
              <CardImg
                className="home-card-img"
                src="https://images.unsplash.com/photo-1577375729152-4c8b5fcda381?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                alt="post"
              />
              <div className="like">
                <i className="fa fa-heart"></i>
              </div>
              <CardSubtitle>Title</CardSubtitle>
              <CardText>This is amazing</CardText>
              <input type="text" placeholder="Comment" />
            </CardBody>
          </Card>
          <Card className="home-card col-md-7 offset-1">
            <CardBody>
              <CardTitle>
                <img
                  className="user-pic"
                  src="https://images.unsplash.com/photo-1570483133451-ddc0616200d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                />
                Kate Watson
              </CardTitle>
              <CardImg
                className="home-card-img"
                src="https://images.unsplash.com/photo-1577375729078-820d5283031c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                alt="post"
              />
              <div className="like">
                <i className="fa fa-heart"></i>
              </div>
              <CardSubtitle>Title</CardSubtitle>
              <CardText>This is amazing</CardText>
              <input type="text" placeholder="Comment" />
            </CardBody>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default Home;
