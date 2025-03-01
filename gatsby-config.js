import dotenv from "dotenv";
dotenv.config();

export default {
  siteMetadata: {
    title: "My E-commerce Site",
  },
  plugins: [
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-netlify-cms",
  ],
};

import path from 'path';

export const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allContentfulProduct {
        nodes {
          slug
          id
        }
      }
    }
  `);

  result.data.allContentfulProduct.nodes.forEach((product) => {
    createPage({
      path: `/product/${product.slug}/`,
      component: path.resolve("./src/templates/product.js"),
      context: {
        id: product.id,
      },
    });
  });
};
