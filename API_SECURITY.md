# API Security Documentation

## 🔐 Authentication Required

All API endpoints (except auth endpoints) require authentication via Auth.js session.

## 📋 Protected Endpoints

### Users Management

- `GET /api/users` - List all users (authenticated users only)
- `POST /api/users` - Create new user (authenticated users only)
- `GET /api/users/[id]` - Get specific user (own profile or admin only)
- `DELETE /api/users/[id]` - Delete user (admin only)

### Profile Management

- `GET /api/profile` - Get current user profile
- `PUT /api/profile` - Update current user profile
- `PUT /api/profile/password` - Change password

## 🛡️ Security Features

### Authentication Check

```typescript
import { checkAuth } from "@/lib/auth-middleware";

export async function GET() {
  const authError = await checkAuth();
  if (authError) return authError;

  // Your protected logic here
}
```

### Get Current User

```typescript
import { getCurrentUser } from "@/lib/auth-middleware";

export async function GET() {
  try {
    const user = await getCurrentUser();
    // User is guaranteed to be authenticated
  } catch (error) {
    // Handle authentication error
  }
}
```

## 🔑 Authorization Levels

### 1. **Authenticated Users**

- Can access basic endpoints
- Can view/edit own profile
- Can create new users

### 2. **Admin Users**

- All authenticated user permissions
- Can view any user profile
- Can delete users (except themselves)
- Admin check: `user.email === 'admin@example.com'`

## 🚫 Error Responses

### 401 Unauthorized

```json
{
  "error": "Unauthorized - Please log in"
}
```

### 403 Forbidden

```json
{
  "error": "Forbidden - Admin access required"
}
```

### 400 Bad Request

```json
{
  "error": "Email and password are required"
}
```

## 🔒 Password Security

- Passwords hashed with bcrypt (12 rounds)
- Passwords never returned in API responses
- Password change requires current password verification
- Minimum 6 characters for new passwords

## 📝 Usage Examples

### Get Current User Profile

```bash
curl -H "Cookie: authjs.session-token=..." \
     http://localhost:3000/api/profile
```

### Create New User (Admin)

```bash
curl -X POST \
     -H "Content-Type: application/json" \
     -H "Cookie: authjs.session-token=..." \
     -d '{"email":"new@example.com","name":"New User","password":"secure123"}' \
     http://localhost:3000/api/users
```

### Change Password

```bash
curl -X PUT \
     -H "Content-Type: application/json" \
     -H "Cookie: authjs.session-token=..." \
     -d '{"currentPassword":"old123","newPassword":"new123"}' \
     http://localhost:3000/api/profile/password
```

## ⚠️ Security Notes

1. **Never expose passwords** in API responses
2. **Always validate input** before processing
3. **Use HTTPS** in production
4. **Implement rate limiting** for production
5. **Log security events** for monitoring
6. **Regular security audits** recommended
