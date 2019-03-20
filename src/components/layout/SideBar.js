import React from "react";
import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <Link to="/client/add" className="btn btn-success btn-block mt-2">
      <i className="fas fa-plus mr-1" />
      New
    </Link>
  );
}
