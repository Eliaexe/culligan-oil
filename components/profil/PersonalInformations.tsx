"use client"

import { useState } from "react"

export default function PersonalDataForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    shippingAddress: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Logica di gestione dei dati (es. invio al backend)
    console.log(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-8 bg-white text-black rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold">Données Personnelles</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium">Prénom</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border border-black px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium">Nom</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border border-black px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-black px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-black px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>
        <div>
          <label htmlFor="shippingAddress" className="block text-sm font-medium">Adresse de Livraison</label>
          <input
            type="text"
            id="shippingAddress"
            name="shippingAddress"
            value={formData.shippingAddress}
            onChange={handleChange}
            className="w-full border border-black px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>
      </div>
      <button type="submit" className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-white hover:text-black border-2 border-black transition">
        Enregistrer
      </button>
    </form>
  )
}
