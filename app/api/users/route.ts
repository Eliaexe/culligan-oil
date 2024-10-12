import { NextResponse } from 'next/server'
import { getUsers, getUserById, updateUser, deleteUser } from '@/lib/db'

import { createUser } from '@/app/actions/user'

import { auth } from '@/auth'

export async function GET(request: Request) {
    const session = await auth()
    console.log(session);

    if (!session || !session.user) {
        return new NextResponse('You are not authenticated', {
            status: 401
        })
    }
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
        const user = await getUserById(id)
        return NextResponse.json(user)
    }

    const users = await getUsers()
    return NextResponse.json(users)
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const user = await createUser(body);
        return NextResponse.json({
            message: 'User created successfully', user: {
                _id: user._id,
                name: user.name,
                surname: user.surname,
                email: user.email
            }
        }, { status: 201 });
    } catch (error) {
        console.error('Error in POST /api/users:', error);
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const data = await request.json()
    const updatedUser = await updateUser(data)
    return NextResponse.json(updatedUser)
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
        await deleteUser(id)
        return NextResponse.json({ message: 'User deleted' })
    }

    return NextResponse.json({ message: 'User ID is required' }, { status: 400 })
}
