const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const queryData = await graphql(`
    {
      allPrismicPage {
        nodes {
          id
          lang
          url
        }
      }
      allPrismicHomepage {
        nodes {
          id
          lang
          url
        }
      }
      allPrismicArticle {
        nodes {
          id
          lang
          url
          data {
            main_category {
              uid
            }
          }
        }
      }
      allPrismicArticleCategory {
        nodes {
          id
          lang
          url
          uid
        }
      }
    }
  `)

  queryData.data.allPrismicPage.nodes.forEach((page) => {
    createPage({
      path: page.url,
      component: path.resolve(__dirname, 'src/templates/page.js'),
      context: {
        id: page.id,
        lang: page.lang,
      },
    })
  })

  queryData.data.allPrismicHomepage.nodes.forEach((page) => {
    createPage({
      path: page.url,
      component: path.resolve(__dirname, 'src/templates/homepage.js'),
      context: {
        id: page.id,
        lang: page.lang,
      },
    })
  })
  queryData.data.allPrismicArticle.nodes.forEach((page) => {
    createPage({
      path: page.url,
      component: path.resolve(__dirname, 'src/templates/article.js'),
      context: {
        id: page.id,
        lang: page.lang,
        parent: page.data.main_category.uid,
      },
    })
  })

  queryData.data.allPrismicArticleCategory.nodes.forEach((page) => {
    createPage({
      path: page.url,
      component: path.resolve(__dirname, 'src/templates/article_category.js'),
      context: {
        id: page.id,
        lang: page.lang,
        uid: page.uid,
      },
    })
  })
}
