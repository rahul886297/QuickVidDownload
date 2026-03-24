FROM node:18-bullseye-slim

# Install Python and FFmpeg required for yt-dlp to merge and extract streams
RUN apt-get update && apt-get install -y python3 ffmpeg

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

ENV PORT=5000
EXPOSE 5000

CMD ["node", "src/server.js"]
