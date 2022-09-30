docker kill doh
docker rm doh
docker run -itd \
  --name doh \
  --add-host doh.xifa.fun:45.159.48.65 \
  -v /data/doh/config:/app/config \
  -p 8080:12335 \
  rekey/doh