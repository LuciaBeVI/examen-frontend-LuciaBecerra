import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, List, ListItem, ListItemText, CircularProgress, Alert, Button } from "@mui/material";

export default function UserPosts() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then((r) => r.json()),
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`).then((r) => r.json())
    ])
      .then(([userData, postsData]) => {
        setUser(userData);
        setPosts(postsData);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error loading posts</Alert>;

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Posts by {user?.name}
      </Typography>

      <Button onClick={() => navigate(-1)} variant="outlined" sx={{ mb: 2 }}>
        Back
      </Button>

      <List>
        {posts.map((p) => (
          <ListItem
            key={p.id}
            button
            onClick={() => navigate(`/posts/${p.id}/comments`)}
          >
            <ListItemText primary={p.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
