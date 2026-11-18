
package com.taskflow.controller;

import com.taskflow.model.Task;
import com.taskflow.repository.TaskRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {

    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    // Consultar todas las tareas
    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // Consultar una tarea
    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id) {
        return taskRepository.findById(id);
    }

    // Crear una tarea
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public String createTask(@RequestBody Task task) {
        taskRepository.save(task);
        return "Tarea creada correctamente";
    }

    // Actualizar una tarea
    @PutMapping("/{id}")
    public String updateTask(@PathVariable Long id, @RequestBody Task task) {
        int updated = taskRepository.update(id, task);
        if (updated == 0) {
            throw new RuntimeException("No se encontró la tarea");
        }
        return "Tarea actualizada correctamente";
    }

    // Eliminar una tarea
    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id) {
        int deleted = taskRepository.delete(id);
        if (deleted == 0) {
            throw new RuntimeException("No se encontró la tarea");
        }
        return "Tarea eliminada correctamente";
    }
}
