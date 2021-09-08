FROM ubuntu:latest

WORKDIR /usr/local
ENV HOME /home/minima

# Create Minima user
RUN groupadd -g 1000 minima
RUN useradd -m -r -u 1000 -g 1000 -d $HOME minima

# Install OpenJDK-11
RUN apt-get update && \
    apt-get install -y openjdk-11-jre-headless && \
    apt-get clean;

COPY .minima $HOME/.minima
RUN chown -R minima:minima $HOME

USER minima
COPY minima.jar minima.jar

EXPOSE 9001 9002 9003 9004 
ENTRYPOINT ["java", "-jar", "/usr/local/minima.jar"]
