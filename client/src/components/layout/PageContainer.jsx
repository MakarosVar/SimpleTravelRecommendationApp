export default function PageContainer({ children, className = '' }) {
  return (
    <div
      className={`mx-auto top-17.5 w-full max-w-7xl px-4 pt-24 md:px-6 ${className}`}
    >
      {children}
    </div>
  );
}
