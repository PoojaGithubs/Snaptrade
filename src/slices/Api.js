import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText,PrismicLink } from '@prismicio/react'
import { Link } from 'gatsby'

export const Api = ({ slice }) => {
  return (
    <section className="api">
      <div className="Container">
        <div className="back_design orn_2a">
          <StaticImage
            src="../images/design/ornament_2a.png"
            alt=""
            layout="fixed"
            placeholder="blurred"
          />
        </div>
        <div className="flex___wrap">
          <div className="flex___item medium-5">
            <div className="copy">
              <PrismicRichText
                field={slice.primary.text?.richText}
                components={{
                  heading2: ({ children }) => <h2 className="subheadings alt"> {children} </h2>,
                  paragraph: ({ children }) => <p className="body alt"> {children} </p>,

                }}
              />
              <PrismicLink
                href={slice.primary.btn_link?.url}
                className="btn primary"
              >
                {slice.primary.btn_label}
              </PrismicLink>
            </div>
          </div>
          <div className="flex___item medium-6">
            <div className="code_box alt">
              <code>
                <PrismicRichText
                  field={slice.primary.code_text?.richText}
                  components={{
                    paragraph: ({ children }) => <>{children}</>
                  }}
                />
              </code>
              <div className="back_design orn_1c">
                <StaticImage
                  src="../images/design/ornament_1c.png"
                  alt=""
                  layout="fixed"
                  placeholder="blurred"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export const query = graphql`
  fragment HomepageDataBodyApi on PrismicHomepageDataBodyApi {
    id
    primary {
      text {
        richText
      }
      btn_label
      btn_link {
        url
      }
      code_text {
        richText
      }
    }
  }
  fragment PageDataBodyApi on PrismicPageDataBodyApi {
    id
    primary {
      text {
        richText
      }
      btn_label
      btn_link {
        url
      }
      code_text {
        richText
      }
    }
  }
`