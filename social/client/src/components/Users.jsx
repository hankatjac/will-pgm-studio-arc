import React from "react";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../axios";
import { Link } from "react-router-dom";
const Users = () => {
  const { isLoading, error, data } = useQuery(["users"], () =>
    makeRequest.get("/users").then((res) => {
      return res.data;
    })
  );

  return (
    <div style={{textDecoration:'none', display:'flex', flexDirection:'row', gap:'50px'}}>
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((user) => (
            <Link key={user.id} style={{textDecoration:'none'}} to={`profile/${user.id}`}>{user.username}</Link>
          ))}
    </div>
  );
};
export default Users;
