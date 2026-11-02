export default function FormField({ label, name, error, children }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="text-sm font-semibold">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-sm text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}