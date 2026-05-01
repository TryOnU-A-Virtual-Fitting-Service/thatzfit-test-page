const START_CAPTURE_EVENT = 'thatzfit:start-capture';
const ACTIVE_CAPTURE_SELECTOR = '[data-thatzfit-active-capture="true"]';

export const startThatzfitCapture = (target: HTMLElement | null) => {
  document.querySelectorAll(ACTIVE_CAPTURE_SELECTOR).forEach((element) => {
    element.removeAttribute('data-thatzfit-active-capture');
  });

  target?.setAttribute('data-thatzfit-active-capture', 'true');
  window.dispatchEvent(new CustomEvent(START_CAPTURE_EVENT));
};
