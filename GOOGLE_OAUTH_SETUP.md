# Google OAuth Integration Guide

Complete guide to set up and use Google OAuth for login.

## Overview

The UI library includes a Google OAuth login integration. This guide explains how to set it up and customize it.

## Setup Steps

### 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Select "Web application"
6. Add authorized origins:
   - `http://localhost:5173` (development)
   - Your production domain
7. Add authorized redirect URIs:
   - `http://localhost:5173` (development)
   - Your production callback URL
8. Copy your Client ID

### 2. Configure Environment

Create `.env.local`:

```env
REACT_APP_GOOGLE_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
REACT_APP_GOOGLE_REDIRECT_URI=http://localhost:5173
REACT_APP_API_URL=http://localhost:3000/api
```

### 3. Update Backend

Your backend needs to handle the Google OAuth callback:

```javascript
// Backend endpoint: POST /api/auth/google
export const googleLoginHandler = async (req, res) => {
  const { code } = req.body

  try {
    // Exchange code for tokens with Google
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      body: JSON.stringify({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    })

    const tokens = await tokenResponse.json()

    // Get user info from Google
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    })

    const googleUser = await userResponse.json()

    // Find or create user in your database
    let user = await User.findOne({ email: googleUser.email })

    if (!user) {
      user = await User.create({
        email: googleUser.email,
        name: googleUser.name,
        avatar: googleUser.picture,
        provider: 'google',
        googleId: googleUser.id,
      })
    }

    // Generate your app's JWT token
    const token = generateJWT(user)

    return res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        provider: 'google',
      },
      token,
      expiresIn: 86400,
    })
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' })
  }
}
```

## Frontend Integration

### Current Implementation

The `LoginPage.tsx` includes Google OAuth flow:

```tsx
const handleGoogleLogin = async () => {
  const params = new URLSearchParams({
    client_id: GOOGLE_OAUTH_CONFIG.CLIENT_ID,
    redirect_uri: GOOGLE_OAUTH_CONFIG.REDIRECT_URI,
    response_type: 'code',
    scope: GOOGLE_OAUTH_CONFIG.SCOPE,
  })

  // Redirects to Google login
  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
}
```

### Handling Redirect

After Google login, you'll be redirected back to `REDIRECT_URI` with a `code` parameter.

Create a callback page to handle this:

```tsx
// src/pages/GoogleCallbackPage.tsx
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuthStore } from '@services/authStore'
import { loginWithGoogle } from '@services/authService'

export const GoogleCallbackPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const code = searchParams.get('code')

  useEffect(() => {
    if (code) {
      handleCallback(code)
    }
  }, [code])

  const handleCallback = async (authCode: string) => {
    try {
      const response = await loginWithGoogle(authCode)

      useAuthStore.setState({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
      })

      navigate('/dashboard')
    } catch (error) {
      console.error('Google callback error:', error)
      navigate('/login')
    }
  }

  return <div>Processing login...</div>
}
```

## Alternative: Google Sign-In Button

For a more integrated experience, use Google Sign-In library:

### 1. Add Script to HTML

```html
<script async defer src="https://accounts.google.com/gsi/client"></script>
```

### 2. Create Component

```tsx
import { useEffect } from 'react'
import { GOOGLE_OAUTH_CONFIG } from '@constants/config'
import { useAuthStore } from '@services/authStore'

export const GoogleSignInButton = () => {
  useEffect(() => {
    window.google?.accounts.id.initialize({
      client_id: GOOGLE_OAUTH_CONFIG.CLIENT_ID,
      callback: handleCredentialResponse,
    })

    window.google?.accounts.id.renderButton(document.getElementById('google-signin-button'), {
      theme: 'outline',
      size: 'large',
      text: 'signin',
    })
  }, [])

  const handleCredentialResponse = (response: CredentialResponse) => {
    // response.credential is the JWT token
    // Send to your backend to verify and create session

    useAuthStore.setState({
      token: response.credential,
      isAuthenticated: true,
    })
  }

  return <div id="google-signin-button"></div>
}
```

## Security Considerations

### Frontend

✅ **DO:**

- Redirect to Google's official OAuth endpoint
- Use HTTPS in production
- Store tokens securely (httpOnly cookies preferred)
- Validate user data

❌ **DON'T:**

- Store client secret on frontend
- Trust tokens without backend verification
- Skip CSRF protection

### Backend

✅ **DO:**

- Verify authorization code with Google
- Validate token signatures
- Store user info securely
- Use HTTPS

❌ **DON'T:**

- Skip backend verification
- Store passwords for OAuth users
- Trust frontend-provided tokens

## Testing

### Local Testing

```bash
# Start dev server
npm run dev

# Visit http://localhost:5173
# Click "Continue with Google"
# Complete Google login
# Should redirect back to your app
```

### Testing Email Flow

Use the standard email/password flow in `LoginForm` for testing:

- Email: `test@example.com`
- Password: anything (backend validation)

## Troubleshooting

### "Invalid client_id"

- Check `GOOGLE_CLIENT_ID` in `.env.local`
- Verify Client ID from Google Cloud Console
- Check OAuth restrictions

### "Redirect URI mismatch"

- Ensure `REACT_APP_GOOGLE_REDIRECT_URI` matches
- Update Google Cloud Console authorized URIs

### "CORS errors"

- Add your domain to authorized URIs
- Check backend CORS configuration

### "User not redirected back"

- Check backend error logs
- Verify authorization code flow
- Check redirect URI configuration

## Advanced Configuration

### Custom Scopes

Update `GOOGLE_OAUTH_CONFIG` in `src/constants/config.ts`:

```tsx
export const GOOGLE_OAUTH_CONFIG = {
  // ... existing
  SCOPE: 'openid profile email https://www.googleapis.com/auth/drive.readonly',
}
```

### Accessing Google Profile Data

When creating user in database:

```tsx
interface GoogleUser {
  id: string
  email: string
  name: string
  picture: string
  email_verified: boolean
}
```

## Next Steps

1. Set up backend OAuth handler
2. Configure Google Cloud credentials
3. Set environment variables
4. Test login flow
5. Deploy to production with HTTPS
6. Monitor authentication logs

## Resources

- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Sign-In Library](https://developers.google.com/identity/gsi/web)
- [OAuth 2.0 Specification](https://tools.ietf.org/html/rfc6749)
- [JWT Overview](https://jwt.io/introduction)

## Support

For issues:

1. Check Google Cloud Console logs
2. Enable debug logging
3. Verify environment variables
4. Check CORS headers
5. Review backend error logs
