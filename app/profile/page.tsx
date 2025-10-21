import { getProfile } from '@/lib/mdx'

export default function ProfilePage() {
  const profile = getProfile()

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div className="window">
        <div className="window-title">PROFILE.TXT - Personal Information</div>
        <div className="window-content">
          <div className="content-box markdown">
            <div dangerouslySetInnerHTML={{ __html: profile.content }} />
          </div>
        </div>
      </div>
    </main>
  )
}