import React, { useState } from 'react';
import { AiOutlineLeft, AiOutlineRight, AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';

type Customer = {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
};

const ITEMS_PER_PAGE = 10;

const CustomerSection: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    { id: "C001", name: "Mario Rossi", email: "mario@example.com", totalOrders: 5, totalSpent: 499.95, lastOrderDate: "2023-05-01" },
    { id: "C002", name: "Giulia Bianchi", email: "giulia@example.com", totalOrders: 3, totalSpent: 299.97, lastOrderDate: "2023-05-15" },
    { id: "C003", name: "Luca Verdi", email: "luca@example.com", totalOrders: 7, totalSpent: 789.93, lastOrderDate: "2023-05-20" },
    // Aggiungi altri dati qui...
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);
  const paginatedCustomers = filteredCustomers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const openCustomerDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  const closeCustomerDetails = () => {
    setSelectedCustomer(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Gestion des Clients</h2>
      
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher des clients..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <AiOutlineSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commandes Totales</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Dépensé</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dernière Commande</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedCustomers.map((customer) => (
              <tr key={customer.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.totalOrders}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">€{customer.totalSpent.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.lastOrderDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => openCustomerDetails(customer)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Détails
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-700">
          Affichage de {(currentPage - 1) * ITEMS_PER_PAGE + 1} à {Math.min(currentPage * ITEMS_PER_PAGE, filteredCustomers.length)} sur {filteredCustomers.length} clients
        </p>
        <div className="flex space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            <AiOutlineLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            <AiOutlineRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Détails du Client</h3>
              <button onClick={closeCustomerDetails} className="text-gray-500 hover:text-gray-700">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <AiOutlineUser className="h-5 w-5 text-gray-400" />
                <p><span className="font-semibold">Nom:</span> {selectedCustomer.name}</p>
              </div>
              <p><span className="font-semibold">Email:</span> {selectedCustomer.email}</p>
              <p><span className="font-semibold">ID Client:</span> {selectedCustomer.id}</p>
              <p><span className="font-semibold">Total des Commandes:</span> {selectedCustomer.totalOrders}</p>
              <p><span className="font-semibold">Total Dépensé:</span> €{selectedCustomer.totalSpent.toFixed(2)}</p>
              <p><span className="font-semibold">Date de la Dernière Commande:</span> {selectedCustomer.lastOrderDate}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerSection;
