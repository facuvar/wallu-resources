// API endpoint para autenticación con GitHub OAuth
export async function GET({ url }) {
  const code = url.searchParams.get('code');
  
  if (!code) {
    // Redirigir a GitHub para autenticación
    const clientId = import.meta.env.GITHUB_CLIENT_ID;
    const redirectUri = `${import.meta.env.SITE}/api/auth`;
    const scope = 'repo,user:email';
    
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    
    return new Response(null, {
      status: 302,
      headers: {
        Location: githubAuthUrl
      }
    });
  }
  
  try {
    // Intercambiar el código por un token de acceso
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: import.meta.env.GITHUB_CLIENT_ID,
        client_secret: import.meta.env.GITHUB_CLIENT_SECRET,
        code: code,
      }),
    });
    
    const tokenData = await tokenResponse.json();
    
    if (tokenData.access_token) {
      // Redirigir de vuelta al admin con el token
      const adminUrl = `/admin/?token=${tokenData.access_token}`;
      return new Response(null, {
        status: 302,
        headers: {
          Location: adminUrl
        }
      });
    } else {
      throw new Error('No se pudo obtener el token de acceso');
    }
  } catch (error) {
    console.error('Error en autenticación:', error);
    return new Response('Error en autenticación', { status: 500 });
  }
}
