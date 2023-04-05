import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText,PrismicLink } from '@prismicio/react'

export const TextImage = ({ slice }) => {
  return (
    <section className="TextImage">
      <div className="Container">
        <div className="flex___wrap">
            {
            slice.primary.image_side != true ? (  
              <>
                <div className="flex___item medium-6">
                  <div className="flex___image">
                    <GatsbyImage
                      image={slice.primary.image?.gatsbyImageData}
                      alt={slice.primary.image?.alt || ""}
                    /> 
                  </div>
                </div>
                <div className="flex___item medium-6">
                  <div className="copy">
                    <PrismicRichText
                      field={slice.primary.text?.richText}
                      components={{
                        heading2: ({ children }) => <h2 className="subheadings">{children}</h2>,
                        paragraph: ({ children }) => <p className="body">{children}</p>,
                      }}
                    />
                  </div>
                </div>
              </>  
            ) : (
              <>
                <div className="flex___item medium-6">
                  <div className="copy">
                    <PrismicRichText
                      field={slice.primary.text?.richText}
                      components={{
                        heading2: ({ children }) => <h2 className="subheadings">{children}</h2>,
                        paragraph: ({ children }) => <p className="body">{children}</p>,
                      }}
                    />
                  </div>
                </div>
                <div className="flex___item medium-6">
                  <div className="flex___image">
                    <GatsbyImage
                      image={slice.primary.image?.gatsbyImageData}
                      alt={slice.primary.image?.alt || ""}
                    /> 
                  </div>
                </div>
              </> 
            )
          }
        </div>
      </div>
    </section>
  )
}

export const query = graphql`
  fragment HomepageDataBodyTextImage on PrismicHomepageDataBodyTextImage {
    id
    primary {
      image_side
      text {
        richText
      }
      image {
        gatsbyImageData(width: 300, layout: CONSTRAINED, placeholder: BLURRED)
        alt
      }
    }
  }
  fragment PageDataBodyTextImage on PrismicPageDataBodyTextImage {
    id
    primary {
      image_side
      text {
        richText
      }
      image {
        gatsbyImageData(width: 300, layout: CONSTRAINED, placeholder: BLURRED)
        alt
      }
    }
  }
`