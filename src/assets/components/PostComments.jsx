import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {Typography, CircularProgress, Alert,List, ListItem, ListItemText, Button,} from "@mui/material";

export default function PostComments() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAll() {
      try {
        const postRes = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        const postData = await postRes.json();
        setPost(postData);

        const userRes = await fetch(
          `https://jsonplaceholder.typicode.com/users/${postData.userId}`
        );
        const userData = await userRes.json();
        setUser(userData);

        const commentsRes = await fetch(
          `https://jsonplaceholder.typicode.com/comments?postId=${id}`
        );
        const commentsData = await commentsRes.json();
        setComments(commentsData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error loading comments</Alert>;

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        {post.title}
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        By: {user?.name}
      </Typography>

      <Typography variant="body1" gutterBottom>
        {post.body}
      </Typography>

      <Button onClick={() => navigate(-1)} variant="outlined" sx={{ mb: 2 }}>
        Back
      </Button>

      <Typography variant="h6" gutterBottom>
        Comments: 
      </Typography>

      <List>
        {comments.map((c) => (
          <ListItem key={c.id}>
            <ListItemText primary={c.name} secondary={c.body} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
