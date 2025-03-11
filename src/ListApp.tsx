import React from "react";
import { useState, useEffect } from "react";
import "./ListApp.css";
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

// Định nghĩa kiểu dữ liệu cho công việc
interface Task {
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch {
      return [];
    }
  });

  const [task, setTask] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Thêm công việc
  const addTask = () => {
    if (task.trim() === "") return;

    if (editingIndex !== null && editingIndex >= 0 && editingIndex < tasks.length) {
      // Nếu đang sửa, cập nhật công việc
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = { ...updatedTasks[editingIndex], text: task };
      setTasks(updatedTasks);
      setEditingIndex(null);
    } else {
      // Thêm mới
      setTasks([...tasks, { text: task, completed: false }]);
    }
    setTask("");
  };

  // Xóa công việc
  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Chỉnh sửa công việc
  const editTask = (index: number) => {
    if (index >= 0 && index < tasks.length) {
      setTask(tasks[index].text);
      setEditingIndex(index);
    }
  };

  return (
    <Container>
      <Paper sx={{ ml: 35, mt: 2, width: 600 }}>
        <Typography variant="h4" align="center" gutterBottom>
          List
        </Typography>

        <TextField
          label="Nhập ..."
          variant="outlined"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          error={task.trim() === ""}
          helperText={task.trim() === "" ? "Vui lòng nhập nội dung" : ""}
          sx={{ mb: 2, ml: 15, mr: 5 }}
        />

        <Button variant="contained" color="primary" sx={{ height: 50, width: 150 }} onClick={addTask}>
          {editingIndex !== null ? "Cập nhật" : "Thêm"}
        </Button>

        <List sx={{ ml: 10, mr: 10 }}>
          {tasks.map((t, index) => (
            <ListItem key={index} sx={{ display: "flex", justifyContent: "space-between" }}>
              <ListItemText primary={t.text} sx={{ textDecoration: t.completed ? "line-through" : "none", ml: 5 }} />
              <IconButton edge="end" sx={{ color: "black", width: 50 }} onClick={() => editTask(index)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" sx={{ color: "red", width: 50 }} onClick={() => deleteTask(index)}>
                <Close />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}
