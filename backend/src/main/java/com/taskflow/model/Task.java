
package com.taskflow.model;

import java.time.LocalDate;

public class Task {

    private Long id;
    private String title;
    private String category;
    private LocalDate dueDate;
    private String priority;
    private boolean done;

    public Task() {
    }

    public Task(Long id, String title, String category,
                LocalDate dueDate, String priority, boolean done) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.dueDate = dueDate;
        this.priority = priority;
        this.done = done;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }
}
