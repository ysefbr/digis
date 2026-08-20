import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-extrabold text-white mb-4">404</h1>
      <p className="text-xl text-slate-300 mb-8">Page not found</p>
      <Link
        href="/"
        className="gemini-btn-primary px-6 py-3 rounded-xl text-white font-bold"
      >
        Return Home
      </Link>
    </div>
  );
}
