import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductForm from "./ProductForm";

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string; // Aggiungi il campo 'image' qui
};

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const productData = {
      name: formData.get('name') as string,
      price: parseFloat(formData.get('price') as string),
      description: formData.get('description') as string,
      image: formData.get('image') as string, // Assicurati che l'input per l'immagine sia un URL
    };

    try {
      const response = selectedProduct
        ? await fetch(`/api/products?id=${selectedProduct._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...productData, _id: selectedProduct._id }),
          })
        : await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData),
          });

      if (!response.ok) throw new Error(selectedProduct ? 'Failed to update product' : 'Failed to create product');

      fetchProducts();
      setIsModalOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDelete = async (_id: string) => {    
    try {
      const response = await fetch(`/api/products?id=${_id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete product');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="space-y-4 p-6">
      {/* Bottone per aggiungere un prodotto */}
      <Button onClick={() => { setSelectedProduct(null); setIsModalOpen(true); }}>
        <Plus className="mr-2" /> Aggiungi Prodotto
      </Button>

      {/* Tabella dei prodotti */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">€{product.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Button
                    onClick={() => { setSelectedProduct(product); setIsModalOpen(true); }}
                    className="mr-2"
                  >
                    Modifica
                  </Button>
                  <Button
                    onClick={() => handleDelete(product._id)}
                    variant="destructive"
                  >
                    Elimina
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal per aggiungere/modificare prodotti */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {selectedProduct ? "Modifica Prodotto" : "Aggiungi Prodotto"}
            </h2>
            <ProductForm
              product={selectedProduct || undefined}
              onSubmit={handleSubmit}
            />
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 px-4 py-2 bg-black text-white rounded"
            >
              Chiudi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
