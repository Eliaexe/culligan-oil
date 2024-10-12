"use client"

import { Product } from "@/components/dashboard/ProductsSection"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import ProductForm from "@/components/dashboard/ProductForm"
import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"

export default function ProductTable({ products, setProducts }: { products: Product[], setProducts: React.Dispatch<React.SetStateAction<Product[]>> }) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const handleEditProduct = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!editingProduct) return
    const formData = new FormData(event.currentTarget)
    const updatedProduct: Product = {
      ...editingProduct,
      name: formData.get("name") as string,
      price: parseFloat(formData.get("price") as string),
      description: formData.get("description") as string,
    }
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p))
    setIsEditDialogOpen(false)
    setEditingProduct(null)
  }

  const handleDeleteProduct = (_id: number) => {
    setProducts(products.filter(p => p._id !== _id))
  }

  return (
    <Table className="bg-white text-black border border-black">
      <TableHeader>
        <TableRow>
          <TableHead className="border border-black">Nome</TableHead>
          <TableHead className="border border-black">Prezzo</TableHead>
          <TableHead className="border border-black">Categoria</TableHead>
          <TableHead className="border border-black">Azioni</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product._id} className="border border-black">
            <TableCell className="border border-black">{product.name}</TableCell>
            <TableCell className="border border-black">€{product.price.toFixed(2)}</TableCell>
            <TableCell className="border border-black">{product.category}</TableCell>
            <TableCell className="border border-black">
              <div className="flex space-x-2">
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon" onClick={() => setEditingProduct(product)} className="bg-white text-black border border-black">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Modifica Prodotto</DialogTitle>
                    </DialogHeader>
                    {editingProduct && (
                      <ProductForm product={editingProduct} onSubmit={handleEditProduct} />
                    )}
                  </DialogContent>
                </Dialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="icon" className="bg-white text-black border border-black">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Sei sicuro di voler eliminare questo prodotto?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Questa azione non può essere annullata. Il prodotto verrà permanentemente rimosso dal database.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annulla</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteProduct(product._id)}>Elimina</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
