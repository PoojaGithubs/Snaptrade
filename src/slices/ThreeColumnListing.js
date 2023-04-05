import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText,PrismicLink } from '@prismicio/react'
import { Container } from "../components/Container"

export const ThreeColumnListing = ({ slice , context }) => {
  const cat = slice.primary.category?.document?.uid || null
  const AllArticles = context.articles;
  const articles = AllArticles.filter(article => {return article.data?.main_category?.uid === cat;}).slice(0,3);
  
  return (
    <section className="ThreeColumnListing">
      <Container>
        <div className={s.HeaderWrap}>
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
              <a className="btnPrimary" href={`${slice.primary.category?.document?.url}/${item.uid}`}>Read Full Article</a>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export const query = graphql`
  fragment HomepageDataBodyThreeColumnListing on PrismicHomepageDataBodyThreeColumnListing {
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
  fragment ArticleDataBodyThreeColumnListing on PrismicArticleDataBodyThreeColumnListing {
    id
     primary {
      header_rt {
        richText 
      }
      category {
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
