import { getPortfolioItems } from '../lib/mdx'
import PortfolioGrid from '../components/PortfolioGrid'

export default async function PortfolioPage() {
  const portfolioItems = await getPortfolioItems()

  return (
    <div className="container">
      <div className="window">
        <div className="window-title">PORTFOLIO.EXE - Project Gallery</div>
        <div className="window-content">
          <PortfolioGrid items={portfolioItems} />
        </div>
      </div>
    </div>
  )
}
