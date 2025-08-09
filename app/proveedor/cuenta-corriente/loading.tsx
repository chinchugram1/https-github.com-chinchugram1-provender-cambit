export default function CuentaCorrienteLoading() {
  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="w-48 h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="w-64 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="w-32 h-10 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card">
            <div className="w-full h-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="w-full h-32 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-full h-20 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  )
}
