import Image from 'next/image'
import styles from './page.module.css'
import Login from './kakao/login'
export default function Home() {
  return (
    <div>
      <Login />
    </div>
  )
}
