
<h1>Chat X</h1>

A real-time chat application built using **Socket.IO**, facilitating seamless communication in shared environments and private chat rooms. Designed for scalability, performance, and reliability with modern tools like Docker, NGINX, and Redis.

---

## **Features**
- Real-time communication using **Socket.IO**.
- Support for shared chat environments and private chat rooms.
- Scalable architecture with **horizontal scaling**.
- Load balancing via **NGINX**, ensuring traffic distribution and fault tolerance.
- Caching and session management with **Redis** for efficient performance.

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
- Redis installed (see instructions below).

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/sanjaymajji/chat_app.git
   cd chat_app
   ```
2. Build and run the Docker container:
   ```bash
   docker-compose up --build
   ```
3. Access the application at `http://localhost:3000`.

---

## **Redis Installation**

### **For Windows**
1. Download Redis for Windows from the GitHub repository:
   [tporadowski/redis/releases](https://github.com/tporadowski/redis/releases).
2. Extract the files to a folder (e.g., `C:\Redis`).
3. Add the Redis folder to your system's PATH environment variable:
   - Open **Control Panel > System > Advanced System Settings > Environment Variables**.
   - Under **System Variables**, find and edit the `Path` variable.
   - Add the path to your Redis folder (e.g., `C:\Redis`).
4. Open Command Prompt and test the installation:
   ```bash
   redis-server
   redis-cli
   ```
   You should see the Redis CLI prompt if installed correctly.

### **For Linux**
1. Update your package list and install Redis:
   ```bash
   sudo apt update
   sudo apt install redis-server
   ```
2. Start the Redis server:
   ```bash
   sudo systemctl start redis
   ```
3. Enable Redis to start on boot:
   ```bash
   sudo systemctl enable redis
   ```
4. Test the installation:
   ```bash
   redis-cli ping
   ```
   You should see `PONG` if Redis is running correctly.

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

