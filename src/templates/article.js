import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText,PrismicLink } from '@prismicio/react'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import { SliceZone } from '@prismicio/react'

import { Layout } from '../components/Layout'
import { Container } from "../components/Container"
import { components } from '../slices'
import snapIcon from "../images/snapIcon.svg";

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  PinterestShareButton
} from "react-share";
import { FaLinkedin, FaPinterest, FaTwitter, FaFacebook} from 'react-icons/fa'

const ArticleTemplate = ({ data }) => {
  if (!data) return null

  const articleContent = data.prismicArticle || {}
  const article = articleContent.data || {}
  const menu = data.prismicMenu || {}
  const articlesData = data.allPrismicArticle || {}
  const articles = articlesData?.nodes || []

  const { lang, type, url } = articleContent || {}
  const alternateLanguages = articleContent.alternate_languages || []
  const activeDoc = {
    lang,
    type,
    url,
    alternateLanguages,
  }

  return (
    <Layout menu={menu.data} activeDocMeta={activeDoc}>
      <section className="Article">
        <Container>

          <nav aria-label="Breadcrumb" className="breadcrumb">
            <ul>
              <li>
                <a href="/all">
                  All Articles 
                </a>
              </li>
              <li>
                {/* Top progress bar All Articles> investing >*/}
                <a href={article.main_category.url}>
                  {article.main_category.document?.data.name}
                </a>
              </li>
              <li>
                <a href="#" aria-current="page">
                  {article.title?.text}
                </a>
             
              </li>
            </ul>
          </nav>

          <div className="topContainer">
            <div className="articleImageContainer">
            <StaticImage
                  src="../images/RoundDesign.jpg"
                  alt="SnapTrade Logo"
                  placeholder="blurred" 
                  />
            <div className="articleImage">
              {article.featured_image && 
                <GatsbyImage
                  image = {article.featured_image?.gatsbyImageData}
                  alt = {article.featured_image?.alt || ""}
                />
              }
            </div>
            </div>
            <div className="articleHeader">
              <span className="articleTime">Time to read: {article.time}</span>
              <span className="headingArticle">{article.title?.text}</span>
               
              <div className="articleMeta">
              <span className="subtitle">{article.main_category.document?.data.name} &middot;
                <span className='articleDate'>{article.article_date}</span> 
                 </span></div>

                 <div className="shareBar">
             
             <h2 className="H3">Share This:</h2>
             <FacebookShareButton url={articleContent.url}><FaFacebook/></FacebookShareButton>
             <TwitterShareButton url={articleContent.url}><FaTwitter/></TwitterShareButton>
             <LinkedinShareButton url={articleContent.url}><FaLinkedin/></LinkedinShareButton>
             <PinterestShareButton url={articleContent.url}><FaPinterest/></PinterestShareButton>
           </div>
       
            </div>
          </div>  
          <div className="bottomContainer">
            <div className="articleContent">
              <PrismicRichText field={article.article_text?.richText}/>
        

              <div className="BottomBanner">
                {/* <PrismicRichText field={article.end_of_article_banner?.document?.data?.banner_text?.richText}/>
                <PrismicLink className="btnPrimary" href={article.end_of_article_banner?.document?.data?.link?.url} >
                  Learn More
                </PrismicLink> */}
                   <h2>Changable banner for links</h2>
                 <p>Nemo enim ipsam voluptatem quia volupt as sit aspernatur aut odit aut fugit, sed quia consequuntur. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.</p>
                 <button className="btnPrimary">Link here</button>
              </div>
            </div>
            <div className="stickyColumn">
       
              <div className="stickyBoxCenter">
                <div className="SideBanner">
                  {/* <PrismicRichText field={article.sidebar_banner?.document?.data?.banner_text?.richText}/> */}
                 <h2>Changable banner for links</h2>
                 <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.</p>
                 <button className="btnPrimary">Link here</button>
                  {/* <PrismicLink className="btnPrimary" href={article.sidebar_banner?.document?.data?.link?.url} >
                    Learn More
                  </PrismicLink> */}
                </div>
              </div>

               <div className="stickyBoxBottom">
               <div className="articleImageContainer">
               <StaticImage
                  src="../images/DotDesign.jpg"
                  alt="SnapTrade Logo"
                  placeholder="blurred" 
                  />
                  </div>
                <div className="Newsletter">

                  {/* <h1>blue box</h1> */}

                  <h2>Stay in the loop for more</h2>
                    <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit</p>
                    <div className="emailpannel">     
                        <form >           
                            <input id="NewsletterEmail" name="NewsletterEmail" type="email" placeholder="Your Email"/>
                        </form>
                        <button className="btnPrimary">Sign Up</button>
                      </div>
                 
                  {/* <form onSubmit={handleSubmit}>
                   
                    <input id="NewsletterEmail" name="NewsletterEmail" type="email" placeholder="Your Email"/>
                    <input type="submit" className="btnPrimary" value="Sign Up"/>
                  </form>
                  {
                    result?.result == 'success' ? (
                      <p>{result?.msg}</p>
                    ) :
                    result?.result == 'error' ? (
                      <p>{result?.msg}</p>
                    ) :
                    null
                  } */}
                </div>
              </div> 
            
            </div>
          </div>
        </Container>
      </section>
      <div className="otherArticles">
      {/* <div className="footer___image">
      
      <StaticImage
        src="../images/Ornament82.jpg"
        alt=""
        layout="fixed"
        placeholder="blurred"
      />
      </div> */}
      <SliceZone slices={article.body} components={components} context={{articles: articles}}/>
     </div>
     
      <div class="bottomPanel">
      <div className="Newsletter">
        <div className="divide">
                  <div className="left">

                  {/* Greenbox */}

                      <h2>Stay in the loop for more</h2>
                      <p>Incididunt nostrud enim cillum dolore ullamco amet id voluptate proident.</p>
                      <div className="emailpannel">     
                        <form >           
                            <input id="NewsletterEmail" name="NewsletterEmail" type="email" placeholder="Your Email"/>
                        </form>
                        <button className="btnPrimary">Sign Up</button>
                      </div>
                  
                  </div>
                  <div className="computerImage">
                      <StaticImage
                  src="../images/DesignIcon.jpg"
                  alt="SnapTrade Logo"
                  placeholder="blurred" 
                  />
             </div>
           </div>
       </div>          
    </div>
    </Layout>
  )
}
export default withPrismicPreview(ArticleTemplate);

export const query = graphql`
  query articleQuery($id: String, $lang: String) {
    prismicArticle(id: { eq: $id },lang: { eq: $lang }) {
      _previewable
      alternate_languages {
        uid
        type
        lang
      }
      lang
      url
      type
      id
      data {
        main_category {
          url
          uid
          document {
            ... on PrismicArticleCategory  {
              id
              data {
                name
              }
            }
          }
        }
        subcategories {
          category {
            document {
              ... on PrismicArticleCategory {
                id
                data {
                  name
                }
              }
            }
          }
        }
        title {
          text
        }
        time
        article_date
        featured_image {
          gatsbyImageData
          alt 
        } 
        article_text {
          richText
        }
        end_of_article_banner {
          document {
            ... on PrismicActionableBanner {
              data {
                banner_image {
                  gatsbyImageData
                  alt
                }
                banner_text {
                  richText
                }
                link {
                  url
                }
              }
            }
          }
        }
        sidebar_banner {
          document {
            ... on PrismicActionableBanner {
              data {
                banner_image {
                  gatsbyImageData
                  alt
                }
                banner_text {
                  richText
                }
                link {
                  url
                }
              }
            }
          }
        }
        body {
          ... on PrismicSliceType {
            id
            slice_type
            slice_label
          }   
          ...ArticleDataBodySummaryListing
          ...ArticleDataBodyCategoriesWithImage
          ...ArticleDataBodyThreeColumnListing
        }
      }
    }
    prismicMenu(lang: { eq: $lang }) {
      ...TopMenuFragment
      ...BottomMenuFragment
    }
    allPrismicArticle {
      nodes {
        data {
          article_date
          article_text {
            richText
          }
          main_category {
            uid
          }
          featured
          featured_image {
            gatsbyImageData
            alt
          }
          time
          title {
            richText
            text
          }
        }
      }
    }
  }
`