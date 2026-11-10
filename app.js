const STATUS_LABELS = {
  pending: 'Menunggu',
  paid: 'Lunas',
  expired: 'Kedaluwarsa',
  cancelled: 'Dibatalkan',
};

const SECURITY_LABELS = {
  login_ok: 'Masuk berhasil',
  login_fail: 'Percobaan masuk gagal',
  login_blocked: 'Login diblokir sementara',
  ip_blocked: 'Akses ditolak (IP tidak diizinkan)',
  account_connect: 'Akun GoPay dihubungkan',
  account_disconnect: 'Akun GoPay diputuskan',
  profile_create: 'Profil baru dibuat',
  profile_select: 'Profil dibuka',
  profile_update: 'Profil diubah',
  profile_delete: 'Profil dihapus',
  admin_ip_trusted: 'IP disetujui sebagai admin',
  profile_ip_trusted: 'IP disetujui untuk profil',
  api_key_regenerated: 'API Key digenerate ulang',
};

const ACCOUNT_LABELS = {
  idle: 'Belum terhubung',
  connecting: 'Menghubungkan…',
  otp_required: 'Butuh OTP',
  connected: 'Terhubung',
  error: 'Gagal terhubung',
};

const state = {
  mode: 'password',
  isAdmin: true,
  session: null,
  profile: null,
  account: null,
  settings: null,
  qris: null,
  bill: null,
  qrString: null,
  bills: [],
  overviewTimer: null,
  accountTimer: null,
  detailTimer: null,
  countdownTimer: null,
  tick: 0,
  transactionsLoaded: false,
  toastTimer: null,
  apiKey: null,
  docsLang: 'curl',
};

const el = {
  gate: document.getElementById('gate'),
  loginForm: document.getElementById('loginForm'),
  loginBtn: document.getElementById('loginBtn'),
  password: document.getElementById('password'),
  totpField: document.getElementById('totpField'),
  totpCode: document.getElementById('totpCode'),
  gateError: document.getElementById('gateError'),
  app: document.getElementById('app'),
  boot: document.getElementById('boot'),
  profiles: document.getElementById('profiles'),
  profileList: document.getElementById('profileList'),
  profileForm: document.getElementById('profileForm'),
  profileName: document.getElementById('profileName'),
  profilePhone: document.getElementById('profilePhone'),
  profileQris: document.getElementById('profileQris'),
  profilePin: document.getElementById('profilePin'),
  profileBtn: document.getElementById('profileBtn'),
  profileError: document.getElementById('profileError'),
  profileCreate: document.getElementById('profileCreate'),
  profileChipText: document.getElementById('profileChipText'),
  switchProfileBtn: document.getElementById('switchProfileBtn'),
  deleteProfileBtn: document.getElementById('deleteProfileBtn'),
  editProfileSection: document.getElementById('editProfileSection'),
  editProfileForm: document.getElementById('editProfileForm'),
  editProfileName: document.getElementById('editProfileName'),
  editProfilePhone: document.getElementById('editProfilePhone'),
  editProfileQris: document.getElementById('editProfileQris'),
  editProfilePin: document.getElementById('editProfilePin'),
  saveProfileBtn: document.getElementById('saveProfileBtn'),
  editProfileError: document.getElementById('editProfileError'),
  gateIp: document.getElementById('visitorIpDisplay') || document.getElementById('gateIp'),
  acctQris: document.getElementById('acctQris'),
  accountChip: document.getElementById('accountChip'),
  accountChipText: document.getElementById('accountChipText'),
  accountBtn: document.getElementById('accountBtn'),
  accountBackdrop: document.getElementById('accountBackdrop'),
  drawerCloseBtn: document.getElementById('drawerCloseBtn'),
  billFilterPills: document.getElementById('billFilterPills'),
  logoutBtn: document.getElementById('logoutBtn'),
  accountPanel: document.getElementById('accountPanel'),
  acctState: document.getElementById('acctState'),
  acctMerchant: document.getElementById('acctMerchant'),
  acctMethod: document.getElementById('acctMethod'),
  acctPhone: document.getElementById('acctPhone'),
  acctCache: document.getElementById('acctCache'),
  acctError: document.getElementById('acctError'),
  connectBtn: document.getElementById('connectBtn'),
  disconnectBtn: document.getElementById('disconnectBtn'),
  otpForm: document.getElementById('otpForm'),
  otpCode: document.getElementById('otpCode'),
  otpPhone: document.getElementById('otpPhone'),
  registerScreen: document.getElementById('registerScreen'),
  btnGoToRegister: document.getElementById('btnGoToRegister'),
  wizardForm: document.getElementById('wizardForm'),
  wizName: document.getElementById('wizName'),
  wizPhone: document.getElementById('wizPhone'),
  wizQris: document.getElementById('wizQris'),
  wizPin: document.getElementById('wizPin'),
  wizPinConfirm: document.getElementById('wizPinConfirm'),
  wizError: document.getElementById('wizError'),
  wizCancelBtn: document.getElementById('wizCancelBtn'),
  wizStep1NextBtn: document.getElementById('wizStep1NextBtn'),
  wizStep2BackBtn: document.getElementById('wizStep2BackBtn'),
  wizStep2NextBtn: document.getElementById('wizStep2NextBtn'),
  wizStep3BackBtn: document.getElementById('wizStep3BackBtn'),
  wizSubmitBtn: document.getElementById('wizSubmitBtn'),
  wizQrisPreview: document.getElementById('wizQrisPreview'),
  wizQrisMerchantName: document.getElementById('wizQrisMerchantName'),
  wizQrisCity: document.getElementById('wizQrisCity'),
  pinModalOverlay: document.getElementById('pinModalOverlay'),
  modalPinInput: document.getElementById('modalPinInput'),
  pinModalForm: document.getElementById('pinModalForm'),
  pinModalError: document.getElementById('pinModalError'),
  pinModalCancelBtn: document.getElementById('pinModalCancelBtn'),
  pinModalSubmitBtn: document.getElementById('pinModalSubmitBtn'),
  pinModalProfileName: document.getElementById('pinModalProfileName'),
  adminModalOverlay: document.getElementById('adminModalOverlay'),
  modalAdminPasswordInput: document.getElementById('modalAdminPasswordInput'),
  adminModalForm: document.getElementById('adminModalForm'),
  adminModalError: document.getElementById('adminModalError'),
  adminModalCancelBtn: document.getElementById('adminModalCancelBtn'),
  adminModalSubmitBtn: document.getElementById('adminModalSubmitBtn'),
  statPending: document.getElementById('statPending'),
  statTotal: document.getElementById('statTotal'),
  statPaid: document.getElementById('statPaid'),
  statAmount: document.getElementById('statAmount'),
  qrisWarning: document.getElementById('qrisWarning'),
  createForm: document.getElementById('createForm'),
  amount: document.getElementById('amount'),
  note: document.getElementById('note'),
  createBtn: document.getElementById('createBtn'),
  billStatus: document.getElementById('billStatus'),
  qrBox: document.getElementById('qrBox'),
  billAmount: document.getElementById('billAmount'),
  billNote: document.getElementById('billNote'),
  billRef: document.getElementById('billRef'),
  billExpires: document.getElementById('billExpires'),
  billCreated: document.getElementById('billCreated'),
  billPaidAt: document.getElementById('billPaidAt'),
  billTx: document.getElementById('billTx'),
  billChecked: document.getElementById('billChecked'),
  billHint: document.getElementById('billHint'),
  checkBtn: document.getElementById('checkBtn'),
  copyQrBtn: document.getElementById('copyQrBtn'),
  cancelBtn: document.getElementById('cancelBtn'),
  billFilter: document.getElementById('billFilter'),
  billList: document.getElementById('billList'),
  refreshBills: document.getElementById('refreshBills'),
  txList: document.getElementById('txList'),
  txMeta: document.getElementById('txMeta'),
  txRefresh: document.getElementById('txRefresh'),
  secList: document.getElementById('secList'),
  secRefresh: document.getElementById('secRefresh'),
  toast: document.getElementById('toast'),
  docsModal: document.getElementById('docsModal'),
  docsBackdrop: document.getElementById('docsBackdrop'),
  navDocsBtn: document.getElementById('navDocsBtn'),
  docsModalCloseBtn: document.getElementById('docsModalCloseBtn'),
  docsProfileName: document.getElementById('docsProfileName'),
  docsBaseUrlDisplay: document.getElementById('docsBaseUrlDisplay'),
  copyBaseUrlBtn: document.getElementById('copyBaseUrlBtn'),
  docsNavTabs: document.getElementById('docsNavTabs'),
  apiKeyDisplay: document.getElementById('apiKeyDisplay'),
  toggleApiKeyVisibilityBtn: document.getElementById('toggleApiKeyVisibilityBtn'),
  copyApiKeyBtn: document.getElementById('copyApiKeyBtn'),
  regenerateApiKeyBtn: document.getElementById('regenerateApiKeyBtn'),
  docsLangPills: document.getElementById('docsLangPills'),
  codeSnippetCreate: document.getElementById('codeSnippetCreate'),
  codeSnippetCheck: document.getElementById('codeSnippetCheck'),
  codeSnippetList: document.getElementById('codeSnippetList'),
  codeSnippetCancel: document.getElementById('codeSnippetCancel'),
};

function formatRupiah(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}

function formatTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('id-ID', { timeStyle: 'medium' }).format(date);
}

function statusLabel(status) {
  return STATUS_LABELS[status] || 'Tidak diketahui';
}

function statusClass(status) {
  return STATUS_LABELS[status] ? status : 'idle';
}

function toast(message, kind = '') {
  el.toast.textContent = message;
  el.toast.className = `toast show ${kind}`.trim();
  window.clearTimeout(state.toastTimer);
  state.toastTimer = window.setTimeout(() => {
    el.toast.className = 'toast';
  }, 3600);
}

class ApiError extends Error {
  constructor(message, status, code = null) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

async function api(path, options = {}) {
  const headers = { Accept: 'application/json' };
  let body = options.body;
  if (body !== undefined) {
    if (typeof body !== 'string' && !(body instanceof FormData)) {
      body = JSON.stringify(body);
    }
    headers['Content-Type'] = 'application/json';
  }

  // Kalau user admin, sertakan header admin
  if (state.isAdmin) {
    headers['X-Admin-Mode'] = 'admin';
  }

  const response = await fetch(path, {
    credentials: 'include',
    ...options,
    body,
    headers: { ...headers, ...(options.headers || {}) },
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    if (response.status === 401 && !path.startsWith('/api/session')) {
      if (data.code === 'profile_required') {
        showProfiles('Pilih profil dulu untuk melanjutkan.');
      } else if (state.mode !== 'ip') {
        showGate('Sesi berakhir. Masuk lagi untuk melanjutkan.');
      }
    }
    throw new ApiError(
      data.error || `Permintaan gagal (HTTP ${response.status})`,
      response.status,
      data.code
    );
  }

  return data;
}

/* ── Session ───────────────────────────────────────────────── */

function finishBoot() {
  document.body.classList.remove('is-booting');
  if (el.boot) el.boot.hidden = true;
}

let accessPollTimer = null;

async function checkAccessStatus() {
  try {
    const res = await api('/api/access-request');
    const visitorIpDisplay = document.getElementById('visitorIpDisplay');
    const waShareBtn = document.getElementById('waShareBtn');
    if (visitorIpDisplay && res.client_ip) {
      visitorIpDisplay.textContent = res.client_ip;
    }
    if (waShareBtn && res.client_ip) {
      waShareBtn.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `Halo admin, tolong setujui IP saya untuk akses GoPay Bill: ${res.client_ip}`
      )}`;
    }

    if (res.is_approved) {
      const wasPolling = Boolean(accessPollTimer);
      if (accessPollTimer) {
        clearInterval(accessPollTimer);
        accessPollTimer = null;
      }
      if (wasPolling) {
        toast('Akses IP kamu telah disetujui!', 'ok');
        setTimeout(() => {
          window.location.href = '/';
        }, 800);
        return;
      }
      // Bukan dari polling (misal user memang admin atau sudah approved)
      if (el.gate) el.gate.hidden = true;
      if (!state.session || !state.session.profile) {
        await showProfiles();
      } else {
        await startApp();
      }
      return;
    }

    const requestPendingBox = document.getElementById('requestPendingBox');
    const requestAccessForm = document.getElementById('requestAccessForm');
    const pendingNameText = document.getElementById('pendingNameText');

    if (res.request && res.request.status === 'pending') {
      if (requestPendingBox) requestPendingBox.classList.remove('hidden');
      if (requestAccessForm) requestAccessForm.classList.add('hidden');
      if (pendingNameText) pendingNameText.textContent = res.request.name || 'kamu';

      if (!accessPollTimer) {
        accessPollTimer = setInterval(checkAccessStatus, 3000);
      }
    } else {
      if (requestPendingBox) requestPendingBox.classList.add('hidden');
      if (requestAccessForm) requestAccessForm.classList.remove('hidden');
      if (accessPollTimer) {
        clearInterval(accessPollTimer);
        accessPollTimer = null;
      }
    }
  } catch {}
}

function showGate(message) {
  stopTimers();
  if (accessPollTimer) {
    clearInterval(accessPollTimer);
    accessPollTimer = null;
  }
  if (el.app) el.app.hidden = true;
  if (el.profiles) el.profiles.hidden = true;
  if (el.gate) el.gate.hidden = false;
  document.title = 'Akses Terbatas — GoPay Bill';
  if (message && el.gateError) {
    el.gateError.textContent = message;
    el.gateError.hidden = false;
  }
  window.scrollTo(0, 0);
  checkAccessStatus();
}

async function boot() {
  bindEvents();

  try {
    const session = await api('/api/session');
    state.mode = session.auth_mode || 'password';
    state.isAdmin = Boolean(session.is_admin);
    state.session = session;

    const navAdminIpBtn = document.getElementById('navAdminIpBtn');
    const navAdminLoginBtn = document.getElementById('navAdminLoginBtn');
    if (navAdminIpBtn) navAdminIpBtn.classList.toggle('hidden', !state.isAdmin);
    if (navAdminLoginBtn) navAdminLoginBtn.classList.toggle('hidden', state.isAdmin);

    if (el.totpField) el.totpField.classList.toggle('hidden', !session.totp_required);
    if (el.gateIp) el.gateIp.textContent = session.client_ip ? `IP kamu: ${session.client_ip}` : '';

    if (session.auth_mode === 'password' && !session.authenticated) {
      if (!session.password_configured) {
        if (el.loginBtn) el.loginBtn.disabled = true;
        if (el.password) el.password.disabled = true;
        showGate('APP_PASSWORD belum diisi di .env. Isi dulu, lalu restart server.');
      } else {
        showGate('');
      }
      return;
    }

    if (!session.profile) {
      if (window.location.pathname === '/register') {
        showRegisterWizard();
      } else {
        await showProfiles();
      }
      return;
    }

    state.profile = session.profile;
    if (window.location.pathname === '/register') {
      showRegisterWizard();
      return;
    }
    await startApp();
  } catch (err) {
    console.error('Boot error:', err);
    showGate(err.message);
  } finally {
    finishBoot();
  }
}

async function showProfiles(message) {
  stopTimers();
  el.gate.hidden = true;
  el.app.hidden = true;
  if (el.registerScreen) el.registerScreen.hidden = true;
  el.profiles.hidden = false;
  document.title = 'Pilih profil — GoPay Bill';
  window.scrollTo(0, 0);
  finishBoot();

  if (message) toast(message, 'error');
  await loadProfiles();
}

async function loadProfiles() {
  try {
    const data = await api('/api/profiles');
    renderProfiles(data.profiles || []);
    if (el.profileCreate) el.profileCreate.open = (data.profiles || []).length === 0;
  } catch (err) {
    el.profileList.replaceChildren(createHint(err.message));
  }
}

function renderProfiles(profiles) {
  el.profileList.replaceChildren();

  if (!profiles.length) {
    el.profileList.append(createHint('Belum ada profil merchant milikmu. Silakan buat profil baru di bawah untuk mulai.'));
    return;
  }

  for (const profile of profiles) {
    const item = document.createElement('div');
    item.className = 'profile-item';
    item.setAttribute('role', 'button');
    item.tabIndex = 0;

    const main = document.createElement('span');
    main.className = 'profile-main';

    const name = document.createElement('strong');
    name.textContent = profile.name;
    if (profile.is_owner) {
      const ownerBadge = document.createElement('span');
      ownerBadge.className = 'pill paid';
      ownerBadge.style.fontSize = '10px';
      ownerBadge.style.marginLeft = '6px';
      ownerBadge.textContent = 'PEMILIK';
      name.append(ownerBadge);
    }
    if (profile.has_pin) {
      const pinBadge = document.createElement('span');
      pinBadge.className = 'pill idle';
      pinBadge.style.fontSize = '10px';
      pinBadge.style.marginLeft = '4px';
      pinBadge.textContent = '🔒 PIN';
      name.append(pinBadge);
    }

    const sub = document.createElement('span');
    sub.className = 'li-sub';
    sub.textContent = [
      profile.phone || 'tanpa nomor HP',
      profile.qris_configured ? 'QRIS siap' : 'QRIS belum diisi',
      `${profile.bills} tagihan`,
    ].join(' · ');

    main.append(name, sub);

    const meta = document.createElement('span');
    meta.className = 'profile-meta';

    const pill = document.createElement('span');
    pill.className = `pill ${profile.connected ? 'paid' : profile.has_token ? 'pending' : 'idle'}`;
    pill.textContent = profile.connected ? 'Terhubung' : profile.has_token ? 'Ada token' : 'Belum terhubung';

    const go = document.createElement('span');
    go.className = 'profile-go';
    go.textContent = 'Buka →';

    meta.append(pill, go);
    item.append(main, meta);
    item.addEventListener('click', () => {
      if (profile.has_pin) {
        openPinModal(profile.id, profile.name);
      } else {
        selectProfile(profile.id, '', profile.name);
      }
    });
    item.addEventListener('keydown', (event) => {
      if (event.target !== item) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (profile.has_pin) {
          openPinModal(profile.id, profile.name);
        } else {
          selectProfile(profile.id, '', profile.name);
        }
      }
    });

    el.profileList.append(item);
  }
}

// ── Custom Modals: PIN Profil & Admin Password ──────────────────────────────
let pendingPinProfileId = null;

function openPinModal(profileId, profileName = '') {
  pendingPinProfileId = profileId;
  if (el.pinModalProfileName) el.pinModalProfileName.textContent = profileName || 'Toko';
  if (el.modalPinInput) el.modalPinInput.value = '';
  if (el.pinModalError) el.pinModalError.hidden = true;
  if (el.pinModalOverlay) el.pinModalOverlay.classList.remove('hidden');
  setTimeout(() => el.modalPinInput?.focus(), 50);
}

function closePinModal() {
  pendingPinProfileId = null;
  if (el.pinModalOverlay) el.pinModalOverlay.classList.add('hidden');
}

function openAdminModal() {
  if (el.modalAdminPasswordInput) el.modalAdminPasswordInput.value = '';
  if (el.adminModalError) el.adminModalError.hidden = true;
  if (el.adminModalOverlay) el.adminModalOverlay.classList.remove('hidden');
  setTimeout(() => el.modalAdminPasswordInput?.focus(), 50);
}

function closeAdminModal() {
  if (el.adminModalOverlay) el.adminModalOverlay.classList.add('hidden');
}

async function selectProfile(id, pin = '', profileName = '') {
  try {
    await api(`/api/profiles/${encodeURIComponent(id)}/select`, {
      method: 'POST',
      body: { pin },
    });
    closePinModal();
    window.location.href = '/';
  } catch (err) {
    if (err.code === 'pin_required' || err.message?.toLowerCase().includes('pin')) {
      openPinModal(id, profileName);
      if (pin && el.pinModalError) {
        el.pinModalError.textContent = err.message || 'PIN salah, coba lagi';
        el.pinModalError.hidden = false;
      }
      return;
    }
    toast(err.message, 'error');
  }
}

// ── Multi-Step Registration Wizard (/register) ──────────────────────────────
let currentWizardStep = 1;

function parseTlvClient(input) {
  const str = String(input || '').trim();
  if (!str.startsWith('000201')) return null;
  const tags = {};
  let i = 0;
  while (i < str.length) {
    if (i + 4 > str.length) break;
    const tag = str.slice(i, i + 2);
    const len = parseInt(str.slice(i + 2, i + 4), 10);
    if (isNaN(len)) break;
    const val = str.slice(i + 4, i + 4 + len);
    tags[tag] = val;
    i += 4 + len;
  }
  return tags;
}

function showRegisterWizard() {
  stopTimers();
  el.gate.hidden = true;
  el.app.hidden = true;
  el.profiles.hidden = true;
  if (el.registerScreen) el.registerScreen.hidden = false;
  document.title = 'Daftar Merchant Baru — GoPay Bill';
  window.scrollTo(0, 0);
  finishBoot();
  setWizardStep(1);
}

function setWizardStep(step) {
  currentWizardStep = step;
  document.querySelectorAll('.wizard-step').forEach((s) => {
    const sNum = parseInt(s.dataset.step, 10);
    s.classList.toggle('active', sNum === step);
    s.classList.toggle('completed', sNum < step);
  });
  document.querySelectorAll('.wizard-pane').forEach((p) => {
    const pNum = parseInt(p.dataset.step, 10);
    p.classList.toggle('active', pNum === step);
  });
  if (el.wizError) el.wizError.hidden = true;
}

function updateQrisInspector() {
  if (!el.wizQris || !el.wizQrisPreview) return;
  const raw = el.wizQris.value.trim();
  const tags = parseTlvClient(raw);
  if (tags && (tags['59'] || raw.startsWith('000201'))) {
    if (el.wizQrisMerchantName) el.wizQrisMerchantName.textContent = tags['59'] || 'Merchant Terdeteksi';
    if (el.wizQrisCity) el.wizQrisCity.textContent = tags['60'] || 'Indonesia';
    el.wizQrisPreview.classList.remove('hidden');
  } else {
    el.wizQrisPreview.classList.add('hidden');
  }
}

function navigateTo(path) {
  window.history.pushState(null, '', path);
  if (path === '/register') {
    showRegisterWizard();
  } else if (path === '/login' || path === '/profiles') {
    showProfiles();
  } else if (state.profile) {
    showApp();
  } else {
    showProfiles();
  }
}

window.addEventListener('popstate', () => {
  const path = window.location.pathname;
  if (path === '/register') {
    showRegisterWizard();
  } else if (path === '/login' || path === '/profiles') {
    showProfiles();
  } else if (state.profile) {
    showApp();
  } else {
    showProfiles();
  }
});

async function leaveProfile() {
  try {
    await api('/api/profile/leave', { method: 'POST' });
  } catch {}
  state.profile = null;
  window.location.reload();
}

async function createProfile(event) {
  event.preventDefault();
  el.profileError.hidden = true;
  el.profileBtn.disabled = true;
  el.profileBtn.textContent = 'Menyimpan…';

  try {
    const body = {
      name: el.profileName.value.trim(),
      phone: el.profilePhone.value.trim(),
      qris: el.profileQris.value.trim(),
    };
    if (el.profilePin && el.profilePin.value) {
      body.pin = el.profilePin.value.trim();
    }
    await api('/api/profiles', {
      method: 'POST',
      body,
    });
    toast('Profil merchant berhasil dibuat!', 'ok');
    window.location.reload();
  } catch (err) {
    el.profileError.textContent = err.message;
    el.profileError.hidden = false;
  } finally {
    el.profileBtn.disabled = false;
    el.profileBtn.textContent = 'Daftar & Masuk ke Profil';
  }
}

async function deleteProfile() {
  if (!state.profile) return;
  if (
    !window.confirm(
      `Hapus profil "${state.profile.name}"? Token GoPay, tagihan, dan QRIS profil ini ikut dihapus.`
    )
  ) {
    return;
  }

  try {
    await api(`/api/profiles/${encodeURIComponent(state.profile.id)}`, { method: 'DELETE' });
    window.location.reload();
  } catch (err) {
    toast(err.message, 'error');
  }
}

async function saveProfile(evt) {
  if (evt) evt.preventDefault();
  if (!state.profile) return;

  if (el.editProfileError) el.editProfileError.hidden = true;
  if (el.saveProfileBtn) {
    el.saveProfileBtn.disabled = true;
    el.saveProfileBtn.textContent = 'Menyimpan…';
  }

  try {
    const body = {
      name: el.editProfileName.value.trim(),
      phone: el.editProfilePhone.value.trim(),
      qris: el.editProfileQris.value.trim(),
    };
    if (el.editProfilePin && el.editProfilePin.value.trim()) {
      body.pin = el.editProfilePin.value.trim();
    }

    const res = await api(`/api/profiles/${encodeURIComponent(state.profile.id)}`, {
      method: 'PATCH',
      body,
    });

    state.profile = res.profile;
    if (el.profileChipText) el.profileChipText.textContent = res.profile.name;
    toast('Pengaturan profil & QRIS berhasil disimpan', 'ok');
    if (el.editProfileSection) el.editProfileSection.open = false;
    loadState(false);
  } catch (err) {
    if (el.editProfileError) {
      el.editProfileError.textContent = err.message;
      el.editProfileError.hidden = false;
    } else {
      toast(err.message, 'error');
    }
  } finally {
    if (el.saveProfileBtn) {
      el.saveProfileBtn.disabled = false;
      el.saveProfileBtn.textContent = 'Simpan Perubahan';
    }
  }
}

async function startApp() {
  el.gate.hidden = true;
  el.profiles.hidden = true;
  el.app.hidden = false;
  el.logoutBtn.hidden = state.mode === 'ip';
  if (state.profile) el.profileChipText.textContent = state.profile.name;

  const adminBadge = document.getElementById('adminBadgeBtn');
  if (adminBadge) adminBadge.classList.toggle('hidden', !state.isAdmin);
  const navAdminBtn = document.getElementById('navAdminIpBtn');
  if (navAdminBtn) navAdminBtn.classList.toggle('hidden', !state.isAdmin);
  const navHelpAdminBtn = document.getElementById('navHelpAdminIpBtn');
  if (navHelpAdminBtn) navHelpAdminBtn.classList.toggle('hidden', !state.isAdmin);

  el.gateError.hidden = true;
  el.password.value = '';
  document.title = 'Dashboard — GoPay Bill';
  window.scrollTo(0, 0);
  el.totpCode.value = '';

  await loadOverview(true);
  await loadBills(true);
  await loadSecurity(true);
  startOverviewTimer();
}

async function login(event) {
  event.preventDefault();
  el.gateError.hidden = true;
  el.loginBtn.disabled = true;
  el.loginBtn.textContent = 'Memeriksa…';

  try {
    await api('/api/session', {
      method: 'POST',
      body: JSON.stringify({
        password: el.password.value,
        totp: el.totpCode.value.trim(),
      }),
    });
    window.location.reload();
  } catch (err) {
    el.gateError.textContent = err.message;
    el.gateError.hidden = false;
    if (el.totpCode.value.trim()) {
      el.totpCode.value = '';
      el.totpCode.focus();
    } else {
      el.password.select();
    }
  } finally {
    el.loginBtn.disabled = false;
    el.loginBtn.textContent = 'Masuk';
  }
}

async function logout() {
  try {
    await api('/api/session', { method: 'DELETE' });
  } catch {
    // Sesi lokal tetap dibersihkan walau request gagal.
  }
  window.location.reload();
}

/* ── Overview & account ────────────────────────────────────── */

function startOverviewTimer() {
  window.clearInterval(state.overviewTimer);
  state.overviewTimer = window.setInterval(() => {
    if (document.hidden) return;
    state.tick += 1;
    loadOverview(true);
    if (state.tick % 2 === 0) loadBills(true);
  }, 6000);
}

async function loadOverview(silent = false) {
  try {
    const data = await api('/api/overview');
    state.account = data.account;
    state.settings = data.settings;
    state.qris = data.qris;

    if (data.profile) {
      state.profile = data.profile;
      el.profileChipText.textContent = data.profile.name;
    }

    renderAccount();
    renderStats(data.stats);
    renderQrisState();

    if (data.account.connected && !state.transactionsLoaded) {
      state.transactionsLoaded = true;
      loadTransactions(true);
    }
  } catch (err) {
    if (!silent) toast(err.message, 'error');
  }
}

function renderAccount() {
  const account = state.account;
  if (!account) return;

  const label = ACCOUNT_LABELS[account.state] || account.state;
  if (el.accountChipText) el.accountChipText.textContent = `Akun: ${label}`;
  const dot = el.accountChip?.querySelector('.dot');
  if (dot) {
    dot.className = `dot ${
      account.state === 'connected'
        ? 'ok'
        : account.state === 'error'
          ? 'err'
          : account.state === 'connecting' || account.state === 'otp_required'
            ? 'warn'
            : ''
    }`.trim();
  }

  el.acctState.textContent = label;
  el.acctState.className = `pill ${
    account.state === 'connected'
      ? 'paid'
      : account.state === 'error'
        ? 'cancelled'
        : account.state === 'connecting' || account.state === 'otp_required'
          ? 'pending'
          : 'idle'
  }`;

  el.acctMerchant.textContent = account.merchantId || '—';
  el.acctMethod.textContent = account.loginMethod === 'otp' ? 'Nomor HP + OTP' : 'Email + password';
  el.acctPhone.textContent = account.phone || 'Belum diisi';
  el.acctCache.textContent = account.hasCachedToken ? 'Tersimpan (per profil)' : 'Belum ada';
  el.acctQris.textContent = state.qris?.configured ? 'Siap dipakai' : 'Belum siap';

  const error = account.lastError;
  el.acctError.textContent = error || '';
  el.acctError.hidden = !error;

  el.otpForm.classList.toggle('hidden', account.state !== 'otp_required');
  if (account.state === 'otp_required' && account.otpPhone) {
    el.otpPhone.textContent = account.otpPhone;
    el.otpCode.focus();
  }

  const connecting = account.state === 'connecting';
  el.connectBtn.disabled = connecting || account.state === 'connected';
  el.connectBtn.textContent = account.state === 'error' ? 'Hubungkan ulang' : 'Hubungkan akun';

  el.disconnectBtn.disabled = !account.hasCachedToken && !connecting && account.state !== 'error';
}

function renderStats(stats) {
  if (!stats) return;
  el.statPending.textContent = String(stats.pendingCount ?? 0);
  el.statTotal.textContent = String(stats.total ?? 0);
  el.statPaid.textContent = String(stats.paidCount ?? 0);
  el.statAmount.textContent = formatRupiah(stats.paidAmount ?? 0);
}

function renderQrisState() {
  const qris = state.qris;
  if (!qris) return;

  el.qrisWarning.classList.toggle('hidden', qris.configured);
  if (!qris.configured) {
    el.qrisWarning.textContent = `QRIS belum siap: ${qris.error}. Isi QRIS_STRING di .env lalu restart.`;
  }
}

async function connectAccount() {
  el.connectBtn.disabled = true;
  el.connectBtn.textContent = 'Menghubungkan…';
  el.acctError.hidden = true;

  try {
    const data = await api('/api/account/connect', { method: 'POST' });
    if (state.account) state.account = { ...state.account, ...data.account };
    renderAccount();
    startAccountWatch();
    toast('Menyiapkan sesi akun GoPay…');
  } catch (err) {
    toast(err.message, 'error');
    el.connectBtn.disabled = false;
    el.connectBtn.textContent = 'Hubungkan akun';
  }
}

function startAccountWatch() {
  window.clearInterval(state.accountTimer);
  state.accountTimer = window.setInterval(async () => {
    try {
      const data = await api('/api/account');
      state.account = data.account;
      renderAccount();

      if (data.account.state === 'connected') {
        window.clearInterval(state.accountTimer);
        state.accountTimer = null;
        toast('Akun GoPay terhubung.', 'ok');
        state.transactionsLoaded = false;
        loadOverview(true);
        loadTransactions(true);
      } else if (data.account.state === 'error' || data.account.state === 'idle') {
        window.clearInterval(state.accountTimer);
        state.accountTimer = null;
      }
    } catch {
      window.clearInterval(state.accountTimer);
      state.accountTimer = null;
    }
  }, 2000);
}

async function submitOtp(event) {
  event.preventDefault();

  try {
    const data = await api('/api/account/otp', {
      method: 'POST',
      body: JSON.stringify({ code: el.otpCode.value.trim() }),
    });
    el.otpCode.value = '';
    state.account = data.account;
    renderAccount();
    startAccountWatch();
    toast('Kode OTP dikirim. Menunggu verifikasi…');
  } catch (err) {
    toast(err.message, 'error');
  }
}

async function disconnectAccount() {
  if (!window.confirm('Putuskan akun? Token yang tersimpan akan dihapus dari server.')) return;

  try {
    const data = await api('/api/account/disconnect', { method: 'POST' });
    state.account = data.account;
    state.transactionsLoaded = false;
    renderAccount();
    el.txList.replaceChildren(createHint('Hubungkan akun lalu tarik mutasi.'));
    el.txMeta.textContent = '';
    toast('Akun diputuskan.', 'ok');
  } catch (err) {
    toast(err.message, 'error');
  }
}

/* ── Bills ─────────────────────────────────────────────────── */

async function createBill(event) {
  event.preventDefault();

  const amount = Math.trunc(Number(el.amount.value));
  const min = state.settings?.min_amount ?? 1;
  const max = state.settings?.max_amount ?? 100_000_000;

  if (!Number.isFinite(amount) || amount < min) {
    toast(`Nominal minimal ${formatRupiah(min)}.`, 'error');
    return;
  }
  if (amount > max) {
    toast(`Nominal maksimal ${formatRupiah(max)}.`, 'error');
    return;
  }

  el.createBtn.disabled = true;
  el.createBtn.textContent = 'Membuat…';

  try {
    const data = await api('/api/bills', {
      method: 'POST',
      body: JSON.stringify({ amount, note: el.note.value.trim() }),
    });

    renderBill(data);
    el.note.value = '';
    startDetailWatch();
    loadBills(true);
    loadOverview(true);

    if (window.matchMedia('(max-width: 900px)').matches) {
      document.getElementById('detailPanel').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    toast(`Tagihan ${data.bill.ref} dibuat.`, 'ok');
  } catch (err) {
    toast(err.message, 'error');
  } finally {
    el.createBtn.disabled = false;
    el.createBtn.textContent = 'Buat QRIS';
  }
}

function renderBill(payload) {
  const bill = payload.bill;
  if (!bill) return;

  state.bill = bill;
  state.qrString = payload.qr_string || null;

  el.billStatus.textContent = statusLabel(bill.status);
  el.billStatus.className = `pill ${statusClass(bill.status)}`;
  el.billAmount.textContent = formatRupiah(bill.amount);
  el.billRef.textContent = bill.ref;
  el.billCreated.textContent = formatDate(bill.created_at);
  el.billPaidAt.textContent = bill.paid_at ? formatDate(bill.paid_at) : '—';
  el.billTx.textContent = bill.tx_id || '—';
  el.billChecked.textContent = bill.last_checked_at ? formatTime(bill.last_checked_at) : '—';

  el.billNote.textContent = bill.note || '';
  el.billNote.classList.toggle('hidden', !bill.note);

  if (bill.status === 'pending' && payload.qr_svg) {
    el.qrBox.innerHTML = payload.qr_svg;
  } else {
    const placeholder = document.createElement('span');
    placeholder.className = 'qr-placeholder';
    placeholder.textContent =
      bill.status === 'pending'
        ? 'QR belum tersedia.'
        : bill.status === 'paid'
          ? 'Pembayaran diterima.'
          : `Tagihan ${statusLabel(bill.status).toLowerCase()}.`;
    el.qrBox.replaceChildren(placeholder);
  }

  el.checkBtn.disabled = bill.status !== 'pending';
  el.copyQrBtn.disabled = !state.qrString;
  el.cancelBtn.disabled = bill.status !== 'pending';

  if (bill.status === 'pending') {
    el.billHint.textContent =
      'Status dicek dari mutasi akun tiap beberapa detik. QR tetap bisa dibayar walau tagihan kedaluwarsa di sini.';
  } else if (bill.status === 'paid') {
    el.billHint.textContent = 'Nominal sudah cocok dengan mutasi merchant.';
  } else {
    el.billHint.textContent = 'Tagihan tidak dipantau lagi. Kalau tetap dibayar, dana masuk ke akun merchant.';
  }

  updateCountdown();
  startCountdown();
}

function startCountdown() {
  window.clearInterval(state.countdownTimer);
  state.countdownTimer = window.setInterval(updateCountdown, 1000);
}

function updateCountdown() {
  const bill = state.bill;
  if (!bill) return;

  if (bill.status !== 'pending') {
    el.billExpires.textContent = formatDate(bill.expires_at);
    return;
  }

  const remaining = new Date(bill.expires_at).getTime() - Date.now();
  if (!Number.isFinite(remaining) || remaining <= 0) {
    el.billExpires.textContent = 'menunggu status';
    return;
  }

  const total = Math.floor(remaining / 1000);
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;

  el.billExpires.textContent =
    total >= 3600
      ? `${Math.floor(total / 3600)} jam ${Math.floor((total % 3600) / 60)} menit`
      : `${minutes}:${String(seconds).padStart(2, '0')} lagi`;
}

function startDetailWatch() {
  window.clearInterval(state.detailTimer);
  state.detailTimer = window.setInterval(() => {
    if (state.bill?.status === 'pending' && !document.hidden) {
      refreshBill(state.bill.ref, true);
    }
  }, 5000);
}

function stopDetailWatch() {
  window.clearInterval(state.detailTimer);
  state.detailTimer = null;
}

async function refreshBill(ref, silent = false) {
  const previous = state.bill?.status;

  try {
    const data = await api(`/api/bills/${encodeURIComponent(ref)}`);
    renderBill(data);

    if (data.bill.status !== 'pending') {
      stopDetailWatch();
      if (previous !== data.bill.status) {
        loadBills(true);
        loadOverview(true);
        toast(
          data.bill.status === 'paid' ? 'Pembayaran diterima.' : 'Tagihan tidak lagi aktif.',
          data.bill.status === 'paid' ? 'ok' : ''
        );
      }
    }
  } catch (err) {
    if (!silent) toast(err.message, 'error');
  }
}

async function checkBill() {
  if (!state.bill) return;

  el.checkBtn.disabled = true;
  el.checkBtn.textContent = 'Mengecek…';

  try {
    const data = await api(`/api/bills/${encodeURIComponent(state.bill.ref)}/check`, { method: 'POST' });
    renderBill(data);
    toast(data.bill.status === 'paid' ? 'Pembayaran ditemukan.' : 'Belum ada pembayaran yang cocok.', data.bill.status === 'paid' ? 'ok' : '');
    if (data.bill.status !== 'pending') {
      stopDetailWatch();
      loadBills(true);
      loadOverview(true);
    }
  } catch (err) {
    toast(err.message, 'error');
  } finally {
    el.checkBtn.disabled = state.bill?.status !== 'pending';
    el.checkBtn.textContent = 'Cek sekarang';
  }
}

async function cancelBill() {
  if (!state.bill) return;
  if (!window.confirm('Batalkan tagihan ini? QR tetap bisa dibayar sampai masa berlakunya habis.')) return;

  try {
    const data = await api(`/api/bills/${encodeURIComponent(state.bill.ref)}/cancel`, { method: 'POST' });
    state.bill = data.bill;
    el.billStatus.textContent = statusLabel(data.bill.status);
    el.billStatus.className = `pill ${statusClass(data.bill.status)}`;
    el.checkBtn.disabled = true;
    el.cancelBtn.disabled = true;
    el.copyQrBtn.disabled = true;
    el.qrBox.replaceChildren(createHint('Tagihan dibatalkan. QR tetap bisa dibayar.'));
    el.billHint.textContent = 'Tagihan tidak dipantau lagi.';
    stopDetailWatch();
    loadBills(true);
    loadOverview(true);
    toast('Tagihan dibatalkan. Dana yang tetap masuk tidak dilacak otomatis.');
  } catch (err) {
    toast(err.message, 'error');
  }
}

async function loadBills(silent = false) {
  try {
    const data = await api('/api/bills?limit=50');
    state.bills = data.bills || [];
    renderBills();
  } catch (err) {
    if (!silent) toast(err.message, 'error');
  }
}

function renderBills() {
  const filter = el.billFilter.value;
  const bills = filter ? state.bills.filter((bill) => bill.status === filter) : state.bills;

  el.billList.replaceChildren();

  if (!bills.length) {
    el.billList.append(createHint(state.bills.length ? 'Tidak ada tagihan dengan status ini.' : 'Belum ada tagihan.'));
    return;
  }

  for (const bill of bills) {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'list-item';

    const main = document.createElement('span');
    main.className = 'li-main';

    const amount = document.createElement('span');
    amount.className = 'li-amount';
    amount.textContent = formatRupiah(bill.amount);

    const sub = document.createElement('span');
    sub.className = 'li-sub';
    sub.textContent = [bill.ref, bill.note].filter(Boolean).join(' · ');

    main.append(amount, sub);

    const meta = document.createElement('span');
    meta.className = 'li-meta';

    const pill = document.createElement('span');
    pill.className = `pill ${statusClass(bill.status)}`;
    pill.textContent = statusLabel(bill.status);

    const date = document.createElement('span');
    date.className = 'li-date';
    date.textContent = formatDate(bill.created_at);

    meta.append(pill, date);
    item.append(main, meta);
    item.addEventListener('click', () => openBill(bill.ref));
    el.billList.append(item);
  }
}

async function openBill(ref) {
  try {
    const data = await api(`/api/bills/${encodeURIComponent(ref)}`);
    renderBill(data);
    startDetailWatch();
    if (window.matchMedia('(max-width: 900px)').matches) {
      document.getElementById('detailPanel').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } catch (err) {
    toast(err.message, 'error');
  }
}

/* ── Transactions ──────────────────────────────────────────── */

async function loadTransactions(silent = false) {
  el.txRefresh.disabled = true;

  try {
    const data = await api('/api/transactions?days=1');
    renderTransactions(data.transactions || []);
    el.txMeta.textContent = `Terakhir ditarik ${formatTime(new Date().toISOString())} · ${data.total} transaksi hari ini.`;
  } catch (err) {
    if (!silent) {
      el.txList.replaceChildren(createHint(err.message));
      el.txMeta.textContent = '';
    }
  } finally {
    el.txRefresh.disabled = false;
  }
}

function renderTransactions(transactions) {
  el.txList.replaceChildren();

  if (!transactions.length) {
    el.txList.append(createHint('Belum ada transaksi masuk hari ini.'));
    return;
  }

  for (const tx of transactions) {
    const item = document.createElement('div');
    item.className = 'list-item';

    const main = document.createElement('span');
    main.className = 'li-main';

    const amount = document.createElement('span');
    amount.className = 'li-amount';
    amount.textContent = tx.amount === null ? 'Nominal tidak terbaca' : formatRupiah(tx.amount);

    const sub = document.createElement('span');
    sub.className = 'li-sub';
    sub.textContent = [
      tx.status || 'tanpa status',
      tx.payment_type || null,
      tx.id ? `ID ${tx.id}` : null,
    ]
      .filter(Boolean)
      .join(' · ');

    main.append(amount, sub);

    const time = document.createElement('span');
    time.className = 'li-date';
    time.textContent = tx.time ? formatTime(tx.time) : '—';

    item.append(main, time);
    el.txList.append(item);
  }
}

async function loadSecurity(silent = false) {
  try {
    const data = await api('/api/security?limit=20');
    renderSecurity(data.events || []);
  } catch (err) {
    if (!silent) toast(err.message, 'error');
  }
}

function renderSecurity(events) {
  el.secList.replaceChildren();

  if (!events.length) {
    el.secList.append(createHint('Belum ada aktivitas tercatat.'));
    return;
  }

  for (const event of events) {
    const item = document.createElement('div');
    item.className = 'list-item static';

    const main = document.createElement('span');
    main.className = 'li-main';

    const title = document.createElement('span');
    title.className = 'li-amount';
    title.textContent = SECURITY_LABELS[event.event] || event.event;

    const sub = document.createElement('span');
    sub.className = 'li-sub';
    sub.textContent = [event.ip, event.factor === 'totp' ? 'kode 2FA salah' : null]
      .filter(Boolean)
      .join(' · ');

    main.append(title, sub);

    const meta = document.createElement('span');
    meta.className = 'li-meta';

    if (state.isAdmin && event.ip && (event.event === 'ip_blocked' || event.event === 'login_fail')) {
      const trustBtn = document.createElement('button');
      trustBtn.type = 'button';
      trustBtn.className = 'btn-trust-ip';
      trustBtn.textContent = 'Setujui IP';
      trustBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openAdminIpModal(event.ip);
      });
      meta.append(trustBtn);
    }

    const pill = document.createElement('span');
    const ok = event.event === 'login_ok' || event.event === 'account_connect';
    pill.className = `pill ${ok ? 'paid' : 'cancelled'}`;
    pill.textContent = ok ? 'OK' : event.event === 'login_fail' ? 'Gagal' : 'Ditolak';

    const time = document.createElement('span');
    time.className = 'li-date';
    time.textContent = formatDate(event.time);

    meta.append(pill, time);
    item.append(main, meta);
    el.secList.append(item);
  }
}

/* ── Helpers ───────────────────────────────────────────────── */

function createHint(text) {
  const hint = document.createElement('p');
  hint.className = 'hint';
  hint.textContent = text;
  return hint;
}

async function copyQr() {
  if (!state.qrString) return;

  try {
    await navigator.clipboard.writeText(state.qrString);
    toast('Kode QRIS disalin.', 'ok');
  } catch {
    const helper = document.createElement('textarea');
    helper.value = state.qrString;
    helper.setAttribute('readonly', '');
    helper.className = 'hidden';
    document.body.append(helper);
    helper.select();
    const copied = document.execCommand('copy');
    helper.remove();
    toast(copied ? 'Kode QRIS disalin.' : 'Gagal menyalin kode.', copied ? 'ok' : 'error');
  }
}

function stopTimers() {
  window.clearInterval(state.overviewTimer);
  window.clearInterval(state.accountTimer);
  window.clearInterval(state.detailTimer);
  window.clearInterval(state.countdownTimer);
  state.overviewTimer = null;
  state.accountTimer = null;
  state.detailTimer = null;
  state.countdownTimer = null;
}

function renderDocSnippets(lang = 'curl') {
  const origin = window.location.origin;
  const apiKey = state.apiKey || 'YOUR_API_KEY';

  if (lang === 'curl') {
    if (el.codeSnippetCreate) {
      el.codeSnippetCreate.textContent = `curl -X POST "${origin}/api/bills" \\
  -H "X-API-Key: ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{"amount": 25000, "note": "Pesanan #101"}'`;
    }
    if (el.codeSnippetCheck) {
      el.codeSnippetCheck.textContent = `curl -X GET "${origin}/api/bills/INV-4D71529F3A" \\
  -H "X-API-Key: ${apiKey}"`;
    }
    if (el.codeSnippetList) {
      el.codeSnippetList.textContent = `curl -X GET "${origin}/api/bills?status=paid&limit=10" \\
  -H "X-API-Key: ${apiKey}"`;
    }
    if (el.codeSnippetCancel) {
      el.codeSnippetCancel.textContent = `curl -X POST "${origin}/api/bills/INV-4D71529F3A/cancel" \\
  -H "X-API-Key: ${apiKey}"`;
    }
  } else if (lang === 'js') {
    if (el.codeSnippetCreate) {
      el.codeSnippetCreate.textContent = `// Node.js (v18+) atau Browser Fetch
const res = await fetch('${origin}/api/bills', {
  method: 'POST',
  headers: {
    'X-API-Key': '${apiKey}',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    amount: 25000,
    note: 'Pesanan #101'
  })
});

const data = await res.json();
console.log('Nomor Ref:', data.bill.ref);
console.log('String QRIS:', data.qr_string);
console.log('SVG QR:', data.qr_svg);`;
    }
    if (el.codeSnippetCheck) {
      el.codeSnippetCheck.textContent = `const res = await fetch('${origin}/api/bills/INV-4D71529F3A', {
  headers: {
    'X-API-Key': '${apiKey}'
  }
});

const data = await res.json();
console.log('Status Tagihan:', data.bill.status); // 'pending' | 'paid' | 'expired'
if (data.bill.status === 'paid') {
  console.log('Lunas pada:', data.bill.paid_at);
  console.log('ID Transaksi GoPay:', data.bill.tx_id);
}`;
    }
    if (el.codeSnippetList) {
      el.codeSnippetList.textContent = `const res = await fetch('${origin}/api/bills?status=paid&limit=10', {
  headers: {
    'X-API-Key': '${apiKey}'
  }
});

const data = await res.json();
console.log('Total Tagihan Lunas:', data.total);
console.log('Daftar:', data.bills);`;
    }
    if (el.codeSnippetCancel) {
      el.codeSnippetCancel.textContent = `const res = await fetch('${origin}/api/bills/INV-4D71529F3A/cancel', {
  method: 'POST',
  headers: {
    'X-API-Key': '${apiKey}'
  }
});

const data = await res.json();
console.log('Status sekarang:', data.bill.status); // 'cancelled'`;
    }
  } else if (lang === 'python') {
    if (el.codeSnippetCreate) {
      el.codeSnippetCreate.textContent = `import requests

url = "${origin}/api/bills"
headers = {
    "X-API-Key": "${apiKey}",
    "Content-Type": "application/json"
}
payload = {
    "amount": 25000,
    "note": "Pesanan #101"
}

response = requests.post(url, json=payload, headers=headers)
data = response.json()

print("Nomor Ref:", data["bill"]["ref"])
print("String QRIS:", data["qr_string"])
print("Kedaluwarsa:", data["bill"]["expires_at"])`;
    }
    if (el.codeSnippetCheck) {
      el.codeSnippetCheck.textContent = `import requests

url = "${origin}/api/bills/INV-4D71529F3A"
headers = {
    "X-API-Key": "${apiKey}"
}

response = requests.get(url, headers=headers)
data = response.json()

print("Status:", data["bill"]["status"])
if data["bill"]["status"] == "paid":
    print("Lunas pada:", data["bill"]["paid_at"])
    print("ID Transaksi:", data["bill"]["tx_id"])`;
    }
    if (el.codeSnippetList) {
      el.codeSnippetList.textContent = `import requests

url = "${origin}/api/bills"
params = {"status": "paid", "limit": 10}
headers = {"X-API-Key": "${apiKey}"}

response = requests.get(url, params=params, headers=headers)
data = response.json()

print(f"Total: {data['total']} tagihan")
for bill in data["bills"]:
    print(f"- {bill['ref']}: Rp {bill['amount']:,} ({bill['status']})")`;
    }
    if (el.codeSnippetCancel) {
      el.codeSnippetCancel.textContent = `import requests

url = "${origin}/api/bills/INV-4D71529F3A/cancel"
headers = {"X-API-Key": "${apiKey}"}

response = requests.post(url, headers=headers)
data = response.json()
print("Status:", data["bill"]["status"])`;
    }
  }
}

function bindEvents() {
  el.loginForm.addEventListener('submit', login);
  el.logoutBtn.addEventListener('click', logout);

  el.password.addEventListener('input', () => {
    el.gateError.hidden = true;
  });

  // Left Navigation Drawer (Ref: s24jMCg9KC.png)
  const navDrawer = document.getElementById('navDrawer');
  const navBackdrop = document.getElementById('navBackdrop');
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const navCloseBtn = document.getElementById('navCloseBtn');

  const closeNavDrawer = () => {
    if (navDrawer) navDrawer.classList.add('hidden');
    if (navBackdrop) navBackdrop.classList.add('hidden');
  };

  const openNavDrawer = () => {
    closeAccountDrawer();
    if (navDrawer) navDrawer.classList.remove('hidden');
    if (navBackdrop) navBackdrop.classList.remove('hidden');
  };

  if (menuToggleBtn) {
    menuToggleBtn.addEventListener('click', () => {
      const isHidden = navDrawer ? navDrawer.classList.contains('hidden') : true;
      if (isHidden) openNavDrawer();
      else closeNavDrawer();
    });
  }

  if (navCloseBtn) navCloseBtn.addEventListener('click', closeNavDrawer);
  if (navBackdrop) navBackdrop.addEventListener('click', closeNavDrawer);

  const navItems = document.querySelectorAll('.nav-item[data-nav]');
  navItems.forEach((btn) => {
    btn.addEventListener('click', () => {
      navItems.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      closeNavDrawer();

      const target = btn.dataset.nav;
      if (target === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const targetEl = document.querySelector(target);
        if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const navOpenAccountBtn = document.getElementById('navOpenAccountBtn');
  if (navOpenAccountBtn) {
    navOpenAccountBtn.addEventListener('click', () => {
      closeNavDrawer();
      openAccountDrawer();
    });
  }

  const navSwitchProfileBtn = document.getElementById('navSwitchProfileBtn');
  if (navSwitchProfileBtn) {
    navSwitchProfileBtn.addEventListener('click', () => {
      closeNavDrawer();
      leaveProfile();
    });
  }

  const topProfileBtn = document.getElementById('topProfileBtn');
  if (topProfileBtn) {
    topProfileBtn.addEventListener('click', () => leaveProfile());
  }

  const navAdminLoginBtn = document.getElementById('navAdminLoginBtn');
  if (navAdminLoginBtn) {
    navAdminLoginBtn.addEventListener('click', () => {
      closeNavDrawer();
      openAdminModal();
    });
  }

  // Right Account Drawer
  const closeAccountDrawer = () => {
    el.accountPanel.classList.add('hidden');
    if (el.accountBackdrop) el.accountBackdrop.classList.add('hidden');
    el.accountBtn.setAttribute('aria-expanded', 'false');
  };

  const openAccountDrawer = () => {
    closeNavDrawer();
    el.accountPanel.classList.remove('hidden');
    if (el.accountBackdrop) el.accountBackdrop.classList.remove('hidden');
    el.accountBtn.setAttribute('aria-expanded', 'true');

    if (state.profile) {
      if (el.editProfileName) el.editProfileName.value = state.profile.name || '';
      if (el.editProfilePhone) el.editProfilePhone.value = state.profile.phone || '';
      if (el.editProfileQris) el.editProfileQris.value = state.profile.qris || '';
      if (el.editProfilePin) el.editProfilePin.value = '';
      if (el.editProfileError) el.editProfileError.hidden = true;
    }
  };

  el.accountBtn.addEventListener('click', () => {
    const isHidden = el.accountPanel.classList.contains('hidden');
    if (isHidden) {
      openAccountDrawer();
    } else {
      closeAccountDrawer();
    }
  });

  if (el.drawerCloseBtn) {
    el.drawerCloseBtn.addEventListener('click', closeAccountDrawer);
  }
  if (el.accountBackdrop) {
    el.accountBackdrop.addEventListener('click', closeAccountDrawer);
  }

  // Admin IP Management Modal
  const adminIpModal = document.getElementById('adminIpModal');
  const adminModalBackdrop = document.getElementById('adminModalBackdrop');
  const adminModalCloseBtn = document.getElementById('adminModalCloseBtn');
  const adminBadgeBtn = document.getElementById('adminBadgeBtn');
  const navAdminIpBtn = document.getElementById('navAdminIpBtn');
  const trustIpForm = document.getElementById('trustIpForm');
  const trustIpType = document.getElementById('trustIpType');
  const trustProfileSelectGroup = document.getElementById('trustProfileSelectGroup');

  const closeAdminIpModal = () => {
    if (adminIpModal) adminIpModal.classList.add('hidden');
    if (adminModalBackdrop) adminModalBackdrop.classList.add('hidden');
  };

  const openAdminIpModal = async (prefillIp = '') => {
    closeNavDrawer();
    closeAccountDrawer();

    if (adminIpModal) adminIpModal.classList.remove('hidden');
    if (adminModalBackdrop) adminModalBackdrop.classList.remove('hidden');

    const inputIp = document.getElementById('trustIpInput');
    if (prefillIp && inputIp) {
      inputIp.value = prefillIp;
      inputIp.focus();
    }

    try {
      const data = await api('/api/admin/ips');
      const clientIpEl = document.getElementById('adminClientIp');
      if (clientIpEl) clientIpEl.textContent = data.client_ip || '—';

      const profileSelect = document.getElementById('trustProfileSelect');
      const inviteProfileSelect = document.getElementById('inviteProfileSelect');
      if (data.profiles) {
        if (profileSelect) profileSelect.replaceChildren();
        if (inviteProfileSelect) inviteProfileSelect.replaceChildren();

        data.profiles.forEach((p) => {
          const opt = document.createElement('option');
          opt.value = p.id;
          opt.textContent = `${p.name}${p.ips?.length ? ` (${p.ips.join(', ')})` : ''}`;
          if (state.profile && state.profile.id === p.id) opt.selected = true;
          if (profileSelect) profileSelect.append(opt);

          const optInvite = opt.cloneNode(true);
          if (inviteProfileSelect) inviteProfileSelect.append(optInvite);
        });
      }

      // Muat Permintaan Akses Masuk (Pending Requests)
      try {
        const reqData = await api('/api/admin/access-requests');
        const badge = document.getElementById('accessRequestsBadge');
        if (badge) badge.textContent = `${reqData.pending_count || 0} Baru`;

        const reqList = document.getElementById('accessRequestsList');
        if (reqList) {
          reqList.replaceChildren();
          const pending = (reqData.requests || []).filter((r) => r.status === 'pending');

          if (!pending.length) {
            reqList.append(createHint('Tidak ada permintaan pending saat ini.'));
          } else {
            pending.forEach((r) => {
              const card = document.createElement('div');
              card.className = 'access-req-card';

              const head = document.createElement('div');
              head.className = 'req-head';

              const userDiv = document.createElement('div');
              userDiv.className = 'req-user';

              const nameSpan = document.createElement('span');
              nameSpan.className = 'req-name';
              nameSpan.textContent = r.name;

              const metaSpan = document.createElement('span');
              metaSpan.className = 'req-meta mono';
              metaSpan.textContent = `${r.ip} · ${formatDate(r.created_at)}`;

              userDiv.append(nameSpan, metaSpan);
              head.append(userDiv);

              const actions = document.createElement('div');
              actions.className = 'req-actions';

              const sel = document.createElement('select');
              if (data.profiles) {
                data.profiles.forEach((p) => {
                  const opt = document.createElement('option');
                  opt.value = p.id;
                  opt.textContent = `Profil: ${p.name}`;
                  if (state.profile && state.profile.id === p.id) opt.selected = true;
                  sel.append(opt);
                });
              }
              const adminOpt = document.createElement('option');
              adminOpt.value = '__admin__';
              adminOpt.textContent = 'Jadikan Akses Admin';
              sel.append(adminOpt);

              const approveBtn = document.createElement('button');
              approveBtn.type = 'button';
              approveBtn.className = 'btn-approve-req';
              approveBtn.textContent = 'Setujui Akses';
              approveBtn.addEventListener('click', async () => {
                approveBtn.disabled = true;
                approveBtn.textContent = 'Memproses…';
                try {
                  const targetType = sel.value === '__admin__' ? 'admin' : 'profile';
                  const profile_id = sel.value === '__admin__' ? null : sel.value;
                  const res = await api(`/api/admin/access-requests/${r.id}/approve`, {
                    method: 'POST',
                    body: { profile_id, type: targetType },
                  });
                  toast(res.message, 'ok');
                  openAdminIpModal();
                  loadSecurity(true);
                } catch (err) {
                  toast(err.message, 'error');
                  approveBtn.disabled = false;
                  approveBtn.textContent = 'Setujui Akses';
                }
              });

              const rejectBtn = document.createElement('button');
              rejectBtn.type = 'button';
              rejectBtn.className = 'btn-reject-req';
              rejectBtn.textContent = 'Tolak';
              rejectBtn.addEventListener('click', async () => {
                if (!confirm(`Tolak permintaan akses dari ${r.name}?`)) return;
                try {
                  const res = await api(`/api/admin/access-requests/${r.id}/reject`, {
                    method: 'POST',
                  });
                  toast(res.message, 'ok');
                  openAdminIpModal();
                } catch (err) {
                  toast(err.message, 'error');
                }
              });

              actions.append(sel, approveBtn, rejectBtn);
              card.append(head, actions);
              reqList.append(card);
            });
          }
        }
      } catch {}

      const adminIpsList = document.getElementById('adminIpsList');
      if (adminIpsList) {
        adminIpsList.replaceChildren();
        if (!data.allowed_admin_ips?.length) {
          adminIpsList.append(createHint('Belum ada IP admin terdaftar.'));
        } else {
          data.allowed_admin_ips.forEach((ip) => {
            const row = document.createElement('div');
            row.className = 'admin-ip-row';
            const span = document.createElement('span');
            span.className = 'mono';
            span.textContent = ip + (ip === data.client_ip ? ' (kamu)' : '');
            row.append(span);

            if (data.allowed_admin_ips.length > 1) {
              const delBtn = document.createElement('button');
              delBtn.type = 'button';
              delBtn.className = 'btn-remove-ip';
              delBtn.textContent = 'Hapus';
              delBtn.addEventListener('click', async () => {
                if (!confirm(`Hapus IP admin ${ip}?`)) return;
                try {
                  await api('/api/admin/trust-ip', {
                    method: 'DELETE',
                    body: { ip, type: 'admin' },
                  });
                  toast(`IP admin ${ip} dihapus.`, 'ok');
                  openAdminIpModal();
                } catch (err) {
                  toast(err.message, 'error');
                }
              });
              row.append(delBtn);
            }
            adminIpsList.append(row);
          });
        }
      }

      const blockedIpsList = document.getElementById('blockedIpsList');
      if (blockedIpsList) {
        blockedIpsList.replaceChildren();
        if (!data.blocked_ips?.length) {
          blockedIpsList.append(createHint('Belum ada log IP yang ditolak.'));
        } else {
          data.blocked_ips.forEach((ip) => {
            const row = document.createElement('div');
            row.className = 'blocked-ip-row';
            const span = document.createElement('span');
            span.className = 'mono';
            span.textContent = ip;
            const trustBtn = document.createElement('button');
            trustBtn.type = 'button';
            trustBtn.className = 'btn-trust-ip';
            trustBtn.textContent = 'Setujui IP';
            trustBtn.addEventListener('click', () => {
              if (inputIp) {
                inputIp.value = ip;
                inputIp.scrollIntoView({ behavior: 'smooth' });
                inputIp.focus();
              }
            });
            row.append(span, trustBtn);
            blockedIpsList.append(row);
          });
        }
      }
    } catch (err) {
      toast(err.message, 'error');
    }
  };

  window.openAdminIpModal = openAdminIpModal;

  const navHelpAdminIpBtn = document.getElementById('navHelpAdminIpBtn');

  if (adminBadgeBtn) adminBadgeBtn.addEventListener('click', () => openAdminIpModal());
  if (navAdminIpBtn) navAdminIpBtn.addEventListener('click', () => openAdminIpModal());
  if (navHelpAdminIpBtn) navHelpAdminIpBtn.addEventListener('click', () => openAdminIpModal());
  if (adminModalCloseBtn) adminModalCloseBtn.addEventListener('click', closeAdminIpModal);
  if (adminModalBackdrop) adminModalBackdrop.addEventListener('click', closeAdminIpModal);

  if (trustIpType && trustProfileSelectGroup) {
    trustIpType.addEventListener('change', () => {
      trustProfileSelectGroup.classList.toggle('hidden', trustIpType.value === 'admin');
    });
  }

  if (trustIpForm) {
    trustIpForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const ip = document.getElementById('trustIpInput')?.value?.trim();
      const type = trustIpType?.value;
      const profile_id = document.getElementById('trustProfileSelect')?.value;

      try {
        const res = await api('/api/admin/trust-ip', {
          method: 'POST',
          body: { ip, type, profile_id },
        });
        toast(res.message || `IP ${ip} berhasil disetujui.`, 'ok');
        trustIpForm.reset();
        openAdminIpModal();
        loadSecurity(true);
      } catch (err) {
        toast(err.message, 'error');
      }
    });
  }

  // Buat Magic Link Undangan
  const createInviteForm = document.getElementById('createInviteForm');
  if (createInviteForm) {
    createInviteForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const profile_id = document.getElementById('inviteProfileSelect')?.value;
      const label = document.getElementById('inviteLabel')?.value?.trim();
      const btn = createInviteForm.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;

      try {
        const res = await api('/api/admin/invites', {
          method: 'POST',
          body: { profile_id, label, hours: 24, max_uses: 1 },
        });

        const resultBox = document.getElementById('inviteResultBox');
        const urlInput = document.getElementById('inviteUrlInput');
        if (resultBox && urlInput) {
          urlInput.value = res.invite_url;
          resultBox.classList.remove('hidden');
        }
        toast('Link undangan berhasil dibuat!', 'ok');
        createInviteForm.reset();
      } catch (err) {
        toast(err.message, 'error');
      } finally {
        if (btn) btn.disabled = false;
      }
    });
  }

  const copyInviteBtn = document.getElementById('copyInviteUrlBtn');
  if (copyInviteBtn) {
    copyInviteBtn.addEventListener('click', () => {
      const urlInput = document.getElementById('inviteUrlInput');
      if (urlInput?.value) {
        navigator.clipboard.writeText(urlInput.value);
        toast('Link undangan disalin ke clipboard!', 'ok');
      }
    });
  }

  // Salin IP pengunjung pada layar Gate
  const copyVisitorIpBtn = document.getElementById('copyVisitorIpBtn');
  if (copyVisitorIpBtn) {
    copyVisitorIpBtn.addEventListener('click', () => {
      const ipText = document.getElementById('visitorIpDisplay')?.textContent;
      if (ipText && ipText !== '—') {
        navigator.clipboard.writeText(ipText);
        toast(`IP ${ipText} disalin!`, 'ok');
      }
    });
  }

  // Pengunjung mengirim permintaan izin akses
  const requestAccessForm = document.getElementById('requestAccessForm');
  if (requestAccessForm) {
    requestAccessForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('requesterName')?.value?.trim();
      const btn = document.getElementById('submitRequestBtn');
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Mengirim…';
      }

      try {
        const res = await api('/api/access-request', {
          method: 'POST',
          body: { name },
        });
        toast(res.message, 'ok');
        checkAccessStatus();
      } catch (err) {
        toast(err.message, 'error');
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.textContent = 'Kirim Permintaan Akses';
        }
      }
    });
  }

  if (el.billFilterPills) {
    const pillButtons = el.billFilterPills.querySelectorAll('.tab-btn, .pill-btn');
    pillButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        pillButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        el.billFilter.value = btn.dataset.filter || '';
        renderBills();
      });
    });
  }

  // REST API Documentation Modal Logic (Zass CDN UI Style)
  const closeDocsModal = () => {
    if (el.docsModal) el.docsModal.classList.add('hidden');
    if (el.docsBackdrop) el.docsBackdrop.classList.add('hidden');
  };

  const updateDocsLanguage = (lang = 'curl') => {
    state.docsLang = lang;
    document.querySelectorAll('.zass-lang-pill').forEach((p) => {
      p.classList.toggle('active', p.dataset.lang === lang);
    });

    const fileNames = document.querySelectorAll('.request-filename');
    const label = lang === 'curl' ? 'request.sh' : lang === 'js' ? 'request.js' : 'request.py';
    fileNames.forEach((fn) => {
      fn.textContent = label;
    });

    renderDocSnippets(lang);
  };

  const openDocsModal = async () => {
    closeNavDrawer();
    closeAccountDrawer();
    if (adminIpModal) adminIpModal.classList.add('hidden');
    if (adminModalBackdrop) adminModalBackdrop.classList.add('hidden');

    if (el.docsModal) el.docsModal.classList.remove('hidden');
    if (el.docsBackdrop) el.docsBackdrop.classList.remove('hidden');

    if (el.docsProfileName) {
      el.docsProfileName.textContent = state.profile?.name || 'Profil Aktif';
    }

    if (el.docsBaseUrlDisplay) {
      el.docsBaseUrlDisplay.textContent = `${window.location.origin}/api`;
    }

    updateDocsLanguage(state.docsLang || 'curl');

    try {
      const data = await api('/api/profile/api-key');
      if (data.api_key) {
        state.apiKey = data.api_key;
        if (el.apiKeyDisplay) el.apiKeyDisplay.value = data.api_key;
        renderDocSnippets(state.docsLang || 'curl');
      }
    } catch (err) {
      toast(err.message, 'error');
    }
  };

  if (el.navDocsBtn) el.navDocsBtn.addEventListener('click', openDocsModal);
  if (el.docsModalCloseBtn) el.docsModalCloseBtn.addEventListener('click', closeDocsModal);
  if (el.docsBackdrop) el.docsBackdrop.addEventListener('click', closeDocsModal);

  // Zass Navigation Pills Tab Switcher
  if (el.docsNavTabs) {
    const tabPills = el.docsNavTabs.querySelectorAll('.zass-nav-pill');
    const tabPanes = {
      overview: document.getElementById('tabDocsOverview'),
      create: document.getElementById('tabDocsCreate'),
      check: document.getElementById('tabDocsCheck'),
      list: document.getElementById('tabDocsList'),
      cancel: document.getElementById('tabDocsCancel'),
    };

    tabPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        tabPills.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');

        const targetTab = pill.dataset.tab;
        Object.entries(tabPanes).forEach(([key, pane]) => {
          if (pane) {
            pane.classList.toggle('active', key === targetTab);
          }
        });
      });
    });
  }

  // Language Capsule Switchers
  document.querySelectorAll('.zass-lang-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      const lang = pill.dataset.lang || 'curl';
      updateDocsLanguage(lang);
    });
  });

  // Base URL Copy
  if (el.copyBaseUrlBtn) {
    el.copyBaseUrlBtn.addEventListener('click', async () => {
      const url = `${window.location.origin}/api`;
      try {
        await navigator.clipboard.writeText(url);
        toast('Base URL disalin ke clipboard!', 'ok');
      } catch {
        toast('Gagal menyalin Base URL', 'error');
      }
    });
  }

  // API Key Show/Hide Toggle
  if (el.toggleApiKeyVisibilityBtn && el.apiKeyDisplay) {
    el.toggleApiKeyVisibilityBtn.addEventListener('click', () => {
      const isPassword = el.apiKeyDisplay.type === 'password';
      el.apiKeyDisplay.type = isPassword ? 'text' : 'password';
    });
  }

  // API Key Copy
  if (el.copyApiKeyBtn && el.apiKeyDisplay) {
    el.copyApiKeyBtn.addEventListener('click', async () => {
      if (!state.apiKey) return;
      try {
        await navigator.clipboard.writeText(state.apiKey);
        toast('API Key disalin ke clipboard!', 'ok');
      } catch {
        el.apiKeyDisplay.type = 'text';
        el.apiKeyDisplay.select();
        document.execCommand('copy');
        toast('API Key disalin!', 'ok');
      }
    });
  }

  // API Key Regenerate
  if (el.regenerateApiKeyBtn) {
    el.regenerateApiKeyBtn.addEventListener('click', async () => {
      const ok = window.confirm(
        'Yakin ingin membuat API Key baru? Kunci lama akan langsung tidak berlaku dan semua script yang menggunakannya harus diperbarui.'
      );
      if (!ok) return;

      el.regenerateApiKeyBtn.disabled = true;
      try {
        const data = await api('/api/profile/api-key/regenerate', { method: 'POST' });
        if (data.api_key) {
          state.apiKey = data.api_key;
          if (el.apiKeyDisplay) el.apiKeyDisplay.value = data.api_key;
          renderDocSnippets(state.docsLang || 'curl');
          toast(data.message || 'API Key baru berhasil dibuat!', 'ok');
        }
      } catch (err) {
        toast(err.message, 'error');
      } finally {
        el.regenerateApiKeyBtn.disabled = false;
      }
    });
  }

  // Terminal & Snippet Copy Buttons
  document.querySelectorAll('.btn-copy-snippet').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const targetId = btn.dataset.copyTarget;
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;
      const code = targetEl.textContent;
      try {
        await navigator.clipboard.writeText(code);
        toast('Kode berhasil disalin ke clipboard!', 'ok');
      } catch {
        toast('Gagal menyalin teks', 'error');
      }
    });
  });

  el.connectBtn.addEventListener('click', connectAccount);
  el.disconnectBtn.addEventListener('click', disconnectAccount);
  el.otpForm.addEventListener('submit', submitOtp);
  if (el.editProfileForm) el.editProfileForm.addEventListener('submit', saveProfile);

  if (el.createForm) el.createForm.addEventListener('submit', createBill);
  if (el.profileForm) el.profileForm.addEventListener('submit', createProfile);
  if (el.switchProfileBtn) el.switchProfileBtn.addEventListener('click', leaveProfile);
  if (el.deleteProfileBtn) el.deleteProfileBtn.addEventListener('click', deleteProfile);

  // ── Multi-Step Wizard Events ──
  if (el.btnGoToRegister) {
    el.btnGoToRegister.addEventListener('click', () => navigateTo('/register'));
  }

  if (el.wizCancelBtn) {
    el.wizCancelBtn.addEventListener('click', () => navigateTo('/login'));
  }

  if (el.wizStep1NextBtn) {
    el.wizStep1NextBtn.addEventListener('click', () => {
      const name = el.wizName?.value.trim();
      const phone = el.wizPhone?.value.trim();
      if (!name) {
        toast('Nama profil / toko wajib diisi', 'error');
        el.wizName?.focus();
        return;
      }
      if (!phone || phone.length < 9) {
        toast('Nomor HP GoPay minimal 9 digit', 'error');
        el.wizPhone?.focus();
        return;
      }
      setWizardStep(2);
    });
  }

  if (el.wizQris) {
    el.wizQris.addEventListener('input', updateQrisInspector);
  }

  if (el.wizStep2BackBtn) {
    el.wizStep2BackBtn.addEventListener('click', () => setWizardStep(1));
  }

  if (el.wizStep2NextBtn) {
    el.wizStep2NextBtn.addEventListener('click', () => {
      const qris = el.wizQris?.value.trim();
      if (!qris || !qris.startsWith('000201')) {
        toast('String QRIS harus format EMVCo valid (diawali 000201)', 'error');
        el.wizQris?.focus();
        return;
      }
      setWizardStep(3);
    });
  }

  if (el.wizStep3BackBtn) {
    el.wizStep3BackBtn.addEventListener('click', () => setWizardStep(2));
  }

  if (el.wizardForm) {
    el.wizardForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = el.wizName?.value.trim();
      const phone = el.wizPhone?.value.trim();
      const qris = el.wizQris?.value.trim();
      const pin = el.wizPin?.value.trim() || '';
      const pinConfirm = el.wizPinConfirm?.value.trim() || '';

      if (pin) {
        if (!/^\d{4,6}$/.test(pin)) {
          if (el.wizError) {
            el.wizError.textContent = 'PIN harus berupa 4–6 digit angka';
            el.wizError.hidden = false;
          }
          el.wizPin?.focus();
          return;
        }
        if (pin !== pinConfirm) {
          if (el.wizError) {
            el.wizError.textContent = 'Konfirmasi PIN tidak cocok dengan PIN di atas';
            el.wizError.hidden = false;
          }
          el.wizPinConfirm?.focus();
          return;
        }
      }

      el.wizSubmitBtn.disabled = true;
      el.wizSubmitBtn.textContent = 'Mendaftarkan toko…';
      if (el.wizError) el.wizError.hidden = true;

      try {
        const body = { name, phone, qris };
        if (pin) body.pin = pin;
        await api('/api/profiles', {
          method: 'POST',
          body,
        });
        toast('Profil toko berhasil didaftarkan!', 'ok');
        window.location.href = '/';
      } catch (err) {
        if (el.wizError) {
          el.wizError.textContent = err.message || 'Gagal mendaftar';
          el.wizError.hidden = false;
        }
        toast(err.message, 'error');
      } finally {
        el.wizSubmitBtn.disabled = false;
        el.wizSubmitBtn.textContent = 'Daftar & Buka Dashboard 🚀';
      }
    });
  }

  // ── PIN Modal Events ──
  if (el.pinModalCancelBtn) {
    el.pinModalCancelBtn.addEventListener('click', closePinModal);
  }
  if (el.pinModalOverlay) {
    el.pinModalOverlay.addEventListener('click', (e) => {
      if (e.target === el.pinModalOverlay) closePinModal();
    });
  }
  if (el.pinModalForm) {
    el.pinModalForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const pin = el.modalPinInput?.value.trim();
      if (!pin) return;
      if (!pendingPinProfileId) return;

      el.pinModalSubmitBtn.disabled = true;
      el.pinModalSubmitBtn.textContent = 'Memverifikasi…';
      if (el.pinModalError) el.pinModalError.hidden = true;

      try {
        await api(`/api/profiles/${encodeURIComponent(pendingPinProfileId)}/select`, {
          method: 'POST',
          body: { pin },
        });
        closePinModal();
        window.location.href = '/';
      } catch (err) {
        if (el.pinModalError) {
          el.pinModalError.textContent = err.message || 'PIN salah, coba lagi';
          el.pinModalError.hidden = false;
        }
        el.modalPinInput?.focus();
        el.modalPinInput?.select();
      } finally {
        el.pinModalSubmitBtn.disabled = false;
        el.pinModalSubmitBtn.textContent = 'Buka Profil';
      }
    });
  }

  // ── Admin Modal Events ──
  if (el.adminModalCancelBtn) {
    el.adminModalCancelBtn.addEventListener('click', closeAdminModal);
  }
  if (el.adminModalOverlay) {
    el.adminModalOverlay.addEventListener('click', (e) => {
      if (e.target === el.adminModalOverlay) closeAdminModal();
    });
  }
  if (el.adminModalForm) {
    el.adminModalForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const password = el.modalAdminPasswordInput?.value;
      if (!password) return;

      el.adminModalSubmitBtn.disabled = true;
      el.adminModalSubmitBtn.textContent = 'Memverifikasi…';
      if (el.adminModalError) el.adminModalError.hidden = true;

      try {
        const res = await api('/api/admin/unlock', {
          method: 'POST',
          body: { password },
        });
        closeAdminModal();
        toast(res.message || 'Berhasil masuk sebagai Admin!', 'ok');
        window.location.reload();
      } catch (err) {
        if (el.adminModalError) {
          el.adminModalError.textContent = err.message || 'Password salah';
          el.adminModalError.hidden = false;
        }
        el.modalAdminPasswordInput?.focus();
        el.modalAdminPasswordInput?.select();
      } finally {
        el.adminModalSubmitBtn.disabled = false;
        el.adminModalSubmitBtn.textContent = 'Masuk Admin';
      }
    });
  }

  // ── Eye Toggle for Password/PIN Inputs ──
  document.querySelectorAll('.btn-toggle-eye').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const input = document.getElementById(targetId);
      if (!input) return;
      if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = '🙈';
      } else {
        input.type = 'password';
        btn.textContent = '👁️';
      }
    });
  });

  for (const chip of document.querySelectorAll('[data-amount]')) {
    chip.addEventListener('click', () => {
      el.amount.value = chip.dataset.amount;
      el.amount.focus();
    });
  }

  el.checkBtn.addEventListener('click', checkBill);
  el.copyQrBtn.addEventListener('click', copyQr);
  el.cancelBtn.addEventListener('click', cancelBill);

  el.billFilter.addEventListener('change', renderBills);
  el.refreshBills.addEventListener('click', () => loadBills(false));
  el.txRefresh.addEventListener('click', () => loadTransactions(false));
  el.secRefresh.addEventListener('click', () => loadSecurity(false));

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && state.bill?.status === 'pending') {
      refreshBill(state.bill.ref, true);
    }
  });
}

boot();
