//import { compose } from 'redux'

export const getList = (props: string[]): string => {
  let xs: string = ``
  props.forEach((value) => {
    xs += `${value}<br />`
  })
  return xs
}

export const getKeyedList = (props: object): string[] =>
  Object.entries(props).map((entry) =>
    `${entry[0]}: ${entry[1]}`
  )

// https://medium.com/javascript-scene/curry-and-function-composition-2c208d774983
const compose = (...fns: any) => (x: any) => fns.reduceRight((y: any, f: any) => f(y), x)
// const compose = (f, g) => x => f(g(x))
export const get = compose(getList, getKeyedList)
