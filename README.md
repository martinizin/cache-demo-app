# Spring Boot Cache Demo - Frontend

A minimal React + Vite frontend for testing Spring Boot backend caching performance.

## Project info

**URL**: https://lovable.dev/projects/d010819c-1fe5-4cca-a2a3-20d4dd2a6b70

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/d010819c-1fe5-4cca-a2a3-20d4dd2a6b70) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/d010819c-1fe5-4cca-a2a3-20d4dd2a6b70) and click on Share -> Publish.

## Integration Guide

### Prerequisites
- Node.js & npm installed ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- Spring Boot backend running on `http://localhost:8080`

### Quick Start

1. **Clone and install dependencies:**
```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
```

2. **Start the development server:**
```sh
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Testing the Cache

1. **Start your Spring Boot backend:**
```sh
./mvnw spring-boot:run
```

2. **Access the frontend at `http://localhost:5173`**

3. **Test cache behavior:**
   - Enter an item ID (e.g., `1`) and click "Fetch Item"
   - **First request**: Will be slow (~800ms) - Cache Miss with red/orange badge
   - **Second request with same ID**: Will be fast (<50ms) - Cache Hit with green badge

4. **Observe the metrics:**
   - **Client Time (clientMs)**: Total round-trip time measured by the browser
   - **Server Time (serverMs)**: Backend processing time from `X-Server-TimeMs` header
   - Color-coded badges indicate cache hits (green) vs misses (yellow)

### CORS Configuration

This project uses a **dev proxy** to avoid CORS issues during development:

**vite.config.ts:**
```typescript
server: {
  proxy: {
    "/api": {
      target: "http://localhost:8080",
      changeOrigin: true,
      secure: false,
    },
  },
}
```

#### Alternative CORS Approaches:

**Option A: @CrossOrigin annotation** (on backend controller)
```java
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
@RestController
@RequestMapping("/api/items")
public class ItemController { ... }
```

**Option B: Global CORS Configuration** (on backend)
```java
@Configuration
public class CorsConfig {
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:5173", "http://localhost:3000"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        config.setAllowedHeaders(List.of("*"));
        config.setExposedHeaders(List.of("X-Server-TimeMs"));
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", config);
        return source;
    }
}
```

### Environment Variables

Create a `.env` file in the project root:
```
VITE_API_URL=http://localhost:8080
```

### Backend API Summary

The backend provides:
- `GET /api/items/{id}` - Fetches an item (cached after first request)
  - Returns: JSON item object
  - Header: `X-Server-TimeMs` - Server processing time in milliseconds
- `DELETE /api/items/{id}/cache` - Evicts cache entry for testing

**Cache Behavior:**
- First call for an ID: ~800ms (simulated latency) - Cache Miss
- Subsequent calls: <50ms - Cache Hit
- Cached using `@Cacheable(cacheNames="items", key="#id")`

### Verification Checklist

✅ Backend running on port 8080  
✅ Frontend running on port 5173  
✅ First fetch shows high serverMs (~800ms) with "Cache Miss" badge  
✅ Second fetch of same ID shows low serverMs (<50ms) with "Cache Hit" badge  
✅ JSON response displays correctly  
✅ Client timing (clientMs) includes network latency  
✅ Server timing (serverMs) from `X-Server-TimeMs` header  

### Troubleshooting

**CORS errors in browser console:**
- Ensure dev proxy is configured in `vite.config.ts`
- Or add `@CrossOrigin` to backend controller
- Check that backend allows the frontend origin

**Backend not responding:**
- Verify backend is running: `curl -i http://localhost:8080/api/items/1`
- Check backend port is 8080
- Ensure no firewall blocking

**Cache not working:**
- Verify `@EnableCaching` is on the Spring Boot main class
- Check `@Cacheable` annotation on service method
- Look for cache-related logs in backend console

---

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
