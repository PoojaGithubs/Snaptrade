import * as React from 'react'
import { graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { PrismicLink } from '@prismicio/react'
import { Link } from 'gatsby'

export const Header = ({menu}) => (
  <header>
    <div className="header___wrapper">
      <div className="header___logo_wrap">
        <Link className="header___logo_link" href="/">
          <StaticImage
            src="../images/logo/logo.png"
            alt="SnapTrade Logo"
            placeholder="blurred"
            width="20"
          />
          <div>
            <span>SnapTrade</span>
            <p className="by-passiv">BY PASSIV</p>
          
          </div>
        </Link>
      </div>
      <div className="rightContent">
      <div className="flex_items">
         <Link to = "/">
         Home
          </Link>
      </div>
      <div  className="flex_items">
         <Link to = "/all">
         All Articles
          </Link>
      </div>
      <div className="header___btns">
        {menu.header_links?.map((btn,i) => (
          <PrismicLink
            className={i % 2 === 0 ? "btn primary" : "btn secondary"}
            href={btn.link?.url}
            key={i}  
          >
              {btn.link_label}
            </PrismicLink>
            
        ))}
      </div>
     </div>
      
    </div>
  </header>
)
export const query = graphql`
  fragment TopMenuFragment on PrismicMenu {
    _previewable
    type
    lang
    data {
      header_links {
        link {
          url
        }
        link_label
      }
    }
    
  }
`