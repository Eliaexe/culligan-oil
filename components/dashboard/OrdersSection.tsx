"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { OrderTable } from "./OrderTable"
import { OrderDetails } from "./OrderDetails"
import { FilterControls } from "./FilterControls"
import { Pagination } from "./Pagination"

type Order = {
  id: string
  client: string
  date: string
  total: number
  status: "en attente" | "en traitement" | "terminé" | "annulé"
  items: { name: string; quantity: number; price: number }[]
}

const ITEMS_PER_PAGE = 10

export default function OrdersSection() {
  const [orders, setOrders] = useState<Order[]>([
    { id: "ORD001", client: "Jean Dupont", date: "2023-05-01", total: 129.99, status: "terminé", items: [{ name: "Smartphone XYZ", quantity: 1, price: 129.99 }] },
    { id: "ORD002", client: "Marie Durand", date: "2023-05-02", total: 79.98, status: "en traitement", items: [{ name: "Casque 123", quantity: 2, price: 39.99 }] },
    { id: "ORD003", client: "Paul Martin", date: "2023-05-03", total: 1299.99, status: "en attente", items: [{ name: "Ordinateur portable ABC", quantity: 1, price: 1299.99 }] },
    // Ajouter plus d'exemples de commandes ici...
  ])
  
  const [currentPage, setCurrentPage] = useState(1)
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filteredOrders = orders.filter(order => 
    (filterStatus ? order.status === filterStatus : true) &&
    (searchTerm ? order.client.toLowerCase().includes(searchTerm.toLowerCase()) || order.id.toLowerCase().includes(searchTerm.toLowerCase()) : true)
  )

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE)
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Gestion des Commandes</h2>

      <FilterControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      <OrderTable
        orders={paginatedOrders}
        setSelectedOrder={setSelectedOrder}
      />

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        totalItems={filteredOrders.length}
      />

      {selectedOrder && <OrderDetails order={selectedOrder} />}
    </div>
  )
}
