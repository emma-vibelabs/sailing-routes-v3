/* ============================================
   Auth Module — Neon Auth (Better Auth) REST API
   No bundler needed, vanilla JS
   ============================================ */

const Auth = (function () {
  'use strict';

  let currentUser = null;
  let sessionToken = null;
  const listeners = [];
  const AUTH_URL = (window.APP_CONFIG || {}).authUrl || '';

  function onAuthChange(fn) { listeners.push(fn); }
  function notify() { listeners.forEach(fn => fn(currentUser)); }

  async function signUp(email, password, name) {
    const res = await fetch(AUTH_URL + '/sign-up/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password, name }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || data.error || 'Registrering feilet');
    currentUser = data.user;
    sessionToken = data.session?.token || data.token;
    if (sessionToken) localStorage.setItem('sr-auth-token', sessionToken);
    notify();
    return data;
  }

  async function signIn(email, password) {
    const res = await fetch(AUTH_URL + '/sign-in/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || data.error || 'Innlogging feilet');
    currentUser = data.user;
    sessionToken = data.session?.token || data.token;
    if (sessionToken) localStorage.setItem('sr-auth-token', sessionToken);
    notify();
    return data;
  }

  async function signOut() {
    try {
      await fetch(AUTH_URL + '/sign-out', {
        method: 'POST',
        credentials: 'include',
        headers: sessionToken ? { 'Authorization': 'Bearer ' + sessionToken } : {},
      });
    } catch (e) { /* ignore */ }
    currentUser = null;
    sessionToken = null;
    localStorage.removeItem('sr-auth-token');
    notify();
  }

  async function getSession() {
    // Try stored token first
    const stored = localStorage.getItem('sr-auth-token');
    if (stored) sessionToken = stored;

    try {
      const headers = {};
      if (sessionToken) headers['Authorization'] = 'Bearer ' + sessionToken;
      const res = await fetch(AUTH_URL + '/get-session', {
        credentials: 'include',
        headers,
      });
      if (!res.ok) {
        currentUser = null;
        sessionToken = null;
        localStorage.removeItem('sr-auth-token');
        return null;
      }
      const data = await res.json();
      currentUser = data.user;
      sessionToken = data.session?.token || sessionToken;
      if (sessionToken) localStorage.setItem('sr-auth-token', sessionToken);
      notify();
      return data;
    } catch (e) {
      return null;
    }
  }

  function getUser() { return currentUser; }
  function getToken() { return sessionToken; }
  function isLoggedIn() { return !!currentUser; }

  // Authenticated fetch wrapper
  async function authFetch(url, options) {
    options = options || {};
    const headers = Object.assign({}, options.headers || {});
    if (sessionToken) {
      headers['Authorization'] = 'Bearer ' + sessionToken;
    }
    return fetch(url, Object.assign({}, options, { headers: headers, credentials: 'include' }));
  }

  return {
    signUp: signUp,
    signIn: signIn,
    signOut: signOut,
    getSession: getSession,
    getUser: getUser,
    getToken: getToken,
    isLoggedIn: isLoggedIn,
    authFetch: authFetch,
    onAuthChange: onAuthChange,
  };
})();
