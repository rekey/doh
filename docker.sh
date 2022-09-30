docker kill doh
docker rm doh
docker run -itd \
  --name doh \
  -v /data/doh/config:/app/config \
  -p 8080:12335 \
  rekey/doh