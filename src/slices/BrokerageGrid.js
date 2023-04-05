import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText,PrismicLink } from '@prismicio/react'
import axios from 'axios'

function setBrokerages(brokerages) {
  let brokerageTiles = []

  brokerages.data.forEach((brokerage) => {
    if (
      brokerage.slug === 'WEALTHICA' ||
      brokerage.slug === 'ALLY-INVEST' ||
      brokerage.slug === 'PLAID' ||
      brokerage.slug === 'INTERACTIVE-BROKERS'
      ) {
        return null
      } else {
      let altText = brokerage.name + ' Logo'
      brokerageTiles.push(
        <div className="tile" key={brokerage.name}>
          <a
            href={brokerage.open_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={brokerage.aws_s3_logo_url}
              alt={altText}
              className="tileImage"
            />
          </a>
        </div>,
      )
    }
  })
  return brokerageTiles
}
export const BrokerageGrid = ({ slice }) => {
  const [brokerageTiles, setBrokerageTiles] = React.useState([])

  React.useEffect(() => {
    axios.get(`https://api.passiv.com/api/v1/brokerages/`).then((response) => {
      setBrokerageTiles(setBrokerages(response))
    })
  }, [])
  return (
    <section className="BrokerageGrid">
      <div className="Container">
        <div className="brokerages">
          <div className="flex___wrap ">
            <div className="flex___item small-12">
              <div className="flex_grid">
                <div className="flex_grid___item">
                  <div className="copy">
                    <PrismicRichText
                      field={slice.primary.text?.richText}
                      components={{
                        heading2: ({ children }) => <h2 className="subheadings">{children}</h2>
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tileContainer">{brokerageTiles}</div>
      </div>
    </section>
  )
}

export const query = graphql`
  fragment HomepageDataBodyBrokerageGrid on PrismicHomepageDataBodyBrokerageGrid {
    id
    primary {
      text {
        richText
      }
    }
  }
  fragment PageDataBodyBrokerageGrid on PrismicPageDataBodyBrokerageGrid {
    id
    primary {
      text {
        richText
      }
    }
  }
`