const TO_EMAIL = 'ai@aipe.uk';
const SPREADSHEET_ID = '1z9SFxUbCzORPb7MU8y5yc3031JlwreIeSTUIs8XfYU8';
const PARTNERSHIP_SHEET_NAME = 'Partnership Enquiries';
const CONTACT_SHEET_NAME = 'Contact Enquiries';
const LEARNER_ACCESS_SHEET_NAME = 'Learner Access';
const TIME_ZONE = 'Europe/London';
const LEARNER_STATUS_OPTIONS = ['Active', 'Enrolled', 'Not enrolled', 'Paused', 'Completed', 'Withdrawn'];
const PORTAL_ACCESS_OPTIONS = ['Yes', 'No'];

function doPost(e) {
  try {
    const data = JSON.parse((e.postData && e.postData.contents) || '{}');
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);

    if (data.formType === 'learnerAccess') {
      return handleLearnerAccess(spreadsheet, data);
    }

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

function handleLearnerAccess(spreadsheet, data) {
  const email = normalize(data.email);
  const accessCode = normalize(data.accessCode);

  if (!email || !accessCode) {
    return jsonResponse({
      ok: true,
      authorized: false,
      message: 'Email and access code are required.'
    });
  }

  const sheet = spreadsheet.getSheetByName(LEARNER_ACCESS_SHEET_NAME) || spreadsheet.insertSheet(LEARNER_ACCESS_SHEET_NAME);
  const headers = [
    'Email',
    'Access code',
    'Learner name',
    'Course',
    'Status',
    'Portal access',
    'Start date',
    'End date',
    'Last login',
    'Notes'
  ];

  ensureHeaders(sheet, headers);
  applyLearnerAccessValidation(sheet);

  const values = sheet.getDataRange().getValues();
  for (var rowIndex = 1; rowIndex < values.length; rowIndex += 1) {
    const row = values[rowIndex];
    const rowEmail = normalize(row[0]);
    const rowAccessCode = normalize(row[1]);
    const status = normalize(row[4]);
    const portalAccess = normalize(row[5]);

    if (rowEmail === email && rowAccessCode === accessCode) {
      const learnerCanAccess = status === 'active' && portalAccess === 'yes';

      if (!learnerCanAccess) {
        return jsonResponse({
          ok: true,
          authorized: false,
          message: 'Your learner access is not active yet. Please contact AIPE if you think this is incorrect.'
        });
      }

      sheet.getRange(rowIndex + 1, 9).setValue(londonTimestamp());

      return jsonResponse({
        ok: true,
        authorized: true,
        learnerName: row[2] || '',
        course: row[3] || ''
      });
    }
  }

  return jsonResponse({
    ok: true,
    authorized: false,
    message: 'We could not find active learner access for those details. Please check your email and access code or contact AIPE.'
  });
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
    londonTimestamp(),
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
    londonTimestamp(),
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

function londonTimestamp() {
  return Utilities.formatDate(new Date(), TIME_ZONE, 'yyyy-MM-dd HH:mm:ss');
}

function applyLearnerAccessValidation(sheet) {
  const maxRows = Math.max(sheet.getMaxRows() - 1, 1);
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(LEARNER_STATUS_OPTIONS, true)
    .setAllowInvalid(false)
    .build();
  const portalAccessRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(PORTAL_ACCESS_OPTIONS, true)
    .setAllowInvalid(false)
    .build();

  sheet.getRange(2, 5, maxRows, 1).setDataValidation(statusRule);
  sheet.getRange(2, 6, maxRows, 1).setDataValidation(portalAccessRule);
}

function normalize(value) {
  return String(value || '').trim().toLowerCase();
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
