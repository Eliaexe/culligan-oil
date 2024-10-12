import { NextResponse } from 'next/server'
import { getProducts, createProduct, getProductById, updateProduct, deleteProduct } from '@/lib/db'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')  

    if (id) {
        const product = await getProductById(id)
        return NextResponse.json(product)
    }

    const products = await getProducts()
    
    return NextResponse.json(products)
}

export async function POST(request: Request) {
    const data = await request.json()
    const newProduct = await createProduct(data)
    return NextResponse.json(newProduct, { status: 201 })
}

export async function PUT(request: Request) {
    const data = await request.json()
    console.log(data);
    
    const updatedProduct = await updateProduct(data)
    return NextResponse.json(updatedProduct)
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
        await deleteProduct(id)
        return NextResponse.json({ message: 'Product deleted' })
    }

    return NextResponse.json({ message: 'Product ID is required' }, { status: 400 })
}
