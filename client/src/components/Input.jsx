const Input = ({ label, type = 'text', ...props }) => (
  <div style={{ marginBottom: '16px' }}>
    {label && <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{label}</label>}
    <input className="input-field" type={type} {...props} />
  </div>
);
export default Input;
