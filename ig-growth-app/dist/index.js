import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 4000;
const FB_API_VERSION = 'v21.0';
function requiredEnv(vars) {
    const missing = vars.filter((v) => !process.env[v]);
    if (missing.length) {
        throw new Error(`Missing env: ${missing.join(', ')}`);
    }
}
function buildUrl(path, params = {}) {
    const url = new URL(`https://graph.facebook.com/${FB_API_VERSION}/${path}`);
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined)
            url.searchParams.set(key, String(value));
    });
    return url.toString();
}
app.get('/', (_req, res) => {
    res.json({ status: 'ok' });
});
// 1) Begin OAuth: redirect to Facebook Login
app.get('/auth/facebook/login', (_req, res) => {
    requiredEnv(['FB_APP_ID', 'FB_REDIRECT_URI']);
    const appId = process.env.FB_APP_ID;
    const redirect = process.env.FB_REDIRECT_URI;
    const scopes = [
        'pages_show_list',
        'pages_read_engagement',
        'pages_manage_metadata',
        'instagram_basic',
        'instagram_manage_insights',
    ].join(',');
    const loginUrl = new URL(`https://www.facebook.com/${FB_API_VERSION}/dialog/oauth`);
    loginUrl.searchParams.set('client_id', appId);
    loginUrl.searchParams.set('redirect_uri', redirect);
    loginUrl.searchParams.set('scope', scopes);
    loginUrl.searchParams.set('response_type', 'code');
    res.redirect(loginUrl.toString());
});
// 2) OAuth callback: exchange code -> short-lived user token, then long-lived
app.get('/auth/facebook/callback', async (req, res) => {
    try {
        requiredEnv(['FB_APP_ID', 'FB_APP_SECRET', 'FB_REDIRECT_URI']);
        const code = req.query.code;
        if (!code)
            return res.status(400).send('Missing code');
        const tokenUrl = buildUrl('oauth/access_token', {
            client_id: process.env.FB_APP_ID,
            client_secret: process.env.FB_APP_SECRET,
            redirect_uri: process.env.FB_REDIRECT_URI,
            code,
        });
        const shortResp = await fetch(tokenUrl);
        const shortData = await shortResp.json();
        if (!shortResp.ok)
            return res.status(500).json(shortData);
        const exchangeUrl = buildUrl('oauth/access_token', {
            grant_type: 'fb_exchange_token',
            client_id: process.env.FB_APP_ID,
            client_secret: process.env.FB_APP_SECRET,
            fb_exchange_token: shortData.access_token,
        });
        const longResp = await fetch(exchangeUrl);
        const longData = await longResp.json();
        if (!longResp.ok)
            return res.status(500).json(longData);
        res.json({
            message: 'Authenticated. Save this long-lived user token server-side.',
            long_lived_user_token: longData.access_token,
            expires_in: longData.expires_in,
        });
    }
    catch (err) {
        res.status(500).json({ error: err?.message || 'unknown error' });
    }
});
// 3) List pages to pick one and get a Page token
app.get('/facebook/pages', async (_req, res) => {
    try {
        requiredEnv(['FB_LONG_USER_TOKEN']);
        const url = buildUrl('me/accounts', { access_token: process.env.FB_LONG_USER_TOKEN });
        const r = await fetch(url);
        const j = await r.json();
        res.status(r.ok ? 200 : 500).json(j);
    }
    catch (err) {
        res.status(500).json({ error: err?.message || 'unknown error' });
    }
});
// 4) Get IG Business Account ID for a Page
app.get('/facebook/page/:pageId/ig', async (req, res) => {
    try {
        requiredEnv(['FB_PAGE_TOKEN']);
        const { pageId } = req.params;
        const url = buildUrl(pageId, {
            fields: 'instagram_business_account',
            access_token: process.env.FB_PAGE_TOKEN,
        });
        const r = await fetch(url);
        const j = await r.json();
        res.status(r.ok ? 200 : 500).json(j);
    }
    catch (err) {
        res.status(500).json({ error: err?.message || 'unknown error' });
    }
});
// 5) Business discovery by username (e.g., scream_in_vowels)
app.get('/instagram/discover/:username', async (req, res) => {
    try {
        requiredEnv(['IG_BUSINESS_ID', 'FB_PAGE_TOKEN']);
        const { username } = req.params;
        const fields = `business_discovery.username(${username}){id,username,followers_count,follows_count,media_count,profile_picture_url}`;
        const url = buildUrl(process.env.IG_BUSINESS_ID, {
            fields,
            access_token: process.env.FB_PAGE_TOKEN,
        });
        const r = await fetch(url);
        const j = await r.json();
        res.status(r.ok ? 200 : 500).json(j);
    }
    catch (err) {
        res.status(500).json({ error: err?.message || 'unknown error' });
    }
});
// 6) Own account info and recent media
app.get('/instagram/me', async (_req, res) => {
    try {
        requiredEnv(['IG_BUSINESS_ID', 'FB_PAGE_TOKEN']);
        const infoUrl = buildUrl(process.env.IG_BUSINESS_ID, {
            fields: 'id,username,profile_picture_url',
            access_token: process.env.FB_PAGE_TOKEN,
        });
        const mediaUrl = buildUrl(`${process.env.IG_BUSINESS_ID}/media`, {
            fields: 'id,caption,media_type,media_url,permalink,timestamp',
            access_token: process.env.FB_PAGE_TOKEN,
        });
        const [ri, rm] = await Promise.all([fetch(infoUrl), fetch(mediaUrl)]);
        const [ji, jm] = await Promise.all([ri.json(), rm.json()]);
        res.status(ri.ok && rm.ok ? 200 : 500).json({ account: ji, media: jm });
    }
    catch (err) {
        res.status(500).json({ error: err?.message || 'unknown error' });
    }
});
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map