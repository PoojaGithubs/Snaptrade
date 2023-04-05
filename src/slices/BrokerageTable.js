import * as React from 'react'
import { graphql } from 'gatsby'
import BrokerageTable from '../components/BrokerageTable'

export const BrokerageTableSection = ({ slice }) => {
  return (
    <section className="table_padding">
      <div className="Container">
        <div className="flex___wrap">
          <div className="flex___item large">
            <h1 style={{ textAlign: 'center', marginBottom: '100px' }}>
              {slice.primary.title}
            </h1>
            <BrokerageTable />
          </div>
        </div>
      </div>
    </section>
  )
}

export const query = graphql`
  fragment PageDataBodyBrokerageTable on PrismicPageDataBodyBrokerageTable {
    id
    primary {
      title
    }
  }
`