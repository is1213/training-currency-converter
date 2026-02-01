interface RefreshRatesButtonProps {
  onClick: () => void;
  loading: boolean;
  disabled?: boolean;
  ariaLabel?: string;
}

export default function RefreshRatesButton({
  onClick,
  loading,
  disabled = false,
  ariaLabel = "Refresh exchange rates",
}: RefreshRatesButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 rounded-full border border-gray-300 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed`}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      tabIndex={0}
    >
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 text-blue-500"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="opacity-25"
            cx="10"
            cy="10"
            r="8"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M10 2v2a6 6 0 1 1-6 6H2a8 8 0 1 0 8-8z"
          />
        </svg>
      ) : (
        <svg
          className="h-5 w-5 text-gray-600"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.293 15.707A8 8 0 1 0 10 2v2a6 6 0 1 1-6 6H2a8 8 0 0 0 2.293 5.707z"
            fill="currentColor"
          />
        </svg>
      )}
    </button>
  );
}
