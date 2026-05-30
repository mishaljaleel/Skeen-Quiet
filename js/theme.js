/**
 * Woody House — Theme System
 * Day/Night mode with localStorage persistence, system preference, and auto scheduling.
 */

(function () {
  'use strict';

  var STORAGE_KEY = 'woodyhouse-theme';
  var MODE_KEY = 'woodyhouse-theme-mode';
  var TRANSITION_MS = 450;

  function getScheduledTheme() {
    var hour = new Date().getHours();
    return (hour >= 6 && hour < 18) ? 'light' : 'dark';
  }

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function resolveTheme() {
    var saved = localStorage.getItem(STORAGE_KEY);
    var mode = localStorage.getItem(MODE_KEY);

    if (saved === 'light' || saved === 'dark') {
      if (mode === 'auto') {
        return getScheduledTheme();
      }
      return saved;
    }

    if (window.matchMedia('(prefers-color-scheme: dark)').matches ||
        window.matchMedia('(prefers-color-scheme: light)').matches) {
      return getSystemTheme();
    }

    return getScheduledTheme();
  }

  function applyTheme(theme, animate) {
    var html = document.documentElement;
    html.setAttribute('data-theme', theme);

    var toggle = document.getElementById('themeToggle');
    if (toggle) {
      toggle.setAttribute('aria-pressed', theme === 'dark');
      toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to day theme' : 'Switch to night theme');
    }

    if (animate) {
      html.classList.add('is-theme-transitioning');
      window.setTimeout(function () {
        html.classList.remove('is-theme-transitioning');
      }, TRANSITION_MS);
    }
  }

  function setTheme(theme, source) {
    localStorage.setItem(STORAGE_KEY, theme);
    localStorage.setItem(MODE_KEY, source || 'manual');
    applyTheme(theme, true);
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme') || 'light';
    var next = current === 'dark' ? 'light' : 'dark';
    setTheme(next, 'manual');
  }

  function initTheme() {
    applyTheme(resolveTheme(), false);

    var toggle = document.getElementById('themeToggle');
    if (toggle) {
      toggle.addEventListener('click', toggleTheme);
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (localStorage.getItem(MODE_KEY) !== 'manual') {
        applyTheme(e.matches ? 'dark' : 'light', true);
      }
    });

    window.setInterval(function () {
      if (localStorage.getItem(MODE_KEY) === 'auto') {
        var scheduled = getScheduledTheme();
        var current = document.documentElement.getAttribute('data-theme');
        if (scheduled !== current) {
          applyTheme(scheduled, true);
        }
      }
    }, 60000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }

  window.WoodyHouseTheme = {
    set: setTheme,
    toggle: toggleTheme,
    get: function () {
      return document.documentElement.getAttribute('data-theme');
    },
    enableAutoSchedule: function () {
      localStorage.setItem(MODE_KEY, 'auto');
      applyTheme(getScheduledTheme(), true);
    }
  };
})();
