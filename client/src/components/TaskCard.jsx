import { Edit2, Trash2, Calendar, CheckCircle, Circle } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const priorityColors = {
    low: '#2dd4bf',
    medium: '#facc15',
    high: '#f87171'
  };

  const statusColors = {
    pending: '#94a3b8',
    'in-progress': '#60a5fa',
    completed: '#2dd4bf'
  };

  return (
    <div className="glass" style={{ 
      padding: '20px', borderRadius: 'var(--radius-md)', 
      display: 'flex', flexDirection: 'column', gap: '12px',
      transition: 'transform 0.2s', position: 'relative',
      borderLeft: `4px solid ${priorityColors[task.priority]}`
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: task.status === 'completed' ? 'var(--text-muted)' : 'white', textDecoration: task.status === 'completed' ? 'line-through' : 'none' }}>
          {task.title}
        </h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => onEdit(task)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}>
            <Edit2 size={16} />
          </button>
          <button onClick={() => onDelete(task._id)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', padding: '4px' }}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
        {task.description}
      </p>
      
      <div style={{ marginTop: 'auto', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--glass-border)' }}>
        <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: statusColors[task.status] }}>
            {task.status === 'completed' ? <CheckCircle size={14} /> : <Circle size={14} />}
            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
             <Calendar size={14} />
             {new Date(task.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};
export default TaskCard;
