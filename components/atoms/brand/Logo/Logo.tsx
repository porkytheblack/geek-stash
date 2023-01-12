import Image from 'next/image'
import React from 'react'

function Logo() {
  return (
    <Image
          width={50}
          height={50}
          src="/brand/logo.svg" alt={'Logo'}    />
  )
}

export default Logo