import React from 'react'
import { Text } from '../../common/locale/script'
import { useSelector } from 'react-redux'

function Home() {
  const locale = useSelector((state) => state.locale.value)
  return (
    <div>wefweferw</div>
  )
}

export default Home