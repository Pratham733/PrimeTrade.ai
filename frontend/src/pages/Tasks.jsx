import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../utils/api';
import { useAuth } from '../context/useAuth';

const TaskItem = ({ task, onEdit, onDelete }) => (
  <div className="card flex flex-col p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div className="flex-grow">
      <h3 className="font-bold text-xl mb-2">{task.title}</h3>
      <p className="text-gray-700 text-base mb-4">{task.description}</p>
    </div>
    <div className="flex justify-between items-center">
      <span className={`text-sm font-semibold px-3 py-1 rounded-full ${task.status === 'done' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
        {task.status}
      </span>
      <div className="flex gap-3">
        <button className="btn" onClick={() => onEdit(task)}>Edit</button>
        <button
          className="btn bg-red-600 text-white hover:bg-red-700"
          onClick={() => onDelete(task._id)}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

const Tasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { title: '', description: '', status: 'todo' }
  });

  const fetchTasks = async () => {
    if (!user) return;
    try {
      const res = await api.get('/tasks', { params: { q: query, status: statusFilter } });
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    const timeout = setTimeout(fetchTasks, 300);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, statusFilter]);

  const onSubmit = async (data) => {
    try {
      if (editing) {
        const res = await api.put(`/tasks/${editing._id}`, data);
        setEditing(null);
        reset();
        setTasks((prev) => prev.map((t) => (t._id === res.data._id ? res.data : t)));
      } else {
        const res = await api.post('/tasks', data);
        reset();
        setTasks((prev) => [res.data, ...prev]);
      }
    } catch (err) {
      console.error('Task save failed', err);
    }
  };

  const onDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error('Task delete failed', err);
    }
  };

  const onEdit = (task) => {
    setEditing(task);
    reset({ title: task.title, description: task.description, status: task.status });
  };

  const cancelEdit = () => {
    setEditing(null);
    reset({ title: '', description: '', status: 'todo' });
  };

  return (
    <div className="dashboard-container">
      <h1 className="welcome-title">Manage Tasks</h1>

      <div className="section-card">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input className="input md:col-span-1" placeholder="Title" {...register('title')} />
          <input className="input md:col-span-2" placeholder="Description" {...register('description')} />
          <select className="input md:col-span-1" {...register('status')}>
            <option value="todo">Todo</option>
            <option value="in-progress">In progress</option>
            <option value="done">Done</option>
          </select>
          <div className="md:col-span-4 flex gap-2">
            <button className="btn btn-primary">{editing ? 'Update' : 'Add'}</button>
            {editing && (
              <button type="button" className="btn" onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="section-card">
        <div className="flex flex-col md:flex-row gap-3">
          <input
            className="input"
            placeholder="Search tasks\u2026"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="input"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All statuses</option>
            <option value="todo">Todo</option>
            <option value="in-progress">In progress</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tasks.length === 0 ? (
          <div className="text-gray-600">No tasks found.</div>
        ) : (
          tasks.map((t) => <TaskItem key={t._id} task={t} onEdit={onEdit} onDelete={onDelete} />)
        )}
      </div>
    </div>
  );
};

export default Tasks;