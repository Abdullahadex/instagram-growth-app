# Instagram Growth App

Development:


Then open:
- http://localhost:4000/auth/facebook/login (connect your account)
- Use returned long-lived token to set FB_LONG_USER_TOKEN in .env
- GET /facebook/pages to list pages and grab a page token
- Set FB_PAGE_ID and FB_PAGE_TOKEN in .env
- Set IG_BUSINESS_ID (from /facebook/page/:pageId/ig)

Example endpoints:
- GET /instagram/discover/scream_in_vowels
- GET /instagram/me
