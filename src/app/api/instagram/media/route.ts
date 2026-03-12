import { NextResponse } from 'next/server';
import axios from 'axios';
import https from 'node:https';

export const runtime = 'nodejs';

type InstagramResponse = {
  data?: unknown[];
  error?: { message?: string; type?: string; code?: number };
};

export async function GET() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!accessToken) {
    return NextResponse.json(
      { error: 'Instagram API is not configured. Set INSTAGRAM_ACCESS_TOKEN.' },
      { status: 500 }
    );
  }

  try {
    const response = await axios.get<InstagramResponse>('https://graph.instagram.com/me/media', {
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      params: {
        fields:
          'id,media_type,media_url,thumbnail_url,caption,permalink,timestamp,like_count,comments_count',
        limit: 30,
        access_token: accessToken,
      },
      validateStatus: () => true,
      timeout: 20000,
    });
    const data = response.data;

    if (data.error) {
      return NextResponse.json(
        { error: 'Instagram API error', details: data.error },
        { status: response.status || 400 }
      );
    }

    return NextResponse.json({ data: data.data ?? [], raw: data }, { status: 200 });
  } catch (error) {
    console.error('Error in /api/instagram/media:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch Instagram media.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

