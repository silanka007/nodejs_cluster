**making multiple request (Load testing our application)**
- using apache benchmark: ab -c 10 -n 500 localhost:3000/
- using loadtest package: loadtest -c 10 -n 1000 --rps 200 http://localhost:3000/?number=40 (nb: n-> number of request, c-> concurrent requests, rps-> number of requests per second)
- using artillery package

using pm2 to run multiple instances of our server (Clustering)
pm2 start <entry_file_name> -i 0
pm2 show <entry_file_name>
