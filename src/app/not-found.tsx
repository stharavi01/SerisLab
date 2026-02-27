import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="app-landing dark auth-background min-h-screen flex items-center justify-center p-4">
      <div className="blob"></div>
      <div className="w-full max-w-md relative z-10 text-center">
        <div className="bg-gray-900/60 backdrop-blur border border-white/10 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <h2 className="text-xl font-semibold text-white mb-2">
            Page not found
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="space-y-3">
            <Button
              asChild
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
            >
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full border-white/20 text-white hover:bg-white/10"
            >
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
