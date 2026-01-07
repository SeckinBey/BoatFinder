/**
 * Full-screen loading component with progress bar
 * Görseldeki gibi loading ekranı
 */
export default function FullScreenLoader({ message = "Yükleniyor..." }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-cyan-900 via-cyan-800 to-cyan-900">
      {/* Loading text */}
      <p className="text-cyan-300 text-lg font-medium mb-8 animate-pulse">
        {message}
      </p>

      {/* Progress bar container */}
      <div className="w-full max-w-md px-8">
        <div className="relative h-2 w-full rounded-full border-2 border-cyan-400 overflow-hidden">
          {/* Animated progress bar */}
          <div className="absolute inset-0 h-full">
            {/* Background segments */}
            <div className="flex h-full">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 border-r border-cyan-600/30"
                  style={{ animationDelay: `${i * 50}ms` }}
                />
              ))}
            </div>

            {/* Animated fill */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-300 animate-progress">
              {/* Animated segments */}
              <div className="flex h-full">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 border-r border-cyan-200/20"
                    style={{ animationDelay: `${i * 50}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
