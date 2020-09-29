import React from 'react';
import Navbar from '../navbar/Navbar';
import axios from 'axios';

export default class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      role: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    const { name, email, password, password_confirmation, role } = this.state;
    axios
      .post(
        'http://localhost:5000/api/v1/auth/register',
        {
          user: {
            name: name,
            email: email,
            password: password,
            password_confirmation: password_confirmation,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log('registration error', error);
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
                    <form onSubmit={this.handleSubmit}>
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

                      {/* <div className="card card-body mb-3">
                        <h5>User Role</h5>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="role"
                            value="user"
                            checked
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
                          />
                          <label className="form-check-label">
                            Bootcamp Publisher
                          </label>
                        </div>
                      </div> */}
                      <p className="text-danger">
                        * You must be affiliated with the bootcamp in some way
                        in order to add it to DevCamper.
                      </p>
                      <div className="form-group">
                        <input
                          type="submit"
                          value="Register"
                          className="btn btn-primary btn-block"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}
