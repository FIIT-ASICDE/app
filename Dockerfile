FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y verilator iverilog gtkwave build-essential tzdata yosys && \
    ln -fs /usr/share/zoneinfo/Europe/Bratislava /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata && \ 
    apt-get clean

WORKDIR /workspace

CMD ["bash"]