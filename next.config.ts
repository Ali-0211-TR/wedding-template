import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://192.168.10.221:5173',
  ],
}

export default nextConfig
