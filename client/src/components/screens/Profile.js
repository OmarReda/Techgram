import React from "react";

const Profile = () => {
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
          <h3>Kate Watson</h3>
          <div className="row counts">
            <div className="col-md-4">
              <h5>
                <span className="primary-color">5</span> Posts
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
          <div className="col-md-4 post">
            <img src="https://images.unsplash.com/photo-1560461396-41fd0b4f711c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
          </div>
          <div className="col-md-4 post">
            <img src="https://images.unsplash.com/photo-1577375729152-4c8b5fcda381?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
          </div>
          <div className="col-md-4 post">
            <img src="https://images.unsplash.com/photo-1493119508027-2b584f234d6c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
          </div>
          <div className="col-md-4 post">
            <img src="https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
          </div>
          <div className="col-md-4 post">
            <img src="https://images.unsplash.com/photo-1577375729078-820d5283031c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
