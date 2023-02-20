# Specify the base image
FROM postgres:13-alpine

# Set the environment variables
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD postgres
ENV POSTGRES_DB mydatabase

# Copy the SQL file to initialize the database
COPY ./init.sql /docker-entrypoint-initdb.d/
