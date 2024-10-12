type OrderDetailsProps = {
    order: Order
}

export function OrderDetails({ order }: OrderDetailsProps) {
    return (
        <div className="p-4 border border-gray-500 mt-4">
            <h3>Détails de la commande {order.id}</h3>
            <p><strong>Client:</strong> {order.client}</p>
            <p><strong>Date:</strong> {order.date}</p>
            <p><strong>Statut:</strong> {order.status}</p>
            <p><strong>Total:</strong> €{order.total.toFixed(2)}</p>
            <h4 className="font-bold mt-4 mb-2">Articles:</h4>
            <ul>
                {order.items.map((item, index) => (
                    <li key={index}>
                        {item.name} - Quantité: {item.quantity} - Prix: €{item.price.toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    )
}
