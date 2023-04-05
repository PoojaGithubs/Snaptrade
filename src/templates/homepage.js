import * as React from 'react'
import { graphql } from 'gatsby'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import { SliceZone } from '@prismicio/react'

import { Layout } from '../components/Layout'
import { components } from '../slices'

const HomepageTemplate = ({ data }) => {
  if (!data) return null

  const homepage = data.prismicHomepage || {}
  const menu = data.prismicMenu || {}

  const { lang, type, url } = homepage || {}
  const alternateLanguages = homepage.alternate_languages || []
  const activeDoc = {
    lang,
    type,
    url,
    alternateLanguages,
  }

  return (
    <Layout menu={menu.data} activeDocMeta={activeDoc}>
      <SliceZone slices={homepage.data?.body} components={components} />
    </Layout>
  )
}
export const query = graphql`
  query homepageQuery($lang: String) {
    prismicHomepage(lang: { eq: $lang }) {
      _previewable
      alternate_languages {
        uid
        type
        lang
      }
      lang
      url
      type
      data {
        body {
          ... on PrismicSliceType {
            id
            slice_type
            slice_label
          }
        
          ...HomepageDataBodyApi
          ...HomepageDataBodyBrokerageGrid
          ...HomepageDataBodyCta
          ...HomepageDataBodyFeatures
          ...HomepageDataBodyHero
          ...HomepageDataBodyStatBar
          ...HomepageDataBodyTextImage

        }
      }
      
    }
    prismicMenu(lang: { eq: $lang }) {
      ...TopMenuFragment
      ...BottomMenuFragment
    }
  }
`

export default withPrismicPreview(HomepageTemplate)
