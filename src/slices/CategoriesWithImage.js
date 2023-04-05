import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText,PrismicLink } from '@prismicio/react'
import { Container } from "../components/Container"


export const CategoriesWithImage = ({ slice }) => {
  return (
    <section className="CategoriesWithImage">
      <Container>
        <div className="HeaderWrap">
          <PrismicRichText field={slice.primary.list_title?.richText}/>
        </div>
        <div className="FlexWrap">
          {slice.items.map((item,index) => (
            <PrismicLink className="CategoryItem" href={item.category?.document?.url} key={`Related Cat:${index}`}>
              <GatsbyImage
                image={item.category_image?.gatsbyImageData}
                alt={item.category_image?.alt || ""}
              />
              <span className="CategoryLabel">{item.category?.document?.data?.name}</span>
            </PrismicLink>
          ))}
        </div>
      </Container>
    </section>
  )
}

export const query = graphql`
  fragment ArticleDataBodyCategoriesWithImage on PrismicArticleDataBodyCategoriesWithImage {
    id
    primary {
      list_title {
        richText
      }
    }
    items {
      category_image {
        gatsbyImageData
        alt
      }
      category {
        document {
          ... on PrismicArticleCategory {
            url
            data {
              name
            }
          }
        }
      }
    }
  }
  fragment ArticleCategoryDataBodyCategoriesWithImage on PrismicArticleCategoryDataBodyCategoriesWithImage {
    id
    primary {
      list_title {
        richText
      }
    }
    items {
      category_image {
        gatsbyImageData
        alt
      }
      category {
        document {
          ... on PrismicArticleCategory {
            url
            data {
              name
            }
          }
        }
      }
    }
  }
`
