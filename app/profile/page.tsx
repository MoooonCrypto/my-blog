import { getProfile } from '../lib/mdx'

export default async function ProfilePage() {
  const profile = await getProfile()

  return (
    <div className="container">
      <div className="window">
        <div className="window-title">PROFILE.TXT - Personal Information</div>
        <div className="window-content">
          <div className="profile-content">
            <div dangerouslySetInnerHTML={{ __html: profile.content }} />
          </div>
        </div>
      </div>
    </div>
  )
}