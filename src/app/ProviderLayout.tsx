'use client'

import { Provider } from 'react-redux'
import { store } from './redux'

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Provider store={store}>{children}</Provider>
}
