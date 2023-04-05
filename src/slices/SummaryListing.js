import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText,PrismicLink } from '@prismicio/react'
import { Container } from "../components/Container"

export const SummaryListing = ({ slice , context }) => {
  const cat = slice.primary.category?.document?.uid || null
  const AllArticles = context.articles;
  const articles = AllArticles.filter(article => {return article.data?.main_category?.uid === cat;}).slice(0,4);

  return (
    <section className="SummaryListing">
      <Container>
        <div className="HeaderWrap">
          <PrismicRichText field={slice.primary.header_rt?.richText}/>
          <PrismicLink className="viewAll" href={slice.primary.category.url} >
            View All
          </PrismicLink>
        </div>
        <div className="ListingGrid">
          {articles.map((item,index) => (
            <div className="ListingItem" key={`listing:${index}`}>
              <div className="articleImage">
       
                  <GatsbyImage
                    image = {item.data.featured_image?.gatsbyImageData}
                    alt = {item.data.featured_image?.alt || ""}
                  />
                
              </div>
              <h3>{item.data.title?.text}</h3>
              <div className="articleMeta"> <span>{item.data.article_date}</span> &middot; <span>{item.data.time} Read</span></div>
              <a className="readLink" href={`${slice.primary.category?.document?.url}/${item.uid}`}>Read Full Article</a>

            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export const query = graphql`
  fragment HomepageDataBodySummaryListing on PrismicHomepageDataBodySummaryListing {
    id
    primary {
      header_rt {
        richText 
      }
      category {
        url
        document {
          ... on PrismicArticleCategory {
            uid
            url
            data {
              name
            }
          }
        }
      }
    }
  }
  fragment ArticleDataBodySummaryListing on PrismicArticleDataBodySummaryListing {
    id
    primary {
      header_rt {
        richText 
      }
      category {
        url
        document {
          ... on PrismicArticleCategory {
            uid
            data {
              name
            }
          }
        }
      }
    }
  }
`
