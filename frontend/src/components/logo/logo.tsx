"use client";

import Link from 'next/link';
import React from 'react'

interface LogoProps {
  url: string;
  size?: string;
  fontSize?: string;
  classContainer?: string;
}

export const Logo = (props: LogoProps) => {
  const { url, size = '40px', fontSize = '24px', classContainer = 'flex items-center justify-center' } = props;

  return (
    <div className={classContainer}>
      <Link href={url}>
        <img src={"./logo.svg"} alt="logo" style={{ width: size, height: size, fontSize }} />
      </Link>
    </div>
  )
}