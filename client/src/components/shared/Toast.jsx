function Toast({ message, type, onClose }) {
  let bgColor = 'bg-blue-500';

  if (type === 'success') bgColor = 'bg-green-500';
  if (type === 'error') bgColor = 'bg-red-500';

  return (
    <div
      className={`${bgColor} text-white px-4 py-3 rounded shadow-md min-w-62.5 flex justify-between gap-4`}
    >
      <span>{message}</span>

      <button type="button" onClick={onClose}>
        ×
      </button>
    </div>
  );
}

export default Toast;
