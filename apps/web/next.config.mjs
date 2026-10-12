import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@school-management/shared'],
  outputFileTracingRoot: path.join(__dirname, '../../'),
  webpack(config) {
    // Alias "cn" bare specifier to our utils (matches tsconfig paths)
    config.resolve.alias['cn'] = path.join(__dirname, 'src/lib/utils.ts');
    return config;
  },
};

export default nextConfig;
