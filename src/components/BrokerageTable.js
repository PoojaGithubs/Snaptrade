import React, { Fragment, useEffect, useMemo, useState } from 'react'
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from 'react-table/dist/react-table.development'
import axios from 'axios'
import styled from 'styled-components'
import { AlertCircle, Check, Loader, Search, X } from 'react-feather'

const Table = styled.div`
  margin: 0px auto;
  text-align: center;
  .loader {
    animation: spin-animation 2s infinite;
    animation-timing-function: linear;
    display: inline-block;
  }
  @keyframes spin-animation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  table {
    border-spacing: 0;
    border: 3px solid #ebb964;
    border-radius: 2rem;
    font-size: 18px;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      text-align: center;
      margin: 0;
      padding: 20px 8px;
      border-bottom: 1px solid #ebb964;
      border-right: 1px solid #ebb964;
      :first-child {
        width: 200px;
      }
      :last-child {
        border-right: 0;
      }
    }
  }
  @media (max-width: 1560px) {
    overflow-x: scroll;
  }
`
const Div = styled.div`
  @media (max-width: 1560px) {
    overflow-x: scroll;
    transform: rotateX(180deg);
    table {
      transform: rotateX(180deg);
    }
  }
`
const Legend = styled.div`
  z-index: 999;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 30px;
  text-align: center;
  svg {
    margin-right: 10px;
  }
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const SearchBrokeragesContainer = styled.div`
  width: 50%;
  position: relative;
  display: flex;
  text-align: center;
  margin: 30px auto;
  input[type='search'] {
    width: 100%;
    font-size: 18px;
    border: 3px solid #ebb964;
    padding: 15px;
    height: 70px;
    border-radius: 3rem;
    outline: none;
    color: black;
  }
  input:focus {
    border: 3px solid var #ebb964;
  }
  svg {
    margin-left: -50px;
    position: relative;
    top: 18px;
    width: 30px;
    height: 30px;
    text-align: center;
  }
  @media (max-width: 900px) {
    width: 100%;
    margin-top: 50px;
    input[type='search'] {
      font-size: 15px;
      height: 60px;
    }
    svg {
      width: 25px;
      height: 25px;
    }
  }
`
const InputPrimary = styled.input`
  border: none;
  border-bottom: 1px solid red;
  box-sizing: border-box;
  font-size: 22px;
  padding: 28px 18px 15px 0;
  border-radius: 0;
  width: 100%;
  outline: none;
  margin-bottom: 25px;
  -webkit-appearance: none;
  background: #fff;
  &:focus {
    border: 1px solid blue;
    outline: 4px solid rgba(0, 59, 162, 0.44);
  }
`

function GlobalFilter({ globalFilter, setGlobalFilter }) {
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined)
  }, 500)

  return (
    <SearchBrokeragesContainer>
      <InputPrimary
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
        placeholder="Type to look for a brokerage"
        type="search"
      />
      <Search />
    </SearchBrokeragesContainer>
  )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val

const BrokerageTable = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const result = await axios('https://api.passiv.com/api/v1/brokerages/')
      // sort by display name
      const brokerages = result.data
        .filter((brokerage) => brokerage.slug !== 'ALLY-INVEST' && brokerage.slug !== 'INTERACTIVE-BROKERS')
        .sort((a, b) => a.display_name > b.display_name)
      setData(brokerages)
      setLoading(false)
    })()
  }, [])

  const today = new Date()

  const isMaintenanceMode = (maintenance_windows) => {
    return (
      Date.parse(maintenance_windows.start_time) <= Date.parse(today) &&
      Date.parse(today) <= Date.parse(maintenance_windows.end_time)
    )
  }

  const columns = useMemo(
    () => [
      {
        Header: '',
        accessor: 'aws_s3_logo_url',
        Cell: (tableProps) => (
          <img
            src={tableProps.row.original.aws_s3_logo_url}
            width={120}
            alt="Player"
          />
        ),
      },
      {
        Header: 'Brokerage',
        accessor: 'display_name',
      },
      {
        Header: 'Operational',
        accessor: (d) =>
          d.maintenance_windows.length > 0 && d.maintenance_windows[0],
        Cell: (tableProps) => (
          <div>
            {isMaintenanceMode(
              tableProps.row.original.maintenance_windows.length > 0 &&
                tableProps.row.original.maintenance_windows[0],
            ) || tableProps.row.original.maintenance_mode ? (
              <X size={28} color="red" />
            ) : (
              <Check size={28} color="green" />
            )}
          </div>
        ),
      },
      {
        Header: 'Fractional Unit',
        accessor: (d) => d.allows_fractional_units,
        Cell: (tableProps) => (
          <div>
            {tableProps.row.original.allows_fractional_units === true ? (
              <Check size={28} color="green" />
            ) : tableProps.row.original.allows_fractional_units === false ? (
              <X size={28} color="red" />
            ) : (
              <AlertCircle size={28} color="orange" />
            )}
          </div>
        ),
      },
      {
        Header: 'Trading',
        accessor: (d) => d.allows_trading,
        Cell: (tableProps) => (
          <div>
            {tableProps.row.original.allows_trading === true ? (
              <Check size={28} color="green" />
            ) : tableProps.row.original.allows_trading === false ? (
              <X size={28} color="red" />
            ) : (
              <AlertCircle size={28} color="orange" />
            )}
          </div>
        ),
      },
      {
        Header: 'Reporting And Activities',
        accessor: (d) => d.has_reporting,
        Cell: (tableProps) => (
          <div>
            {tableProps.row.original.has_reporting === true ? (
              <Check size={28} color="green" />
            ) : tableProps.row.original.has_reporting === false ? (
              <X size={28} color="red" />
            ) : (
              <AlertCircle size={28} color="orange" />
            )}
          </div>
        ),
      },
      {
        Header: 'Options (positions)',
        accessor: (d) => d.has_option_position_support,
        Cell: (tableProps) => (
          <div>
            {tableProps.row.original.has_option_position_support === true ? (
              <Check size={28} color="green" />
            ) : tableProps.row.original.has_option_position_support ===
              false ? (
              <X size={28} color="red" />
            ) : (
              <AlertCircle size={28} color="orange" />
            )}
          </div>
        ),
      },
      {
        Header: 'Options (trading)',
        accessor: (d) => d.has_option_trading_support,
        Cell: (tableProps) => (
          <div>
            {tableProps.row.original.has_option_trading_support === true ? (
              <Check size={28} color="green" />
            ) : tableProps.row.original.has_option_trading_support === false ? (
              <X size={28} color="red" />
            ) : (
              <AlertCircle size={28} color="orange" />
            )}
          </div>
        ),
      },
      {
        Header: 'Options (activities)',
        accessor: (d) => d.has_option_activities_support,
        Cell: (tableProps) => (
          <div>
            {tableProps.row.original.has_option_activities_support === true ? (
              <Check size={28} color="green" />
            ) : tableProps.row.original.has_option_activities_support ===
              false ? (
              <X size={28} color="red" />
            ) : (
              <AlertCircle size={28} color="orange" />
            )}
          </div>
        ),
      },
      {
        Header: 'OAuth Connection',
        accessor: (d) => d.authorization_types[0].auth_type,
        Cell: (tableProps) => (
          <div>
            {tableProps.row.original.authorization_types[0].auth_type ===
            'OAUTH' ? (
              <Check size={28} color="green" />
            ) : (
              <AlertCircle size={28} color="orange" />
            )}
          </div>
        ),
      },
      {
        Header: 'Brokerage Type',
        accessor: 'brokerage_type.name',
      },
    ],
    [],
  )

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    [],
  )

  const tableInstance = useTable(
    { columns, data, filterTypes },
    useFilters,
    useGlobalFilter,
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    state,
    prepareRow,
    setGlobalFilter,
  } = tableInstance

  return (
    <Table>
      {!loading && (
        <Fragment>
          <Legend>
            <p>
              <Check size={28} color="green" />
              Supported
            </p>
            <p>
              {' '}
              <AlertCircle size={28} color="orange" />
              Not supported by brokerage
            </p>
            <p>
              {' '}
              <X size={28} color="red" />
              Not supported
            </p>
          </Legend>
          <GlobalFilter
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </Fragment>
      )}

      <Div>
        {loading ? (
          <Loader size={80} color="#6A9F9A" className="loader" />
        ) : (
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()} key={column}>
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row)
                // filtering out Aggregator brokerages like "Wealthica"
                if (row.values['brokerage_type.name'] === 'Aggregator') {
                  return <></>
                }
                return (
                  <tr {...row.getRowProps()} key={row}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()} key={cell}>
                          {cell.render('Cell')}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </Div>
    </Table>
  )
}

export default BrokerageTable
