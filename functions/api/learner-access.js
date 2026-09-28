const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json'
    }
  });
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function onRequestPost({ request, env }) {
  if (!env.GOOGLE_APPS_SCRIPT_PARTNERSHIP_URL) {
    return jsonResponse({ message: 'Learner access is not configured yet.' }, 500);
  }

  const data = await request.json().catch(() => null);
  if (!data || !data.email || !data.accessCode) {
    return jsonResponse({ message: 'Email and access code are required.' }, 400);
  }

  const response = await fetch(env.GOOGLE_APPS_SCRIPT_PARTNERSHIP_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ ...data, formType: 'learnerAccess' })
  });

  const text = await response.text();
  let result = {};
  try {
    result = JSON.parse(text);
  } catch {
    result = { message: text };
  }

  if (!response.ok || result.ok === false) {
    return jsonResponse({ message: result.message || 'Learner access could not be checked.' }, 502);
  }

  if (!result.authorized) {
    return jsonResponse({
      message: 'Learner access was not recognised or is not active yet. Please check your email and access code, or contact AIPE for support.'
    }, 401);
  }

  return jsonResponse({
    message: 'Learner access confirmed.',
    learnerName: result.learnerName || '',
    course: result.course || '',
    courses: Array.isArray(result.courses) ? result.courses : []
  });
}
