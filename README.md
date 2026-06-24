# wa-tech-assignment

Backend API built with Node.js + Express + TypeScript, featuring mocked authentication, SWAPI integration, Redis caching, and protected routes.

Start by:
npm install
docker compose up --build

Run tests with: npm test
Linting: npm run lint
Formatting: npm run format

Design decisions / trade-offs

1. Mocked authentication
   Authentication is fully mocked (no DB / no JWT library).

- faster development
- focus on API structure
- not production secure

2. Redis caching
   Redis used for caching SWAPI responses:

- reduces external API calls
- improves response time
- TTL-based cache (15 minutes)
  Trade-off:
- added complexity for simple assignment
- requires external service running

3. Testing strategy
   Jest used for unit tests:

- middleware tested in isolation
  Trade-off:
- no full HTTP flow testing

Authentication flow
The authentication system is mocked and stateless:

- POST /auth/login - returns fake accessToken and refreshToken
- POST /auth/logout - returns 204
- POST /auth/refresh - returns fake new accessToken
- Protected route (/favourites) uses middleware to validate token

On 401 Unauthorized:

- client calls POST /auth/refresh
- receives new access token
- retries original request once
- If refresh fails then the user is unauthorized
