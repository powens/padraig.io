module.exports = {
  siteMetadata: {
    title: 'Patrick Owens',
    author: 'Patrick Owens',
    social: [
      { name: 'Twitter', url: 'https://twitter.com/padraigcodes' },
      { name: 'GitHub', url: 'https://github.com/powens' },
    ],
    description:
      'I’m a full stack developer, infosec enthusiast, HAM radio operator - VA7ORO, and occasional competitive game player.',
    siteUrl: 'https://padraig.io',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-blog-core',
      options: {
        contentPath: 'src/posts',
        assetPath: 'src/assets',
      },
    },
    {
      resolve: 'gatsby-plugin-theme-ui',
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Patrick Owens',
        short_name: 'padraig',
        start_url: '/',
        background_color: '#e8e8e8',
        theme_color: '#1f56a7',
        display: 'minimal-ui',
        icon: 'src/assets/favicon.svg', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    'gatsby-plugin-netlify',
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
        feeds: [
          {
            serialize: ({ query: { site, allMdxBlogPost } }) => {
              return allMdxBlogPost.edges.map((edge) => {
                return Object.assign({}, edge.node, {
                  description: edge.node.excerpt,
                  date: edge.node.date,
                  url: site.siteMetadata.siteUrl + edge.node.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.slug,
                  // custom_elements: [{ 'content:encoded': edge.node.html }],
                });
              });
            },
            query: `
          {
            allMdxBlogPost(
              sort: { order: DESC, fields: [date] },
            ) {
              edges {
                node {
                  slug
                  title
                  date
                  excerpt
                }
              }
            }
          }
        `,
            output: '/rss.xml',
            title: 'Patrick Owens',
          },
        ],
      },
    },
    'gatsby-plugin-sitemap',
  ],
};
