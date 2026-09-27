const TO_EMAIL = 'ai@aipe.uk';
const PARTNERSHIP_SHEET_NAME = 'Partnership Enquiries';
const CONTACT_SHEET_NAME = 'Contact Enquiries';

function doPost(e) {
  try {
    const data = JSON.parse((e.postData && e.postData.contents) || '{}');
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

    if (data.formType === 'contact') {
      handleContactEnquiry(spreadsheet, data);
    } else {
      handlePartnershipEnquiry(spreadsheet, data);
    }

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({
      ok: false,
      message: error.message
    });
  }
}

function handlePartnershipEnquiry(spreadsheet, data) {
  const missingField = ['name', 'organisation', 'email'].find(function (field) {
    return !data[field];
  });

  if (missingField) {
    throw new Error(missingField + ' is required.');
  }

  const sheet = spreadsheet.getSheetByName(PARTNERSHIP_SHEET_NAME) || spreadsheet.insertSheet(PARTNERSHIP_SHEET_NAME);
  const headers = [
    'Submitted at',
    'Name',
    'Organisation',
    'Role/job title',
    'Email',
    'Phone',
    'Organisation type',
    'Areas of interest',
    'Message',
    'Status',
    'Follow-up date',
    'Notes'
  ];

  ensureHeaders(sheet, headers);

  const interests = Array.isArray(data.interests) ? data.interests.join(', ') : '';
  sheet.appendRow([
    new Date(),
    data.name || '',
    data.organisation || '',
    data.role || '',
    data.email || '',
    data.phone || '',
    data.organisationType || '',
    interests,
    data.message || '',
    'New',
    '',
    ''
  ]);

  MailApp.sendEmail({
    to: TO_EMAIL,
    replyTo: data.email || undefined,
    subject: 'AIPE partnership conversation: ' + (data.organisation || data.name),
    body: [
      'New AIPE partnership enquiry',
      '',
      'Name: ' + (data.name || ''),
      'Organisation: ' + (data.organisation || ''),
      'Role/job title: ' + (data.role || ''),
      'Email: ' + (data.email || ''),
      'Phone: ' + (data.phone || 'Not provided'),
      'Organisation type: ' + (data.organisationType || 'Not selected'),
      'Areas of interest: ' + (interests || 'Not selected'),
      '',
      'Message / what they are looking for:',
      data.message || 'Not provided',
      '',
      'Sheet: ' + spreadsheet.getUrl()
    ].join('\n')
  });
}

function handleContactEnquiry(spreadsheet, data) {
  const missingField = ['name', 'email', 'message'].find(function (field) {
    return !data[field];
  });

  if (missingField) {
    throw new Error(missingField + ' is required.');
  }

  const sheet = spreadsheet.getSheetByName(CONTACT_SHEET_NAME) || spreadsheet.insertSheet(CONTACT_SHEET_NAME);
  const headers = [
    'Submitted at',
    'Name',
    'Email',
    'Phone',
    'Message',
    'Status',
    'Follow-up date',
    'Notes'
  ];

  ensureHeaders(sheet, headers);

  sheet.appendRow([
    new Date(),
    data.name || '',
    data.email || '',
    data.phone || '',
    data.message || '',
    'New',
    '',
    ''
  ]);

  MailApp.sendEmail({
    to: TO_EMAIL,
    replyTo: data.email || undefined,
    subject: 'AIPE website enquiry: ' + (data.name || data.email),
    body: [
      'New AIPE website enquiry',
      '',
      'Name: ' + (data.name || ''),
      'Email: ' + (data.email || ''),
      'Phone: ' + (data.phone || 'Not provided'),
      '',
      'Message:',
      data.message || 'Not provided',
      '',
      'Sheet: ' + spreadsheet.getUrl()
    ].join('\n')
  });
}

function ensureHeaders(sheet, headers) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
