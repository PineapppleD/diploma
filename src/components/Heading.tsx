import React from 'react'

type Props = {
    size: "base" | "2xl" | "3xl";
    children: React.ReactNode;
}

export default function Heading({size, children}: Props) {
  return (
    <p className={`font-roboto-serif text-${size}`} >
        {children}
    </p>
  )
}
