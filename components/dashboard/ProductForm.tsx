"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Product } from "@/components/dashboard/ProductsSection"
import { useState } from "react"

export default function ProductForm({ product, onSubmit }: { product?: Product, onSubmit: (event: React.FormEvent<HTMLFormElement>) => void }) {
  const [imageUrl, setImageUrl] = useState<string>(product?.image || ""); // Usa stringa per l'URL dell'immagine

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name" className="text-black">Nom du produit</Label>
        <Input id="name" name="name" defaultValue={product?.name} required className="bg-white text-black border border-black" />
      </div>
      <div>
        <Label htmlFor="price" className="text-black">Prix</Label>
        <Input id="price" name="price" type="number" step="0.01" defaultValue={product?.price} required className="bg-white text-black border border-black" />
      </div>
      <div>
        <Label htmlFor="description" className="text-black">Description</Label>
        <textarea 
          id="description" 
          name="description" 
          defaultValue={product?.description} 
          required 
          className="bg-white text-black border border-black w-full h-24" 
        />
      </div>
      <div>
        <Label htmlFor="imageUrl" className="text-black">URL de l'image</Label>
        <Input 
          id="imageUrl" 
          name="image" // Rimane "image" per mantenere la compatibilità con il backend
          type="text" 
          value={imageUrl} 
          onChange={(e) => setImageUrl(e.target.value)} // Aggiorna lo stato con l'URL dell'immagine
          required 
          className="bg-white text-black border border-black" 
        />
      </div>
      <Button type="submit" className="bg-black text-white">Sauvegarder</Button>

      {imageUrl && (
        <p className="text-black">
          URL de l'image: {imageUrl}
        </p>
      )}
    </form>
  )
}
