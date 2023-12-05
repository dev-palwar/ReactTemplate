import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const First: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "userId", headerName: "User ID", width: 90 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "body", headerName: "Body", flex: 1 },
  ];

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
      setPosts(response.data);
    });
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <h2>First Component</h2>
      <DataGrid
        rows={posts}
        columns={columns}
      />
    </div>
  );
};

export default First;
