import { NextResponse } from 'next/server';

export async function GET() {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://10.0.2.20:8000';

    try {
        const res = await fetch(`${backendUrl}/api/hello`, {
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error(`Backend responded with ${res.status}`);
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Backend fetch error:', error);
        return NextResponse.json(
            { error: 'Failed to connect to backend' },
            { status: 502 }
        );
    }
}
