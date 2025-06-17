export default function FormInput({
  label,
  type = 'text',
  id,
  value,
  onChange,
  required = false,
  minLength,
  placeholder,
  autoComplete,
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        required={required}
        minLength={minLength}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
    </div>
  );
}