const isGithubPages = process.env.GITHUB_PAGES === 'true'

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isGithubPages && {
    output: 'export',
    basePath: '/todo-app',
    trailingSlash: true,
    images: { unoptimized: true },
  }),
}

module.exports = nextConfig
