import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText,PrismicLink } from '@prismicio/react'

export const Hero = ({ slice }) => {
  return (
    <section className="hero">
        <div className="Container">
          <div className="flex___wrap">
            <div className="flex___item medium-5 ">
              <div className="copy">
                <h1 className="headings">
                 {slice.primary.title}
                 
                </h1>
                <p className="body">
                  {slice.primary.subtitle}
                </p>
             
                <div className="btn_box">
                  {slice.items.map((btn,i) => (
                    <PrismicLink
                      className={i % 2 === 0 ? "btn primary" : "btn secondary"}
                      href={btn.btn_link?.url}
                      key={i}  
                    >
                        {btn.btn_label}
                      </PrismicLink>
                  ))}
                </div>
            
                {slice.primary.home_text && 
                  <div className="backed_wrap">
                    <PrismicRichText
                      field={slice.primary.home_text?.richText}
                    />
                  </div>
                }
                
              </div>
            </div>
            <div className="flex___item medium-7">
              <GatsbyImage
                image={slice.primary.image?.gatsbyImageData}
                alt={slice.primary.image?.alt || ""}
              />
            
            </div>
         
          </div>
        </div>
      </section>
  )
}

export const query = graphql`
  fragment HomepageDataBodyHero on PrismicHomepageDataBodyHero {
    id
    primary {
      title
      subtitle
      home_text {
        richText
      }
      image {
        gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED, srcSetMaxWidth: 664)
        alt
      }
    }
    items {
      btn_label
      btn_link {
        url
      }
    }
  }
  fragment PageDataBodyHero on PrismicPageDataBodyHero {
    id
    primary {
      title
      subtitle
      image {
        gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED, srcSetMaxWidth: 664)
        alt
      }
    }
    items {
      btn_label
      btn_link {
        url
      }
    }
  }
`