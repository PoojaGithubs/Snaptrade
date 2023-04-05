import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText,PrismicLink } from '@prismicio/react'

export const CTA = ({ slice }) => {
  return (
    <section className="CTA">
      <div className='Container'>
        <div className="readyCTA">
          <div className="flex___wrap center">
            <div className="back_design orn_2b">
              <StaticImage
                src="../images/design/ornament_2b.png"
                alt=""
                layout="fixed"
                placeholder="blurred"
              />
            </div>
            <div className="flex___item small-6">
              <div className="copy">
                <PrismicRichText
                  field={slice.primary.text?.richText}
                  components={{
                    heading3: ({ children }) => <h3 className="subheadings">{children}</h3>,
                    paragraph: ({ children }) => <p className="body">{children}</p>,
                  }}
                />
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export const query = graphql`
  fragment HomepageDataBodyCta on PrismicHomepageDataBodyCta {
    id
    primary {
      text {
        richText
      }
    }
    items {
      btn_label
      btn_link {
        url
      }
    }
  }
  fragment PageDataBodyCta on PrismicPageDataBodyCta {
    id
    primary {
      text {
        richText
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