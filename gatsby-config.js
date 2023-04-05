const path = require('path')
const dotenv = require('dotenv')

dotenv.config()

const prismicConfig = require('./prismic-configuration')

module.exports = {
  siteMetadata: {
    title: 'SnapTrade | One API, Every Brokerage',
    description: 'Snap site',
  },
  plugins: [
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: prismicConfig.prismicRepo,
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
        linkResolver: require('./src/utils/linkResolver').linkResolver,
        customTypesApiToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoibWFjaGluZTJtYWNoaW5lIiwiZGJpZCI6InNuYXB0cmFkZS0wZDdhZWMzZC03Y2FkLTRlYWEtYWJkMS1iZGEwYmUwZTk2MmNfNCIsImRhdGUiOjE2NzgxNDM3OTUsImRvbWFpbiI6InNuYXB0cmFkZSIsImlhdCI6MTY3ODE0Mzc5NX0.HNYfZVnyuOZenNyw7ZoguJ0D4C176eijZnMyBlOT08Q",
      },
    },
    {
      resolve: 'gatsby-plugin-prismic-previews',
      options: {
        repositoryName: prismicConfig.prismicRepo,
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: path.resolve(__dirname, 'src', 'images', 'favicon.png'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.resolve(__dirname, 'src', 'images'),
      },
    },

    {
      resolve: "gatsby-plugin-react-svg",
    options: {
      rule: {
        include: /images/ // See below to configure properly
      }
    }
    },

    {
      resolve: "gatsby-plugin-page-progress",
      options: {
        includePaths: [],
        excludePaths: ["/","/all"],
        height: 6,
        prependToBody: false,
        color: '#3C507B',
        footerHeight: 500,
        headerHeight: 0,
      }
      },
  ],
}
