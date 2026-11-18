
import React, { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2, Circle, Plus, Search, Sun, Moon,
  CalendarDays, LayoutDashboard, ListTodo,
  ChartNoAxesColumn, Trash2, Clock3, Pencil
} from "lucide-react";

const API_URL = "http://localhost:8080/api/tasks";

const emptyForm = {
  title: "",
  category: "Estudio",
  dueDate: "2026-11-20",
  priority: "Media",
  done: false
};

const dateLabel = (value) =>
  value
    ? new Date(`${value}T12:00:00`).toLocaleDateString("es-CO", {
        day: "numeric",
        month: "short"
      })
    : "Sin fecha";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Todas");
  const [dark, setDark] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTasks() {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("No se pudieron cargar las tareas");

      const data = await response.json();
      setTasks(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  const visibleTasks = useMemo(() =>
    tasks.filter((task) => {
      const matchesText = task.title.toLowerCase().includes(query.toLowerCase());
      const matchesFilter =
        filter === "Todas" ||
        (filter === "Pendientes" && !task.done) ||
        (filter === "Completadas" && task.done);

      return matchesText && matchesFilter;
    }),
    [tasks, query, filter]
  );

  const pending = tasks.filter((task) => !task.done).length;
  const completed = tasks.filter((task) => task.done).length;
  const progress = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  async function addTask(event) {
    event.preventDefault();

    if (!form.title.trim()) return;

    try {
      const url = editingId
        ? `${API_URL}/${editingId}`
        : API_URL;

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          title: form.title.trim()
        })
      });

      if (!response.ok) throw new Error("No se pudo guardar la tarea");

      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  async function toggleTask(task) {
    try {
      const response = await fetch(`${API_URL}/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...task, done: !task.done })
      });

      if (!response.ok) throw new Error("No se pudo actualizar la tarea");
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteTask(id) {
    if (!window.confirm("¿Deseas eliminar esta tarea?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) throw new Error("No se pudo eliminar la tarea");
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  function editTask(task) {
    setForm({
      title: task.title,
      category: task.category,
      dueDate: task.dueDate,
      priority: task.priority,
      done: task.done
    });
    setEditingId(task.id);
    setShowForm(true);
  }

  function cancelForm() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  }

  return (
    <div className={`app ${dark ? "dark" : ""}`}>
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">T</span>
          <span>TaskFlow</span>
        </div>

        <div className="nav-caption">MENÚ PRINCIPAL</div>

        <button className="nav-item active">
          <LayoutDashboard size={18}/> Panel principal
        </button>
        <button className="nav-item" onClick={() => setFilter("Todas")}>
          <ListTodo size={18}/> Mis tareas
        </button>
        <button className="nav-item" onClick={() => setFilter("Pendientes")}>
          <CalendarDays size={18}/> Pendientes
        </button>
        <button className="nav-item" onClick={() => setFilter("Completadas")}>
          <ChartNoAxesColumn size={18}/> Estadísticas
        </button>

        <div className="sidebar-bottom">
          <div className="tip">
            <b>¡Sigue avanzando!</b>
            <p>Cada tarea completada te acerca a tus objetivos.</p>
            <div className="mini-progress">
              <span style={{ width: `${progress}%` }}/>
            </div>
          </div>

          <div className="profile">
            <div className="avatar">JD</div>
            <div>
              <b>Juan David</b>
              <small>Aprendiz</small>
            </div>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <span className="eyebrow">GESTIÓN DE ACTIVIDADES</span>
            <h1>Panel principal</h1>
            <p className="subtitle">
              ¡Hola! Este es tu espacio para organizar el día.
            </p>
          </div>

          <button
            className="icon-button"
            aria-label="Cambiar tema"
            onClick={() => setDark(!dark)}
          >
            {dark ? <Sun size={20}/> : <Moon size={20}/>}
          </button>
        </header>

        <section className="stats">
          <article className="stat-card">
            <div className="stat-icon purple"><ListTodo size={20}/></div>
            <span>Total de tareas</span>
            <strong>{tasks.length}</strong>
            <small>En tu lista actual</small>
          </article>

          <article className="stat-card">
            <div className="stat-icon orange"><Clock3 size={20}/></div>
            <span>Pendientes</span>
            <strong>{pending}</strong>
            <small>Por completar</small>
          </article>

          <article className="stat-card">
            <div className="stat-icon green"><CheckCircle2 size={20}/></div>
            <span>Completadas</span>
            <strong>{completed}</strong>
            <small>Buen trabajo</small>
          </article>

          <article className="stat-card">
            <div className="stat-icon blue"><ChartNoAxesColumn size={20}/></div>
            <span>Progreso</span>
            <strong>{progress}%</strong>
            <small>De tus objetivos</small>
          </article>
        </section>

        <section className="task-section">
          <div className="section-heading">
            <div>
              <h2>Mis tareas</h2>
              <p>Administra tus actividades y prioridades.</p>
            </div>

            <button
              className="primary-button"
              onClick={() => {
                if (showForm) cancelForm();
                else setShowForm(true);
              }}
            >
              <Plus size={18}/> Nueva tarea
            </button>
          </div>

          {error && (
            <p role="alert" className="error-message">{error}</p>
          )}

          {showForm && (
            <form className="task-form" onSubmit={addTask}>
              <label>
                Nombre de la tarea
                <input
                  required
                  maxLength="100"
                  placeholder="¿Qué necesitas hacer?"
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                />
              </label>

              <div className="form-row">
                <label>
                  Categoría
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                  >
                    <option>Estudio</option>
                    <option>Proyecto</option>
                    <option>Personal</option>
                    <option>Trabajo</option>
                  </select>
                </label>

                <label>
                  Fecha límite
                  <input
                    type="date"
                    value={form.dueDate}
                    onChange={(e) =>
                      setForm({ ...form, dueDate: e.target.value })
                    }
                  />
                </label>

                <label>
                  Prioridad
                  <select
                    value={form.priority}
                    onChange={(e) =>
                      setForm({ ...form, priority: e.target.value })
                    }
                  >
                    <option>Alta</option>
                    <option>Media</option>
                    <option>Baja</option>
                  </select>
                </label>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={cancelForm}
                >
                  Cancelar
                </button>
                <button className="primary-button" type="submit">
                  {editingId ? "Actualizar tarea" : "Guardar tarea"}
                </button>
              </div>
            </form>
          )}

          <div className="toolbar">
            <div className="search">
              <Search size={18}/>
              <input
                placeholder="Buscar tarea..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="filters">
              {["Todas", "Pendientes", "Completadas"].map((name) => (
                <button
                  key={name}
                  className={filter === name ? "selected" : ""}
                  onClick={() => setFilter(name)}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <div className="task-list">
            {loading ? (
              <div className="empty">Cargando tareas...</div>
            ) : (
              <>
                {visibleTasks.map((task) => (
                  <article
                    className={`task-row ${task.done ? "done" : ""}`}
                    key={task.id}
                  >
                    <button
                      className="check"
                      aria-label={task.done ? "Marcar pendiente" : "Completar tarea"}
                      onClick={() => toggleTask(task)}
                    >
                      {task.done
                        ? <CheckCircle2 size={22}/>
                        : <Circle size={22}/>}
                    </button>

                    <div className="task-info">
                      <b>{task.title}</b>
                      <div className="task-meta">
                        <span className="category">{task.category}</span>
                        <span>
                          <CalendarDays size={14}/> {dateLabel(task.dueDate)}
                        </span>
                      </div>
                    </div>

                    <span className={`priority ${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>

                    <button
                      className="delete-button"
                      aria-label="Editar tarea"
                      onClick={() => editTask(task)}
                    >
                      <Pencil size={17}/>
                    </button>

                    <button
                      className="delete-button"
                      aria-label="Eliminar tarea"
                      onClick={() => deleteTask(task.id)}
                    >
                      <Trash2 size={17}/>
                    </button>
                  </article>
                ))}

                {visibleTasks.length === 0 && (
                  <div className="empty">
                    <ListTodo size={30}/>
                    <b>No hay tareas para mostrar</b>
                    <span>Prueba otro filtro o crea una nueva tarea.</span>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        <footer>TaskFlow · Organiza tu tiempo, alcanza tus metas.</footer>
      </main>
    </div>
  );
}
