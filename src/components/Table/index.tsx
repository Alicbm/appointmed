import { ReactNode } from "react"
import styles from './styles.module.css'

type Props = {
  children: ReactNode
}

export function Table ({ children }: Props) {
  return (
    <div className={styles.tableContainer}>
      <table>{ children }</table>
    </div>
  )
}