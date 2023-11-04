import { ReactNode } from 'react'

export type SeverAccessContextType = {
  severAccess: string
  setSeverAccess: React.Dispatch<React.SetStateAction<string>>
}

export interface SeverAccessProviderProps {
  children: ReactNode
}
