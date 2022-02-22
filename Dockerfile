FROM postgres:latest

COPY *.sql /docker-entrypoint-initdb.d/

ADD ./db/schema.sql /docker-entrypoint-initdb.d

RUN chmod a+r /docker-entrypoint-initdb.d/*

EXPOSE 5432


# step 1 build a Dockerfile
# step 2 put instructions in Dockerfile
# step 3 Build image using Dockerfile
#  docker build -t sdc .

# step 4 Build container using image
# docker run -d \
# --name sdc \
# -v pgdata:/var/lib/postgresql/data/ \
# -e POSTGRES_PASSWORD=pyqR2Ux4egUC6EElM2ai7 \
# -e POSTGRES_DB=questionsAndAnswers \
# -p 5432:5432 sdc
