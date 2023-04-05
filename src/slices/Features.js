import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText,PrismicLink } from '@prismicio/react'

export const Features = ({ slice }) => {
  return (
    <section className="FeatureSection">
      <div className="Container">
        <div className="title_wrap">      
          <PrismicRichText
            field={slice.primary.text?.richText}
            components={{
              heading3: ({ children }) =>  <h3 className="subheadings">{children}</h3>,
            }}
          />
        </div>
        <div className="features">
          {slice.items.map((feat,i) => (
            <div className="features___item" key={i}>
              <div className="icon">
                <GatsbyImage
                  image={feat.icon?.gatsbyImageData}
                  alt={feat.icon?.alt || ""}
                />
              </div>
              <p>{feat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const query = graphql`
  fragment HomepageDataBodyFeatures on PrismicHomepageDataBodyFeatures {
    id
    primary {
      text {
        richText
      }
    }
    items {
      icon {
        gatsbyImageData(width: 107, layout: CONSTRAINED, placeholder: BLURRED)
        alt
      }
      label
    }
  }
  fragment PageDataBodyFeatures on PrismicPageDataBodyFeatures {
    id
    primary {
      text {
        richText
      }
    }
    items {
      icon {
        gatsbyImageData(width: 107, layout: CONSTRAINED, placeholder: BLURRED)
        alt
      }
      label
    }
  }
`