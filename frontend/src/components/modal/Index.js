import React from "react";

export default function Modal(props) {
  return (
    <div className="popup">
      <div className="popup_inner">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{props.title}</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={props.closePopup}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>{props.text}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={props.handleAction}
            >
              {props.nameAction}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
