# Use official Rasa image
FROM rasa/rasa:3.7.6


# Copy your bot files
COPY . /app
WORKDIR /app

# Expose default Rasa port
EXPOSE 5005

# Start Rasa with Socket.IO connector
CMD ["run", "--enable-api", "--cors", "*", "--connector", "socketio", "--port", "5005"]
