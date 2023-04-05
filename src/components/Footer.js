import * as React from 'react'
import { graphql, Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { PrismicLink } from '@prismicio/react'

export const Footer = ({menu}) => (
  
  <footer>
     
    <div className="footer">
      <div className="footer___image">
      
        <StaticImage
          src="../images/design/ornament_1d.png"
          alt=""
          layout="fixed"
          placeholder="blurred"
        />
      </div>
      <div className="footer___copy alt">
        <div className="footer___btns">
          {menu.footer_links?.map((link,i) => (
            <PrismicLink
              href={link.link?.url}
              key={i}
            >
              {link.link_label}
            </PrismicLink>
          ))}
        </div>
        <p className="alt">SnapTrade &copy; {new Date().getFullYear()}</p>
      </div>
      <div className="footer___logo">
        <a
          href="https://passiv.com/"
          target="_blank"
          className="logo_back"
          rel="noreferrer"
        >
          <StaticImage
            src="../images/logo/passiv.png"
            alt=""
            layout="fixed"
            placeholder="blurred"
            className="passiv_logo"
          />
        </a>
      </div>
    </div>
  </footer>
)
export const query = graphql`
  fragment BottomMenuFragment on PrismicMenu {
    _previewable
    type
    lang
    data {
      footer_links {
        link {
          url
        }
        link_label
      }
    }
  }
`