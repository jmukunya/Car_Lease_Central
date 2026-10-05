import { NextResponse } from 'next/server';
import { endSession, } from '../../../../lib/actions';

export async function POST() {
    await endSession();
    // const response =  NextResponse.json({ success: true, message: 'Logged out successfully' });
    // NextResponse.redirect('/login');
}