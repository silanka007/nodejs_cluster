using apache benchmark in making multiple request
ab -c 10 -n 500 localhost:3000/

using pm2 to run multiple instances of our server (Clustering)
pm2 start <entry_file_name> -i 0
pm2 show <entry_file_name>
