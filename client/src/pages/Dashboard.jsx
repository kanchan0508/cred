import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Search, Filter } from 'lucide-react';
import TaskCard from '../components/TaskCard';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Button from '../components/Button';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null); // For editing
  
  // Form State
  const [formData, setFormData] = useState({ title: '', description: '', priority: 'medium', status: 'pending' });

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL || ''}/api/tasks?status=${filter}&search=${search}`);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchTasks();
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [filter, search]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL || ''}/api/tasks/${id}`);
        setTasks(tasks.filter(t => t._id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleOpenModal = (task = null) => {
    if (task) {
      setCurrentTask(task);
      setFormData({ title: task.title, description: task.description, priority: task.priority, status: task.status });
    } else {
      setCurrentTask(null);
      setFormData({ title: '', description: '', priority: 'medium', status: 'pending' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentTask) {
        const res = await axios.put(`${import.meta.env.VITE_API_URL || ''}/api/tasks/${currentTask._id}`, formData);
        setTasks(tasks.map(t => (t._id === currentTask._id ? res.data : t)));
      } else {
        const res = await axios.post(`${import.meta.env.VITE_API_URL || ''}/api/tasks`, formData);
        setTasks([res.data, ...tasks]);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page-container">
      {/* Header & Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 className="heading-gradient" style={{ fontSize: '2rem' }}>Dashboard</h2>
            <p style={{ color: 'var(--text-muted)' }}>Manage your tasks efficiently</p>
          </div>
          <Button onClick={() => handleOpenModal()}>
            <Plus size={20} /> New Task
          </Button>
        </div>

        <div className="glass" style={{ padding: '16px', borderRadius: 'var(--radius-md)', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '40px', marginBottom: 0, background: 'rgba(0,0,0,0.3)' }}
            />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={18} style={{ color: 'var(--text-muted)' }} />
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="input-field"
              style={{ width: 'auto', marginBottom: 0, background: 'rgba(0,0,0,0.3)', cursor: 'pointer' }}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task Grid */}
      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)' }}>
          <p>No tasks found. Create one to get started!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {tasks.map(task => (
            <TaskCard 
              key={task._id} 
              task={task} 
              onEdit={handleOpenModal} 
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={currentTask ? 'Edit Task' : 'Create New Task'}
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input 
            label="Title" 
            value={formData.title} 
            onChange={(e) => setFormData({...formData, title: e.target.value})} 
            required 
            placeholder="e.g., Redesign Homepage"
          />
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Description</label>
            <textarea 
              className="input-field" 
              rows="4" 
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Add details..."
              style={{ resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Status</label>
              <select 
                className="input-field" 
                value={formData.status} 
                onChange={(e) => setFormData({...formData, status: e.target.value})}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Priority</label>
              <select 
                className="input-field" 
                value={formData.priority} 
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-glass">Cancel</button>
            <Button type="submit">{currentTask ? 'Save Changes' : 'Create Task'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
export default Dashboard;
