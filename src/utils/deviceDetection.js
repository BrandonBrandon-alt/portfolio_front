// src/utils/deviceDetection.js
export const detectDevice = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  return {
    isMobile:
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent
      ) || window.innerWidth <= 768,
    isTablet:
      /ipad/i.test(userAgent) ||
      (isTouch && window.innerWidth > 768 && window.innerWidth <= 1024),
    isDesktop: window.innerWidth > 1024 && !isTouch,
    isIOS: /ipad|iphone|ipod/.test(userAgent),
    isSafari: /safari/i.test(userAgent) && !/chrome/i.test(userAgent),
    isChrome: /chrome/i.test(userAgent),
    isTouch,
  };
};

export const getOptimalStrategy = () => {
  const device = detectDevice();

  if (device.isMobile || device.isIOS) return "download";
  if (device.isDesktop) return "newTab";
  return "modal";
};
