// Instagram Authentication and API Setup
export interface InstagramCredentials {
  appId: string;
  appSecret: string;
  accessToken: string;
  userId: string;
  businessAccountId?: string;
}

export class InstagramAuth {
  private credentials: InstagramCredentials;

  constructor(credentials: InstagramCredentials) {
    this.credentials = credentials;
  }

  // Step 1: Get Instagram App ID and Secret
  static getSetupInstructions() {
    return {
      step1: {
        title: "Create Instagram App",
        instructions: [
          "Go to https://developers.facebook.com/",
          "Click 'My Apps' → 'Create App'",
          "Select 'Consumer' as app type",
          "Fill in app details and create the app",
          "In the app dashboard, add 'Instagram Basic Display' product"
        ],
        screenshot: "https://developers.facebook.com/docs/instagram-basic-display-api/getting-started"
      },
      step2: {
        title: "Configure Instagram Basic Display",
        instructions: [
          "Go to Instagram Basic Display → Basic Display",
          "Add your website URL (http://localhost:3000 for development)",
          "Add Redirect URI: http://localhost:3000/api/auth/instagram/callback",
          "Save changes and copy your App ID and App Secret"
        ]
      },
      step3: {
        title: "Get User Access Token",
        instructions: [
          "Add yourself as an Instagram Tester in App Roles → Roles",
          "Accept the tester invitation in your Instagram app",
          "Use the authorization URL to get your access token",
          "Exchange authorization code for access token"
        ]
      }
    };
  }

  // Generate Instagram authorization URL
  static generateAuthUrl(appId: string, redirectUri: string = 'http://localhost:3000/api/auth/instagram/callback'): string {
    const baseUrl = 'https://api.instagram.com/oauth/authorize';
    const params = new URLSearchParams({
      client_id: appId,
      redirect_uri: redirectUri,
      scope: 'user_profile,user_media',
      response_type: 'code'
    });
    
    return `${baseUrl}?${params.toString()}`;
  }

  // Exchange authorization code for access token
  static async exchangeCodeForToken(code: string, appId: string, appSecret: string, redirectUri: string) {
    try {
      const response = await fetch('https://api.instagram.com/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: appId,
          client_secret: appSecret,
          grant_type: 'authorization_code',
          redirect_uri: redirectUri,
          code: code
        })
      });

      const data = await response.json();
      
      if (data.access_token) {
        // Get long-lived token
        const longLivedToken = await this.getLongLivedToken(data.access_token, appSecret);
        return {
          accessToken: longLivedToken.access_token,
          userId: data.user_id,
          expiresIn: longLivedToken.expires_in
        };
      }
      
      throw new Error('Failed to get access token');
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      throw error;
    }
  }

  // Get long-lived access token (60 days)
  static async getLongLivedToken(shortLivedToken: string, appSecret: string) {
    try {
      const response = await fetch(
        `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${appSecret}&access_token=${shortLivedToken}`
      );
      
      return await response.json();
    } catch (error) {
      console.error('Error getting long-lived token:', error);
      throw error;
    }
  }

  // Refresh access token
  async refreshToken(): Promise<string> {
    try {
      const response = await fetch(
        `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${this.credentials.accessToken}`
      );
      
      const data = await response.json();
      this.credentials.accessToken = data.access_token;
      
      return data.access_token;
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  }

  // Validate current access token
  async validateToken(): Promise<boolean> {
    try {
      const response = await fetch(
        `https://graph.instagram.com/me?fields=id,username&access_token=${this.credentials.accessToken}`
      );
      
      const data = await response.json();
      return !data.error;
    } catch (error) {
      console.error('Error validating token:', error);
      return false;
    }
  }

  // Get user profile info
  async getUserProfile() {
    try {
      const response = await fetch(
        `https://graph.instagram.com/me?fields=id,username,account_type,media_count&access_token=${this.credentials.accessToken}`
      );
      
      return await response.json();
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  }
}

// Instagram Business API (for advanced features)
export class InstagramBusinessAPI {
  private accessToken: string;
  private businessAccountId: string;

  constructor(accessToken: string, businessAccountId: string) {
    this.accessToken = accessToken;
    this.businessAccountId = businessAccountId;
  }

  // Get business account insights
  async getAccountInsights(period: 'day' | 'week' | 'days_28' = 'week') {
    try {
      const metrics = 'follower_count,reach,impressions,profile_views';
      const response = await fetch(
        `https://graph.facebook.com/v18.0/${this.businessAccountId}/insights?metric=${metrics}&period=${period}&access_token=${this.accessToken}`
      );
      
      return await response.json();
    } catch (error) {
      console.error('Error getting account insights:', error);
      throw error;
    }
  }

  // Get media insights
  async getMediaInsights(mediaId: string) {
    try {
      const metrics = 'likes,comments,shares,saves,reach,impressions';
      const response = await fetch(
        `https://graph.facebook.com/v18.0/${mediaId}/insights?metric=${metrics}&access_token=${this.accessToken}`
      );
      
      return await response.json();
    } catch (error) {
      console.error('Error getting media insights:', error);
      throw error;
    }
  }

  // Create media container for posting
  async createMediaContainer(imageUrl: string, caption: string) {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v18.0/${this.businessAccountId}/media`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image_url: imageUrl,
            caption: caption,
            access_token: this.accessToken
          })
        }
      );
      
      return await response.json();
    } catch (error) {
      console.error('Error creating media container:', error);
      throw error;
    }
  }

  // Publish media
  async publishMedia(creationId: string) {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v18.0/${this.businessAccountId}/media_publish`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            creation_id: creationId,
            access_token: this.accessToken
          })
        }
      );
      
      return await response.json();
    } catch (error) {
      console.error('Error publishing media:', error);
      throw error;
    }
  }
}


