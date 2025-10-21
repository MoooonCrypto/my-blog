import { getSandboxItems } from '../lib/mdx'
import SandboxList from '../components/SandboxList'

export default async function SandboxPage() {
  const sandboxItems = await getSandboxItems()

  return (
    <div className="container">
      <div className="window">
        <div className="window-title">SANDBOX.DIR - Experimental Projects</div>
        <div className="window-content">
          <SandboxList items={sandboxItems} />
        </div>
      </div>
    </div>
  )
}
