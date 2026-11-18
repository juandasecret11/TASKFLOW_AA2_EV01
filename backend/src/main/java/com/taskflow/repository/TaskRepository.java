
package com.taskflow.repository;

import com.taskflow.model.Task;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TaskRepository {

    private final JdbcTemplate jdbcTemplate;

    public TaskRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Task> taskMapper = (rs, rowNum) ->
        new Task(
            rs.getLong("id"),
            rs.getString("title"),
            rs.getString("category"),
            rs.getDate("due_date").toLocalDate(),
            rs.getString("priority"),
            rs.getBoolean("done")
        );

    // Consultar todas las tareas
    public List<Task> findAll() {
        String sql = "SELECT * FROM tasks ORDER BY id DESC";
        return jdbcTemplate.query(sql, taskMapper);
    }

    // Consultar una tarea por su identificador
    public Task findById(Long id) {
        String sql = "SELECT * FROM tasks WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, taskMapper, id);
    }

    // Insertar una tarea nueva
    public int save(Task task) {
        String sql = """
            INSERT INTO tasks (title, category, due_date, priority, done)
            VALUES (?, ?, ?, ?, ?)
            """;

        return jdbcTemplate.update(
            sql,
            task.getTitle(),
            task.getCategory(),
            task.getDueDate(),
            task.getPriority(),
            task.isDone()
        );
    }

    // Actualizar una tarea
    public int update(Long id, Task task) {
        String sql = """
            UPDATE tasks
            SET title = ?, category = ?, due_date = ?,
                priority = ?, done = ?
            WHERE id = ?
            """;

        return jdbcTemplate.update(
            sql,
            task.getTitle(),
            task.getCategory(),
            task.getDueDate(),
            task.getPriority(),
            task.isDone(),
            id
        );
    }

    // Eliminar una tarea
    public int delete(Long id) {
        String sql = "DELETE FROM tasks WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }
}
