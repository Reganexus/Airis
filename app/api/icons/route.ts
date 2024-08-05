// pages/api/icons.ts

import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const imgList = await list();
    console.log("IMAGE ICONS: ", imgList);

    return NextResponse.json({ icons: imgList });
  } catch (error) {
    console.error('Error fetching icons:', error);
    return NextResponse.error();
  }
}
