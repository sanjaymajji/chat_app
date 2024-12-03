

**Chat App**

A real-time chat application built using **Socket.IO**, facilitating seamless communication in shared environments and private chat rooms. Designed for scalability, performance, and reliability with modern tools like Docker, NGINX, and Redis.

---

**Features**
- Real-time communication using **Socket.IO**.
- Support for shared chat environments and private chat rooms.
- Scalable architecture with **horizontal scaling**.
- Load balancing via **NGINX**, ensuring traffic distribution and fault tolerance.
- Caching and session management with **Redis** for efficient performance.

---

## **Scalability Highlights**
- **Horizontal Scaling**: Multiple servers handle increased load, avoiding single points of failure.
- **Load Balancing**: Implemented via NGINX with support for sticky sessions and `ip_hash` for consistent user-server mapping.
- **Redis Integration**: Centralized caching and session sharing across servers for seamless communication.

---

## **Technologies Used**
1. **Socket.IO**: Enables real-time bidirectional communication.
2. **Docker**: Simplifies deployment with containerized environments.
3. **NGINX**: Acts as a load balancer, handling traffic distribution and CORS.
4. **Redis**: Serves as a caching layer and session storage backend.

---

## **Installation and Setup**

### Prerequisites
- Docker installed ([Download Docker](https://www.docker.com/)).
- Node.js installed ([Download Node.js](https://nodejs.org/)).

### Steps
1. Clone the repository:
   ```ruby
   git clone https://github.com/sanjaymajji/chat_app.git
   cd chat_app
   ```
2. Build and run the Docker container:
   ```ruby
   docker-compose up --build
   ```
3. Access the application at `http://localhost:3000`.

---

## **Scaling Details**
- **Vertical Scaling**: Maximize server capacity (e.g., increasing memory).
- **Horizontal Scaling**: Leverage multiple servers with NGINX for load balancing and Redis for session consistency.

---

## **Advanced Usage**

### Docker Commands
- List running containers: `docker ps`
- Start a container: `docker start <container_id>`
- Stop a container: `docker stop <container_id>`
- Clean up unused images: `docker system prune -a`

### Redis Commands
- Set key-value pair: `SET key value`
- Get value: `GET key`
- Manage lists: `LPUSH listname value`, `LPOP listname`
- Delete all keys: `FLUSHALL`

---

## **Future Enhancements**
- Expand private chat functionality with advanced security protocols.
- Implement analytics for chat activity monitoring.
- Optimize Redis for real-time event tracking.

---
