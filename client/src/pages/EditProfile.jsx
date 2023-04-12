import React from "react";

function EditProfile() {
  const style1 = {
    height: "140px",
    backgroundColor: "rgb(233, 236, 239)",
  };
  const style2 = {
    color: "rgb(166, 168, 170)",
    font: "bold 8pt Arial",
  };
  return (
    <div className="container">
      <div className="">
        <div className="">
          <div className="">
            <div className="">
              <div className="">
                <div className="">
                  <div className="">
                    <div className="">
                      <div className="">
                        <div className="">
                          <div className="">
                            <span>140x140</span>
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <div className="">
                          <h4 className="">John Smith</h4>
                          <p className="">@johnny.s</p>
                          <div className="">
                            <small>Last seen 2 hours ago</small>
                          </div>
                          <div className="">
                            <button className="" type="button">
                              <i className=""></i>
                              <span>Change Photo</span>
                            </button>
                          </div>
                        </div>
                        <div className="">
                          <span className="">administrator</span>
                          <div className="">
                            <small>Joined 09 Dec 2017</small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <ul className="">
                      <li className="">
                        <a href="" className="">
                          Settings
                        </a>
                      </li>
                    </ul>
                    <div className="">
                      <div className="">
                        <form className="" novalidate="">
                          <div className="">
                            <div className="">
                              <div className="rw">
                                <div className="">
                                  <div className="">
                                    <label>Full Name</label>
                                    <input
                                      className=""
                                      type="text"
                                      name="name"
                                      placeholder="John Smith"
                                      value="John Smith"
                                    />
                                  </div>
                                </div>
                                <div className="">
                                  <div className="">
                                    <label>Username</label>
                                    <input
                                      className=""
                                      type="text"
                                      name="username"
                                      placeholder="johnny.s"
                                      value="johnny.s"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="">
                                <div className="">
                                  <div className="">
                                    <label>Email</label>
                                    <input
                                      className=""
                                      type="text"
                                      placeholder="user@example.com"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="">
                                <div className="">
                                  <div className="">
                                    <label>About</label>
                                    <textarea
                                      className=""
                                      rows="5"
                                      placeholder="My Bio"
                                    ></textarea>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="">
                            <div className="">
                              <div className="">
                                <b>Change Password</b>
                              </div>
                              <div className="">
                                <div className="">
                                  <div className="">
                                    <label>Current Password</label>
                                    <input
                                      className=""
                                      type="password"
                                      placeholder="••••••"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="">
                                <div className="">
                                  <div className="">
                                    <label>New Password</label>
                                    <input
                                      className=""
                                      type="password"
                                      placeholder="••••••"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="">
                                <div className="">
                                  <div className="">
                                    <label>
                                      Confirm <span className="">Password</span>
                                    </label>
                                    <input
                                      className=""
                                      type="password"
                                      placeholder="••••••"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="">
                              <div className="">
                                <b>Keeping in Touch</b>
                              </div>
                              <div className="">
                                <div className="">
                                  <label>Email Notifications</label>
                                  <div className="">
                                    <div className="c">
                                      <input
                                        type="checkbox"
                                        className=""
                                        id="notifications-blog"
                                        checked=""
                                      />
                                      <label
                                        className=""
                                        for="notifications-blog"
                                      >
                                        Blog posts
                                      </label>
                                    </div>
                                    <div className="">
                                      <input
                                        type="checkbox"
                                        className=""
                                        id="notifications-news"
                                        checked=""
                                      />
                                      <label
                                        className=""
                                        for="notifications-news"
                                      >
                                        Newsletter
                                      </label>
                                    </div>
                                    <div className="">
                                      <input
                                        type="checkbox"
                                        className=""
                                        id="notifications-offers"
                                        checked=""
                                      />
                                      <label
                                        className=""
                                        for="notifications-offers"
                                      >
                                        Personal Offers
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col d-flex justify-content-end">
                              <button className="btn btn-primary" type="submit">
                                Save Changes
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-3 mb-3">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="px-xl-3">
                    <button className="btn btn-block btn-secondary">
                      <i className="fa fa-sign-out"></i>
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title font-weight-bold">Support</h6>
                  <p className="card-text">
                    Get fast, free help from our friendly assistants.
                  </p>
                  <button type="button" className="btn btn-primary">
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
