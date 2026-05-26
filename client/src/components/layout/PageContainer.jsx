export default function PageContainer({ children, className = '' }) {
  return (
    <div
      className={`mx-auto top-[70px] w-full max-w-7xl px-4 pt-24 md:px-8 ${className}`}
    >
      {children}
    </div>
  );
}
