export async function GET({ url, redirect }) {
  const code = url.searchParams.get('code')
  
  if (!code) {
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${import.meta.env.GITHUB_CLIENT_ID}&scope=repo`
    return redirect(authUrl)
  }
  
  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
    body: new URLSearchParams({
      client_id: import.meta.env.GITHUB_CLIENT_ID,
      client_secret: import.meta.env.GITHUB_CLIENT_SECRET,
      code
    })
  })
  
  const { access_token } = await tokenResponse.json()
  return redirect(`/admin?token=${access_token}`)
}
