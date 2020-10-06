import React, { useState } from "react";
import { resetPassword } from "../../service";
import Modal from "../modal/Index";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  async function handleResetPassword(email) {
    try {
      const res = await resetPassword(email);
      if (res.status === 200) {
        setShowPopup(true);
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <a href="/login">Back to login</a>
              <h1 className="mb-2">Reset Password</h1>
              <p>
                {" "}
                Use this form to reset your password using the registered email
                address.
              </p>
              <form>
                <div className="form-group">
                  <label>Enter Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    onClick={() => handleResetPassword(email)}
                    type="button"
                    value="Reset Password"
                    className="btn btn-dark btn-block"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showPopup ? (
        <Modal
          title="Notification"
          text="Please check your email. New password send to it."
          nameAction="Cancel"
          closePopup={() => setShowPopup(false)}
          handleAction={() => setShowPopup(false)}
        />
      ) : null}
    </section>
  );
}
