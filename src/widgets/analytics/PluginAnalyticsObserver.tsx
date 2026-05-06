import React from 'react';
import {
  trackCaptureEnd,
  trackCaptureStart,
  trackPluginClose,
  trackPluginLoaded,
  trackPluginOpen,
} from '@/shared/lib/analytics';

let hasTrackedPluginLoaded = false;
let lastKnownPluginOpen: boolean | undefined;
let lastKnownCaptureActive = false;

function isPluginOpen(wrapper: HTMLElement) {
  return (
    wrapper.classList.contains('thatzfit-visible') &&
    !wrapper.classList.contains('thatzfit-hidden')
  );
}

function isCaptureActive() {
  return Boolean(document.querySelector('[data-thatzfit-capture-ui="true"]'));
}

export const PluginAnalyticsObserver: React.FC = () => {
  React.useEffect(() => {
    if (typeof window === 'undefined' || !document.body) {
      return;
    }

    let wrapperObserver: MutationObserver | undefined;

    const syncPluginState = () => {
      const pluginRoot = document.getElementById('thatzfit-plugin');
      const wrapper = document.getElementById('thatzfit-iframe-wrapper');

      if (pluginRoot && !hasTrackedPluginLoaded) {
        hasTrackedPluginLoaded = true;
        trackPluginLoaded();
      }

      if (!wrapper) {
        return;
      }

      const nextIsOpen = isPluginOpen(wrapper);
      if (lastKnownPluginOpen === undefined) {
        lastKnownPluginOpen = nextIsOpen;
      } else if (lastKnownPluginOpen !== nextIsOpen) {
        lastKnownPluginOpen = nextIsOpen;
        if (nextIsOpen) {
          trackPluginOpen();
        } else {
          trackPluginClose();
        }
      }

      if (!wrapperObserver) {
        wrapperObserver = new MutationObserver(syncPluginState);
        wrapperObserver.observe(wrapper, {
          attributeFilter: ['class'],
          attributes: true,
        });
      }
    };

    const syncCaptureState = () => {
      const nextIsCaptureActive = isCaptureActive();
      if (lastKnownCaptureActive === nextIsCaptureActive) {
        return;
      }

      lastKnownCaptureActive = nextIsCaptureActive;
      if (nextIsCaptureActive) {
        trackCaptureStart();
      } else {
        trackCaptureEnd();
      }
    };

    const bodyObserver = new MutationObserver(() => {
      syncPluginState();
      syncCaptureState();
    });

    syncPluginState();
    syncCaptureState();
    bodyObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      bodyObserver.disconnect();
      wrapperObserver?.disconnect();
    };
  }, []);

  return null;
};
