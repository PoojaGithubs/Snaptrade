import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText,PrismicLink } from '@prismicio/react'

export const StatBar = ({ slice }) => {
  return (
    <section className="stats_features">
      <div className="Container">
        <div className="back_design orn_1a">
          <StaticImage
            src="../images/design/ornament_1a.png"
            alt=""
            layout="fixed"
            placeholder="blurred"
          />
        </div>
        <div className="flex___wrap stats">
          {slice.items.map((stat,i) => (
            <div className="flex___item medium-4 alt" key={i}>
              <div className="stat">
                <h2>{stat.stat}</h2>
                <p>{stat.stat_description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="back_design orn_1b">
          <StaticImage
            src="../images/design/ornament_1b.png"
            alt=""
            layout="fixed"
            placeholder="blurred"
          />
        </div>
      </div>
    </section>
      
  )
}

export const query = graphql`
  fragment HomepageDataBodyStatBar on PrismicHomepageDataBodyStatBar {
    id
    items {
      stat
      stat_description
    }
  }
  fragment PageDataBodyStatBar on PrismicPageDataBodyStatBar {
    id
    items {
      stat
      stat_description
    }
  }
`