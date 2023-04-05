import * as React from 'react'
import { graphql } from 'gatsby'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import { SliceZone } from '@prismicio/react'
import { getImage, GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText,PrismicLink } from '@prismicio/react'
import { Container } from "../components/Container"
import {FaArrowDown, FaArrowUp, FaStar, FaSearch } from "react-icons/fa"
import { Layout } from '../components/Layout'
import { components } from '../slices'


const ArticleCategoryTemplate = ({ data }) => {
  if (!data) return null

  const articleContent = data.prismicArticleCategory || {}
  const category = articleContent.data || {}
  const menu = data.prismicMenu || {}
  const { lang, type, url } = articleContent || {}
  const alternateLanguages = articleContent.alternate_languages || []
  const activeDoc = {
    lang,
    type,
    url,
    alternateLanguages,
  }

  const articlesData = data.allPrismicArticle || {}
  const articlesAll = articlesData?.nodes || []
  const articles = articleContent.uid === "all" ? articlesAll : articlesAll.filter(article => {return article.data?.main_category?.uid === articleContent.uid;});


  const categoriesData = data.allPrismicArticleCategory || {}
  const otherCats = categoriesData?.nodes || [] 

  const [timeBool, setTimeBool] = React.useState(-1);
  const [updateBool, setUpdateBool] = React.useState(-1);
  const [featuredBool, setFeaturedBool] = React.useState(false);
  const [currentSort, setCurrentSort] = React.useState(null);
  const [sortValues, setSortValues] = React.useState([]);
  const [searchValues, setSearchValues] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  React.useEffect(() => {
    const searched = !searchTerm ? sortValues : sortValues.filter(cur =>
      cur.data.title?.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cur.data.article_text?.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchValues(searched);
  }, [searchTerm, sortValues]);

  const handleSearch = () => {
    setSearchTerm(event.target.value);
  }
  const handleTimeSort = () => {
    setCurrentSort(1);
    setTimeBool(timeBool * -1);
  }
  React.useEffect(() => {
    sortByTime();
  }, [timeBool]);
  const sortByTime = () => {
    const sorted = [...sortValues].sort((a,b) =>  {return a.data.article_date > b.data.article_date ? timeBool *  -1 : a.data.article_date < b.data.article_date ? timeBool * 1 : 
      a.data.title?.text > b.data.title?.text ? timeBool * 1 : timeBool * -1
      });
    setSortValues(sorted);
  };
  
  const handleUpdateSort = () => {
    setCurrentSort(2);
    setUpdateBool(updateBool * -1);
  }
  React.useEffect(() => {
    sortByUpdate();
  }, [updateBool]);
  const sortByUpdate = () => {
    const sorted = [...sortValues].sort((a,b) =>  {return a.last_publication_date > b.last_publication_date ? updateBool *  -1 : a.last_publication_date < b.last_publication_date ? updateBool * 1 : 
    a.data.title?.text > b.data.title?.text ? timeBool * 1 : timeBool * -1
    });
    setSortValues(sorted);
  };
  
  const handleFeaturedSort = () => {
    setFeaturedBool(!featuredBool);
  };

  React.useEffect(() => {
    setSortValues(articles);
    setSearchValues(articles);
  }, []);

  return (
    <Layout menu={menu.data} activeDocMeta={activeDoc}>
      <Container>
      <section className="ArticleCategory">
        <div className="SearchWrap">
          <div className="SearchHeader">
            <h2 className="H3">Search Articles</h2>
            <input type="text" onChange={handleSearch} value={searchTerm} />
            <FaSearch/>
          </div>
          <div className="SearchMenu">
            <h2 className="H3">Sort By</h2>
            <ul className="H4">
              <li>
                <button onClick={handleTimeSort}><span>Most Popular</span>{currentSort === 1 ? timeBool === -1 ? <FaArrowDown/> : <FaArrowUp/> : null}</button>
              </li>
              <li>
                <button onClick={handleUpdateSort}><span>Latest</span>{currentSort === 2 ? updateBool === -1 ? <FaArrowDown/> : <FaArrowUp/> : null}</button>
              </li>
              <li>  
                <button onClick={handleFeaturedSort}><span>Our Top Picks</span>{featuredBool ? <FaStar/> : null}</button>
              </li>
            </ul>    
          </div>
          <div class="line"></div>
          <div className="SearchMenu">
            <h2 className="H3">Filter By Category</h2>
            <ul>
            {otherCats.map((item,index) => (
                <li>
                                 {/* category names from Prismic */}
                                
                  <PrismicLink key={`category:${index}`} href={item.url}> 
                    {item.data?.name}
                  </PrismicLink>
                </li>
            ))}
            </ul>
          </div>
        </div>
        <div className="ArticlesWrap">
          <div className="HeaderWrap">
            <div className="HeadIconWrap">
            <div>
            <h1>{category.name}</h1> 
            <PrismicRichText field={category.description?.richText}/>  
            </div>   
            <div class="snapIcon">
            <StaticImage
            src="../images/snapIcon.jpg"
            alt="SnapTrade Logo"
            placeholder="blurred" 
            />
             </div>
            </div>
          </div>
          <div className="ArticleGrid">
            {searchValues?.map((item,index) => (
              <div className={featuredBool ? !item.data.featured ? + 'Article hidden' : 'Article' : 'Article'} key={`article:${index}`} >
                <PrismicLink href={item?.url || ""} className="articleImage">
                  {item.data.featured_image && 
                    <GatsbyImage
                      image = {item.data.featured_image?.gatsbyImageData}
                      alt = {item.data.featured_image?.alt || ""}
                    />
                  }
                </PrismicLink>
                <div className="articleContent">
                  <h2 className="H3">{item.data?.title?.text}</h2>
                  <p className="articleMeta">{item.data?.main_category?.document?.data?.name} &middot; {item.data?.time} read</p>
                  <p>{item.data?.article_text?.text}</p>    
                </div>
                <PrismicLink className="readLink" href={item.url}>
                  Read More
                </PrismicLink>
              </div>
            ))}
          </div>      
        </div> 
        
            
      </section>
      <div class="bottomPanel">
      <div className="Newsletter">
        <div className="divide">
                  <div className="left">
                      <h2>Stay in the loop for more</h2>
                      <p>Incididunt nostrud enim cillum dolore ullamco amet id voluptate proident.</p>
                        <div className="emailpannel">     
                          <form >           
                              <input id="NewsletterEmail" name="NewsletterEmail" type="email" placeholder="Your email"/>
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

      <SliceZone slices={category.body} components={components} context={{articles: articlesAll}}/>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query articleCategoryQuery($id: String, $lang: String) {
    prismicArticleCategory(id: { eq: $id },lang: { eq: $lang }) {
      _previewable
      alternate_languages {
        uid
        type
        lang
      }
      lang
      url
      uid
      type
      id
      data {
        description {
          richText
        }
        name
        body {
          ... on PrismicSliceType {
            id
            slice_type
            slice_label
          }   
          ...ArticleCategoryDataBodyCategoriesWithImage
        }
      }
    }
    allPrismicArticle {
      nodes {
        url
        last_publication_date
        data {
          article_date
          article_text {
            richText
            text
          }
          main_category {
            uid
            document {
              ... on PrismicArticleCategory  {
                data {
                  name
                }
              }
            }
          }
          time
          title {
            richText
            text
          }
          featured
          featured_image {
            gatsbyImageData(
              placeholder: DOMINANT_COLOR
              width: 326
              height: 326
            )
            alt  
          }
        }
      }
    }
    prismicMenu(lang: { eq: $lang }) {
      ...TopMenuFragment
      ...BottomMenuFragment
    }
    allPrismicArticleCategory(filter: {id: {ne: $lang}}, sort: {fields: data___name}) {
      nodes {
        url
        data {
          name
        }
      }
    }
    
  }
`

export default withPrismicPreview(ArticleCategoryTemplate);