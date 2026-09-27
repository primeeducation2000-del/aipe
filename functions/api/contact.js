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
    return jsonResponse({ message: 'Google Sheets endpoint is not configured.' }, 500);
  }

  const data = await request.json().catch(() => null);
  if (!data || !data.name || !data.email || !data.message) {
    return jsonResponse({ message: 'Name, email and message are required.' }, 400);
  }

  const response = await fetch(env.GOOGLE_APPS_SCRIPT_PARTNERSHIP_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ ...data, formType: 'contact' })
  });

  const text = await response.text();
  let result = {};
  try {
    result = JSON.parse(text);
  } catch {
    result = { message: text };
  }

  if (!response.ok || result.ok === false) {
    return jsonResponse({ message: result.message || 'Google Sheets rejected the submission.' }, 502);
  }

  return jsonResponse({ message: 'Enquiry sent.' });
}
