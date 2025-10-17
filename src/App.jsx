import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import UserList from "./assets/components/UserList";
import UserPosts from "./assets/components/UserPost";
import PostComments from "./assets/components/PostComments";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";

export default function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Users, Posts and Comments
          </Typography>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Home
          </Link>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: 4 }}>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/users/:id/posts" element={<UserPosts />} />
          <Route path="/posts/:id/comments" element={<PostComments />} />
        </Routes>
      </Container>
    </>
  );
}



