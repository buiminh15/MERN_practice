import React from "react";
import Navbar from "../navbar/Navbar";
import axios from "axios";
import Modal from "../modal/Index";
export default class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role: "user",
      showPopup: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleAction = () => {
    const { email, password } = this.state;
    this.props.history.push("/login", { email, password });
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, email, password, role } = this.state;
    axios
      .post("/api/v1/auth/register", {
        name: name,
        email: email,
        password: password,
        role: role,
      })
      .then((response) => {
        this.togglePopup();
      })
      .catch((error) => {
        console.log("registration error", error);
      });
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  render() {
    return (
      <>
        <Navbar />
        <section className="form mt-5">
          <div className="container">
            <div className="row">
              <div className="col-md-6 m-auto">
                <div className="card bg-white p-4 mb-4">
                  <div className="card-body">
                    <h1>
                      <i className="fas fa-user-plus"></i> Register
                    </h1>
                    <p>
                      Register to list your bootcamp or rate, review and
                      favorite bootcamps
                    </p>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter full name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="password2">Confirm Password</label>
                      <input
                        type="password"
                        name="password_confirmation"
                        className="form-control"
                        placeholder="Confirm password"
                        value={this.state.password_confirmation}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div className="card card-body mb-3">
                      <h5>User Role</h5>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="role"
                          value="user"
                          defaultChecked
                          onChange={(e) => {
                            console.log(e);
                            this.setState({ role: e.currentTarget.value });
                          }}
                        />
                        <label className="form-check-label">
                          Regular User (Browse, Write reviews, etc)
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="role"
                          value="publisher"
                          onChange={(e) =>
                            this.setState({ role: e.currentTarget.value })
                          }
                        />
                        <label className="form-check-label">
                          Bootcamp Publisher
                        </label>
                      </div>
                    </div>
                    <p className="text-danger">
                      * You must be affiliated with the bootcamp in some way in
                      order to add it to DevCamper.
                    </p>
                    <div className="form-group">
                      <button
                        type="button"
                        className="btn btn-primary btn-block"
                        onClick={this.handleSubmit}
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {this.state.showPopup ? (
            <Modal
              text="Register new account successfully!"
              title="Notification"
              nameAction="Login"
              handleAction={this.handleAction}
              closePopup={this.togglePopup.bind(this)}
            />
          ) : null}
        </section>
      </>
    );
  }
}
