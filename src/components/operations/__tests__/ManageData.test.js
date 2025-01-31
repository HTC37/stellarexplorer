import React from 'react'
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import ManageData from '../ManageData'

configure({adapter: new Adapter()})

describe('ManageData', () => {
  it('decodes ordinary string values', () => {
    const link = shallow(<ManageData name="lang" value="aW5kb25lc2lhbg==" />)
    expect(link.getElements()).toMatchInlineSnapshot(`
    Array [
      <span>
        <FormattedMessage
          id="operation.manage.data.set"
          values={
            Object {
              "name": "lang",
            }
          }
        />
        <FormattedMessage
          id="operation.manage.data.set.to"
          values={
            Object {
              "value": "indonesian",
            }
          }
        />
      </span>,
    ]
  `)
  })

  it('decodes utf8 string values', () => {
    const link = shallow(
      <ManageData name="utf8value" value="6ams6ams6JmO6JmO" />
    )
    expect(link.getElements()).toMatchInlineSnapshot(`
    Array [
      <span>
        <FormattedMessage
          id="operation.manage.data.set"
          values={
            Object {
              "name": "utf8value",
            }
          }
        />
        <FormattedMessage
          id="operation.manage.data.set.to"
          values={
            Object {
              "value": "马马虎虎",
            }
          }
        />
      </span>,
    ]
  `)
  })

  it('truncates a long key and long value', () => {
    const aLongPrefix = 'some_really_long_12345678901234567890123456789'
    const aLongName = `name_${aLongPrefix}`
    const aLongValue = Buffer.from(`value_${aLongPrefix}`).toString('base64')
    const link = shallow(<ManageData name={aLongName} value={aLongValue} />)
    expect(link.getElements()).toMatchInlineSnapshot(`
    Array [
      <span>
        <FormattedMessage
          id="operation.manage.data.set"
          values={
            Object {
              "name": "name_some_really_long_12345...",
            }
          }
        />
        <FormattedMessage
          id="operation.manage.data.set.to"
          values={
            Object {
              "value": "value_some_really_long_1234...",
            }
          }
        />
      </span>,
    ]
  `)
  })
})
