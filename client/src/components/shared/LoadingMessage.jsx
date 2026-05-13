export default function LoadingMessage({ message }) {
  return (
    <div className="flex flex-col items-center gap-4 py-12 text-white">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-teal-400" />
      <p className="text-lg font-medium text-white/90">{message}</p>
    </div>
  );
}
