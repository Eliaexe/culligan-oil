import { Eye } from "lucide-react"

type OrderTableProps = {
  orders: Order[]
  setSelectedOrder: (order: Order) => void
}

export function OrderTable({ orders, setSelectedOrder }: OrderTableProps) {
  return (
    <table className="min-w-full bg-white">
      <thead className="bg-gray-100">
        <tr className="bg-gray-200">
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Commande</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {orders.map((order) => (
          <tr key={order.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.id}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.client}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">€{order.total.toFixed(2)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.status}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <button
                className="p-2 border border-gray-500 rounded"
                onClick={() => setSelectedOrder(order)}
              >
                <Eye className="h-4 w-4" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
