export default function ConfirmarPedidoLoading() {
  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center space-x-4">
        <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
        <div>
          <div className="w-48 h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="w-64 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      <div className="card">
        <div className="w-full h-32 bg-gray-200 rounded animate-pulse mb-6"></div>
        <div className="space-y-4">
          <div className="w-full h-12 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-full h-12 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-full h-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
