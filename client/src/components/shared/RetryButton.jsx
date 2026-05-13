export default function RetryButton({ onRetry }) {
  return (
    <button
      onClick={onRetry}
      className="mt-4 rounded-xl bg-teal-600 px-4 py-2 font-semibold text-white transition hover:bg-teal-500"
    >
      Try Again
    </button>
  );
}
