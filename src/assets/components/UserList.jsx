import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { List, ListItem, ListItemText, Typography, CircularProgress, Alert } from "@mui/material";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then(setUsers)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error loading users</Alert>;

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Users
      </Typography>
      <List>
        {users.map((u) => (
          <ListItem
            key={u.id}
            button
            onClick={() => navigate(`/users/${u.id}/posts`)}
          >
            <ListItemText primary={u.name} secondary={u.email} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

