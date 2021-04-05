import React from 'react';
import { Link } from 'react-router-dom';

export default function Card({ title, subTitle, path, description }) {
  return (
    <div className="container bg-white h-100">
      <div className="font-weight-bold">{subTitle}</div>
      <br/>
      <div className="">{description}</div>
      <br />
      <div className="">
        <Link className="text-uppercase" to={path}>
          {title}
        </Link>
      </div>
    </div>
  );
}
