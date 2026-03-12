import { NextResponse } from 'next/server';
import axios from 'axios';
import https from 'node:https';

export const runtime = 'nodejs';

type InstagramMediaItem = {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  caption?: string;
  permalink: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
};

type InstagramProfile = {
  id?: string;
  username?: string;
  account_type?: string;
  media_count?: number;
  followers_count?: number;
  error?: { message?: string; type?: string; code?: number };
};

type InstagramMediaResponse = {
  data?: InstagramMediaItem[];
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
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });

    const profileResponse = await axios.get<InstagramProfile>('https://graph.instagram.com/me', {
      httpsAgent,
      params: {
        fields: 'id,username,account_type,media_count,followers_count',
        access_token: accessToken,
      },
      validateStatus: () => true,
      timeout: 20000,
    });
    const profile = profileResponse.data;

    if (profile.error) {
      return NextResponse.json(
        { error: 'Instagram profile error', details: profile.error },
        { status: profileResponse.status || 400 }
      );
    }

    const mediaResponse = await axios.get<InstagramMediaResponse>('https://graph.instagram.com/me/media', {
      httpsAgent,
      params: {
        fields:
          'id,media_type,media_url,thumbnail_url,caption,permalink,timestamp,like_count,comments_count',
        limit: 30,
        access_token: accessToken,
      },
      validateStatus: () => true,
      timeout: 20000,
    });

    if (mediaResponse.data.error) {
      return NextResponse.json(
        { error: 'Instagram media error', details: mediaResponse.data.error },
        { status: mediaResponse.status || 400 }
      );
    }

    const media = mediaResponse.data.data ?? [];

    const postsWithEngagement = media.map((m) => {
      const likes = m.like_count ?? 0;
      const comments = m.comments_count ?? 0;
      const engagement = likes + comments;
      return { ...m, likes, comments, engagement };
    });

    const totalEngagement = postsWithEngagement.reduce((sum, m) => sum + m.engagement, 0);
    const avgEngagementPerPost =
      postsWithEngagement.length > 0 ? totalEngagement / postsWithEngagement.length : 0;

    const followers = profile.followers_count ?? 0;
    const avgEngagementRate =
      followers > 0 ? (avgEngagementPerPost / followers) * 100 : 0;

    const topPosts = [...postsWithEngagement]
      .sort((a, b) => b.engagement - a.engagement)
      .slice(0, 5);

    // Best days and times to post (based on engagement)
    const byHour = new Map<number, { total: number; count: number }>();
    const byWeekday = new Map<number, { total: number; count: number }>();

    for (const post of postsWithEngagement) {
      const d = new Date(post.timestamp);
      const hour = d.getHours();
      const weekday = d.getDay(); // 0 = Sunday

      const hourEntry = byHour.get(hour) ?? { total: 0, count: 0 };
      hourEntry.total += post.engagement;
      hourEntry.count += 1;
      byHour.set(hour, hourEntry);

      const dayEntry = byWeekday.get(weekday) ?? { total: 0, count: 0 };
      dayEntry.total += post.engagement;
      dayEntry.count += 1;
      byWeekday.set(weekday, dayEntry);
    }

    const bestHours = Array.from(byHour.entries())
      .map(([hour, v]) => ({
        hour,
        avgEngagement: v.total / v.count,
        posts: v.count,
      }))
      .sort((a, b) => b.avgEngagement - a.avgEngagement)
      .slice(0, 5);

    const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const bestWeekdays = Array.from(byWeekday.entries())
      .map(([day, v]) => ({
        dayIndex: day,
        dayName: weekdayNames[day],
        avgEngagement: v.total / v.count,
        posts: v.count,
      }))
      .sort((a, b) => b.avgEngagement - a.avgEngagement)
      .slice(0, 7);

    // Hashtag stats from your own captions
    const hashtagMap = new Map<
      string,
      {
        uses: number;
        totalEngagement: number;
      }
    >();

    for (const post of postsWithEngagement) {
      if (!post.caption) continue;
      const tags = post.caption.match(/#[A-Za-z0-9_]+/g) || [];
      const uniqueTags = Array.from(new Set(tags.map((t) => t.toLowerCase())));

      for (const tag of uniqueTags) {
        const entry = hashtagMap.get(tag) ?? { uses: 0, totalEngagement: 0 };
        entry.uses += 1;
        entry.totalEngagement += post.engagement;
        hashtagMap.set(tag, entry);
      }
    }

    const hashtagStats = Array.from(hashtagMap.entries())
      .map(([tag, v]) => ({
        tag,
        uses: v.uses,
        totalEngagement: v.totalEngagement,
        avgEngagement: v.totalEngagement / v.uses,
      }))
      .sort((a, b) => b.avgEngagement - a.avgEngagement)
      .slice(0, 50);

    return NextResponse.json(
      {
        profile: {
          username: profile.username,
          followers,
          mediaCount: profile.media_count ?? 0,
          accountType: profile.account_type,
        },
        summary: {
          avgEngagementRate,
          avgEngagementPerPost,
          postsAnalyzed: postsWithEngagement.length,
          bestHours,
          bestWeekdays,
        },
        topPosts,
        hashtagStats,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in /api/instagram/analytics:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch Instagram analytics.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

