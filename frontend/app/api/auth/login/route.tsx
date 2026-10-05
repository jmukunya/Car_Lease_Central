import { NextResponse } from 'next/server';
import { apiRequest } from '../../../../lib/actions';

export const POST = async (request: Request) => {
    try {
        const credentials = await request.json();

        //Authenticate with the backend
        const backendRes = await apiRequest('http://localhost:4000/auth/login', 'POST', credentials);

        if (!backendRes) {
            return NextResponse.json(
                { error: 'Unauthorised' },
                { status: 401 });
        }

        //Expecting backend to return both access and refresh tokens
        const { tokens, user } = await backendRes;
        const {accessToken, refreshToken } = await tokens;

        //  backendRes = NextResponse.json({ success: true });

        // Set the short-lived access token cookie
        backendRes.cookies.set('access_token', accessToken);

        //Set the long-lived refresh token
        backendRes.cookies.set('refresh_token', refreshToken);

        //Set user info
        backendRes.cookies.set('user_id', user.id);
        backendRes.cookies.set('user_role', user.role);
        backendRes.cookies.set('user_status', user.status);

        return NextResponse.json({backendRes});

    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }

}
