const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js');
    resolve(graphql(`
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              frontmatter {
                path
              }
            }
          }
        }
      }
    `).then((result) => {
      if (result.errors) {
        console.log(result.errors);
        reject(result.errors);
      }

      // Create blog posts pages.
      const edges = result.data.allMarkdownRemark.edges;
      edges.forEach((edge) => {
        createPage({
          path: edge.node.frontmatter.path,
          component: blogPost,
          context: {

          },
        });
      });
    }));
  });
};
