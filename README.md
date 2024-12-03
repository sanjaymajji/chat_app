WEBSOCKET


SCALING
When we think of large scale, we need multiple servers to be able to handle a lot of load. We have 2 types of scaling, vertical and horizontal scaling. 
Vertical scaling basically is like we’re having 1 server and we’re trying to maximize the output of that server, for example, increasing memory, RAM, etc. It’s easy to create it but it’s a single point of failure. If that server fails, the whole system goes down. 
In case of horizontal scaling, we’re having multiple same servers that handle the load. There’s no single point of failure. Even if 1 server goes down, we have another similar server to handle the situation/ functioning of the entire system. When working on horizontal scaling, we’ll come across load balancing, where a load balancer sends requests from client to server in a specific manner. It distributes the traffic to multiple servers equally so that no single server gets a lot of load which can lead to failure. 
There are several load balancing techniques such as round-robin, least_conn, least_time, etc. There’s also a concept of sticky sessions.Sticky sessions basically means, when we first connect to the server, it notes the IP address of the client, and when the same client sends another request to the servers, it goes to the same server as before. So we must handle sticky sessions as well. 



Scaling HTTP and WebSocket
For HTTP, when the number of users increases, we need to create and destroy each TCP connection/ each time the client sends a request. For websockets, we need to maintain a large number of open websocket connections to the server, which is resource consuming. For HTTP, we can apply load balancing easily because we do not need to store client IP addresses to the server. But for websockets, we need to know which client asked the request. HTTP can pass firewalls but websockets can’t, because websockets are not aware of firewalls.

Sockets are of 2 types, long polling and websockets. In long polling, we first send a connection to the server and wait for the server to send a response. Once the server sends a response, it’s sent to the client and again the connection is made to the server immediately. This way, the application can receive data/events from the server anytime because we always have an open request waiting for the server’s response. In websocket, first the connection is made to the server normally, then if the server says that it supports websocket, then the permanent websocket connection is made. If it doesn’t support it, then it continues long polling. 




Proxy servers
Proxy is the intermediate between client and server.
Forward proxy
Reverse proxy

In a forward proxy, the proxy sits in front of the client. It ensures that no server communicates directly with the client.
In reverse proxy, the proxy sits in front of the server. It ensures that no client communicates directly with the server. 


What are the uses of forward proxy?
To avoid browsing restrictions
To block access to certain content - Some organizations have private proxies, they’re used to hide some content like facebook posts(eg). They don’t send content from facebook to the client as proxy blocks them. These proxies refuse to forward responses related to facebook here.
To protect their identity online - When proxy is used, and when organizations try to track the user, the IP address of client won’t be shown, rather IP address of proxy would be shown to the server.

What are the uses of reverse proxy?
Load balancing - They can offer many load balancing solutions.
Global Server Load Balancing - Sends the request to the server which is geographically closest to the client, minimizing travel time.
Protection from attacks - The attackers can’t track the server IP address
Cache - Reverse proxy can store cache. When one client gets a response from one server, they get temporarily cached.
Encryption/decryption - They encrypt the request and send it to the server. And decrypt the response and send it to the client.











Docker
It’s a way to pack our application with all the necessary dependencies, configurations, version, etc to make deployment efficient. The packed stuff is called an image.
Container repository - storage of containers
Images are present in layers, the bottom most is the parent image.
Image is like a static bundle, container is the bundle which is actively running. Container is the running environment for an image.

When creating containers using nodemon, we must have “dev:nodemon -L app.js” in package.json, because -L watches for changes in the container. We can’t simply write nodemon app.js”.

Docker Commands:-
docker ps - list of running containers
docker pull redis - pulls “redis” image from dockerhub
docker run redis - pulls “redis” image and runs “redis” container
docker run -d redis - runs “redis” container in detached mode
docker stop 8381867e8242 - stops the running container with id=8381867e8242 (this is for    detached mode)
docker start 8381867e8242 - starts the stopped container with id=8381867e8242
docker ps -a - lists running and stopped containers


docker run -- name myapp_c1 myapp - to run container via terminal(myapp_c1 is name of container we’re naming, and myapp is the name of the image)
docker stop myapp_c1 - to stop the running container(myapp_c1 is running container name, you can also use running container id in place of name)
docker run --name myapp_c2 -p 4000:4000 -d myapp - to run container(lhs 4000 refers to laptops(localhost) port and rhs 4000 refers to containers port)
docker run –name myapp_c3 -p 4000:4000 -d –rm myapp - –rm tells that when we stop the container, the image gets removed/deleted.
docker run –name myapp_c4 -p 4000:4000 -d –rem -v <absolutepathtoproject:/app> -v /app/node_modules myapp - uses volume 
docker start myapp_c2 - starts running the stopped “myapp_c2” container(used when we have already run a container once before)
docker image rm myapp - to delete image(myapp is the name of the image) (if it gives some error, it means that container is currently running, we can type “docker image myapp -f” to forcefully delete it)
docker container rm myapp2 - to delete container(myapp2 is name of container)
docker system prune -a - this will delete all the images, no image will be there hereafter

DOCKER VOLUMES - When we change some code after creating the image, the image/container won’t have the changes done now. To make the changes visible to the container also, we use volumes. No need to build a new image now. Even in docker volume, the image doesn’t get changed. It just helps in mapping the container and host computer, we should anyways build new images when sending to others. 

We’re having the nodejs application inside the container. This nodejs application port is 3000(say), we need to specify a port for the container also, to access it. This is called port mapping.

Parent image - Includes OS and runtime environment

We’re not using “RUN node app.js” instead of CMD [“node”, “app.js”], because RUN is a run time function and happens when an image is getting built. CMD gets fired when we run the built image.




Redis
It stores all the data in strings. 

Redis commands:-
Set name Akilesh - name is key and akilesh is value. It stores key value pair
Setex name 10 Akilesh - it tells, the ‘name’ will expire in 10 seconds
Get name - returns akilesh
Del name - used to delete the key value pair
Exists name - tells whether ‘name’ key exists or not(returns 1 or 0)
Keys * - it gives all the keys
Flushall - it deletes everything
Ttl name - it means time to live(amount of time ‘name’ will exist)
Expire name 10 - it says ‘name’ will expire in 10 seconds
Lpush friends John - creates a list named friends, inside that john is a element
Lrange friends 0 -1 - prints the list(0 is start index and -1 is stop index)
Rpush friends sally - it adds “sally” to the right side of the list
lpop/rpop friends - it pops the leftmost/rightmost element from the list
Sadd hobbies swimming - it creates a set “hobbies”, swimming is an element(sets store unique elements)
Smembers hobbies - to print all elements in the set
Srem hobbies swimming - remove swimming element
Hset person name Akilesh - person is the name of the hashset. Name and akilesh are like key value pairs.
Hget person name - returns Akilesh
Hdel person name - deletes the name-akilesh key-value pair
Hexists person name - tells whether ‘name’ exists or not

Redis pub/sub model
The publisher sends the message to the topic(information feed/broker, egRabbitMQ), subscribers receive from the topic, hence publishers remain anonymous. The subscribers then manipulate the data received according to their needs.


Layer 4 load balancing
It doesn’t keep track of data inside the packet
Transport layer
They’re secure as data is not seen by load balancer. No need of decryption
Can connect to large number of TCP connections
It’s fast but less accurate

Layer 7 load balancing
It processes the data inside the packet
Application layer
Offers cache
Decryption required for security
Limited by load balancer’s maximum TCP connection
It’s slow, but more accurate



NGINX
It’s a replacement for HAProxy. NGINX can act as a load balancer. Instead of encryption/decrypting at the server, it takes place at NGINX. 
Inside the nginx.conf file, there’re key value pairs. Each key value pair is a directive. Context is encapsulating directives.

	Events {                                                                #this whole block is a context
		Worker_connections 1024;                 #this is a directive
	}

Mime.types - all files have their own file extension. By default, the Content-Type is set to “plain-text” in the browser. We must change the file extension to css/js/etc. Hence we use mime.types file(inbuilt in NGINX) for this. NGINX supports a backup server which helps when a server clashes.

NGINX takes care of CORS, no need to specify it in nodejs application. 

2 major problems in load balancing using NGINX
When load balancing takes place and client requests polling
We’ll get problems if we use polling and use NGINX. When a request goes to the first server via NGINX, it confirms polling and that server records the client's session ID. Now the second time when a client requests something, it goes to the second server(default round robin), now the second server doesn’t know the client’s session ID. It assumes it’s a completely new request/client. This problem can be resolved by using “ip_hash” in NGINX(same IP = same server). Here the client goes to the same server every time because of hashing of IP addresses.
We can also address this problem with the use of the Redis database. We can connect it to multiple servers. So when one server receives the data, the data is sent to the database and all other servers can access that Redis storage.

If we try to send data to my friend, say I’m in localhost:8000, and friend is in localhost:8001. Now I send the data to the 8000 server, but since my friend is in another server(but same system) is unable to receive message as 8000 server won’t know my friend(client)





Github repo:   https://github.com/akilesh1706/WebSocket


IN BRIEF

I have successfully developed a real-time chat application leveraging the socket.io library. This platform facilitates seamless communication among users in a shared environment. Furthermore, users have the capability to establish and engage in private chat rooms, fostering communication within specific groups.

To enhance the scalability of the application, I have implemented containerization through Docker, streamlining the deployment process and ensuring consistent performance across various environments. Additionally, I have strategically employed NGINX as a load balancer, effectively distributing incoming traffic among multiple servers. I have implemented Redis too, as a caching layer behind the servers. 
