FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
    yosys \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /yosys

CMD ["yosys"]
