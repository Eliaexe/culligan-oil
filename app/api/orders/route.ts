import { NextResponse } from 'next/server'
import { getOrders, createOrder, getOrderById, updateOrder, deleteOrder } from '@/lib/db'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
        const order = await getOrderById(id)
        return NextResponse.json(order)
    }

    const orders = await getOrders()
    return NextResponse.json(orders)
}

export async function POST(request: Request) {
    const data = await request.json()
    const newOrder = await createOrder(data)
    return NextResponse.json(newOrder, { status: 201 })
}

export async function PUT(request: Request) {
    const data = await request.json()
    const updatedOrder = await updateOrder(data)
    return NextResponse.json(updatedOrder)
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
        await deleteOrder(id)
        return NextResponse.json({ message: 'Order deleted' })
    }

    return NextResponse.json({ message: 'Order ID is required' }, { status: 400 })
}
