/** @type {import('next').NextConfig} */
import withMDX from '@next/mdx';

const nextConfig = withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})({
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
});

export default nextConfig;