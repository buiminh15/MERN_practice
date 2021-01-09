import React from 'react';
import { Link } from 'react-router-dom';

export default function Card({ title, subTitle, path }) {
  return (
    <div className="card">
      <div className="card-header card-header-height">{subTitle}</div>
      <div className="card-body-height d-flex ">
        <Link className="text-uppercase" to={path}>
          {title}
        </Link>
      </div>
    </div>
  );
}
