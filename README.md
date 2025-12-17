# Project Report: Securing a Spring Boot & React Application with Keycloak

## Introduction

This project demonstrates how to secure a distributed application composed of a **Spring Boot** backend and a **React** frontend using **Keycloak** as an Identity and Access Management (IAM) solution.

### Technologies Used

*   **Spring Boot**: A Java-based framework used for building the backend REST API. It provides a robust and production-ready environment.
*   **ReactJS**: A JavaScript library for building the user interface. It communicates with the backend API and handles user interactions.
*   **Keycloak**: An open-source Identity and Access Management solution. It handles authentication and authorization, allowing us to implement Single Sign-On (SSO) and secure the application without writing complex security code.
*   **Docker**: Used to run Keycloak in an isolated container, ensuring a consistent environment and easy setup.

---

## Architecture

The application follows a modern decoupled architecture:

1.  **Keycloak (Identity Provider)**: Runs in a Docker container on port `8080`. It manages users, roles, and realms.
2.  **Spring Boot (Resource Server)**: Runs on port `8081`. It exposes protected API endpoints. It validates the JWT (JSON Web Token) sent by the frontend against Keycloak.
3.  **React (Client)**: Runs on port `5173`. It initiates the login flow with Keycloak to obtain an Access Token, which is then included in the Authorization header of requests sent to the Spring Boot backend.

**Flow:**
1.  User accesses the React App.
2.  React detects no active session and redirects the user to Keycloak login page.
3.  User authenticates. Keycloak redirects back to React with an Authorization Code.
4.  React exchanges the code for an Access Token (JWT).
5.  React requests data from Spring Boot API, sending the Access Token in the header.
6.  Spring Boot validates the token with Keycloak and serves the resource.

---

## Configuration & Setup

### 1. Keycloak (Docker)

Keycloak is running in a Docker container.

**Command to start Keycloak:**
```bash
docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:latest start-dev
```

**Keycloak Configuration (Admin Console):**
*   **Realm**: `enset-realm`
*   **Client**: `react-client`
    *   **Client Protocol**: openid-connect
    *   **Access Type**: Public
    *   **Valid Redirect URIs**: `http://localhost:5173/*`
    *   **Web Origins**: `http://localhost:5173`

### 2. Spring Boot Backend

The backend is configured as a Resource Server.

**Dependencies (`pom.xml`):**
*   `spring-boot-starter-web`
*   `spring-boot-starter-security`
*   `spring-boot-starter-oauth2-resource-server`

**Configuration (`src/main/resources/application.properties`):**
Note that the server runs on port **8081** to avoid conflict with Keycloak.

```properties
spring.application.name=spring-boot-react-keycloak-app
server.port=8081
spring.h2.console.enabled=true
spring.datasource.url=jdbc:h2:mem:elearningdb

# Keycloak Issuer URL for Token Validation
spring.security.oauth2.resourceserver.jwt.issuer-uri=http://localhost:8080/realms/enset-realm
```

**Security Configuration (`SecurityConfig.java`):**
Configures CORS to allow the frontend and enables JWT validation.

```java
@Configuration
public class SecurityConfig {
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(Customizer.withDefaults())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/public/**").permitAll()
                .anyRequest().authenticated())
            .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()));
        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:5173"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
```

### 3. React Frontend

The frontend uses `keycloak-js` to manage the OpenID Connect flow.

**Dependencies (`package.json`):**
*   `keycloak-js`
*   `react-router-dom`
*   `axios`

**Client Configuration (`src/keycloak.js`):**

```javascript
import Keycloak from "keycloak-js";

const keycloakConfig = {
    url: "http://localhost:8080/",
    realm: "enset-realm",
    clientId: "react-client",
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
```

**Authentication Context (`src/context/KeycloakContext.jsx`):**
Initializes Keycloak when the app starts.

```javascript
useEffect(() => {
    // Initialize Keycloak
    keycloak
        .init({
            onLoad: "login-required",
            checkLoginIframe: false,
        })
        .then((auth) => {
            setAuthenticated(auth);
            if (auth) {
                setCurrentUser(keycloak.tokenParsed);
            }
            setLoading(false);
        })
        // ... error handling
}, []);
```

---

## How to Run

1.  **Start Keycloak**: Ensure the Docker container is running.
2.  **Start Backend**:
    ```bash
    ./mvnw spring-boot:run
    ```
3.  **Start Frontend**:
    ```bash
    cd learnapp-frontend
    npm run dev
    ```
4.  **Access the App**: Open your browser at `http://localhost:5173`. You will be redirected to Keycloak for login.
