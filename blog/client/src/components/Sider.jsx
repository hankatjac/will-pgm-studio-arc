import React from "react";
import Like from "./Like";
import { Link } from "react-router-dom";

const Sider = () => {
  return (
    <>
      <aside className="sidebar">
        <div className="card mb-4">
          <div className="card-body">
            <h4 className="card-title">About</h4>
            <p className="card-text">
              Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus,
              sem quam <a href="#">semper libero</a>, sit amet adipiscing sem
              neque sed ipsum.{" "}
            </p>
          </div>
        </div>
      </aside>

      <aside className="sidebar sidebar-sticky">
        <div className="card mb-4">
          <div className="card-body">
            <h4 className="card-title">Categories</h4>
            <Link className="btn btn-light btn-sm mb-1" to="/?cat=business">
              Business
            </Link>
            <Link className="btn btn-light btn-sm mb-1" to="/?cat=culture">
              Culture
            </Link>
            <Link className="btn btn-light btn-sm mb-1" to="/?cat=technology">
              Technology
            </Link>
            <Link className="btn btn-light btn-sm mb-1" to="/?cat=quotidian">
              Quotidian
            </Link>
          </div>
        </div>
        {/* <div className="card mb-4">
          <div className="card-body">
            <Like />
          </div>
        </div> */}
      </aside>
    </>
  );
};

export default Sider;
