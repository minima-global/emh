export type ChartValues = {
  count: number
  colour: string
}

export type ChartData = {
  [address: string]: ChartValues
}

/**
 * Static info props
 */
export interface InfoProps {
  title: string
  data: string[]
}

export const enum PageTypes {
  ABOUT = 'about',
  HELP = 'help',
  CONTACT = 'contact'
}
