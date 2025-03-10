import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Paper,

} from "@mui/material";
import { Close, Edit } from "@mui/icons-material";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  // Thêm công việc
  const addTask = () => {
    if (task.trim() === "") return;
    
    if (editingIndex !== null) {
      // Nếu đang sửa, cập nhật công việc
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex].text = task;
      setTasks(updatedTasks);
      setEditingIndex(null);
    } else {
      // Thêm mới
      setTasks([...tasks, { text: task, completed: false }]);
    }
    setTask("");
  };

  // Xóa công việc
  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

    // Edit công việc
    const editTask = (index) => {
      setTask(tasks[index].text);
      setEditingIndex(index);
    };

  return (
    <Container>
      <Paper >
        <Typography variant="h4" align="center" gutterBottom>
          List
        </Typography>
        
        <TextField
          label="Nhập ..."
          variant="outlined"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button variant="contained" color="primary" fullWidth onClick={addTask}>
          Thêm
        </Button>
        <List>
          {tasks.map((t, index) => (
            <ListItem key={index} sx={{ display: "flex", justifyContent: "space-between" }}>
              <ListItemText
                primary={t.text}
                sx={{ textDecoration: t.completed ? "line-through" : "none" }}
              />
              <IconButton edge="end" sx={{ color: "black" }} onClick={() => editTask(index)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" color="error" onClick={() => deleteTask(index)}>
                <Close />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}
