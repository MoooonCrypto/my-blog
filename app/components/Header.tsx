'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const pages = [
  { id: 'home', label: 'Home', icon: '📁', href: '/' },
  { id: 'profile', label: 'Profile', icon: '📄', href: '/profile' },
  { id: 'portfolio', label: 'Portfolio', icon: '▣', href: '/portfolio' },
  { id: 'blog', label: 'Blog', icon: '📁', href: '/blog' },
  { id: 'sandbox', label: 'Sandbox', icon: '📄', href: '/sandbox' }
]

export default function Header() {
  const [displayLogo, setDisplayLogo] = useState('')
  const logoText = '◊ MOKOSAU. ◊'

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < logoText.length) {
        setDisplayLogo(logoText.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="window">
      <div className="window-title">MOKOSAU. - Personal Computer System v1.0</div>
      <div className="window-content">
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#000080',
            textShadow: '1px 1px 0px #ffffff',
            marginBottom: '10px',
            fontFamily: 'monospace'
          }}>
            {displayLogo}
          </div>
          <div style={{
            fontSize: '16px',
            color: '#000',
            background: '#ffffff',
            padding: '8px 16px',
            border: '2px inset #c0c0c0',
            display: 'inline-block'
          }}>
            個人開発エンジニアのデジタル記録庫
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '20px',
          justifyContent: 'center'
        }}>
          {pages.map(page => (
            <Link key={page.id} href={page.href} className="btn">
              <span style={{ marginRight: '4px' }}>{page.icon}</span>
              {page.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}