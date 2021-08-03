import { ComponentType } from 'react';
import WebpackContainerError from './WebpackContainerError';
import WebpackLoadingError from './WebpackLoadingError';

export default (function loadComponentWrapper() {
  const apps = new Map();

  return function loadComponent(
    url: string,
    scope: string,
    component: string,
  ): () => Promise<{ default: ComponentType<any> }> {
    return () =>
      new Promise((resolve, reject) => {
        // defines the applicaton reference
        const app = `${url}#${scope}`;

        async function init(currentScope: string) {
          // @ts-ignore
          const factory = await window[currentScope].get(`./${component}`);
          const Module = factory();
          resolve(Module);
        }

        function makeLoad(element: Element) {
          return async function load() {
            try {
              // @ts-ignore
              await __webpack_init_sharing__('default');

              // @ts-ignore
              const container = window[scope];
              if (!container) {
                reject(new WebpackContainerError(`container ${scope} not found`));
              }

              // @ts-ignore
              await container.init(__webpack_share_scopes__.default);
              init(scope);
            } catch (error) {
              reject(error);
            } finally {
              element.parentNode?.removeChild(element);
            }
          };
        }

        if (apps.has(app)) {
          init(scope);
        } else {
          // @ts-ignore
          apps.set(app, true);
          const script = document.createElement('script');
          script.src = url;
          script.onerror = () => {
            reject(new WebpackLoadingError(`Error loading from ${url}`));
          };
          script.onload = makeLoad(script);

          const head =
            document.querySelector('head') ||
            document.body.appendChild(document.createElement('head'));
          head.appendChild(script);
        }
      });
  };
})();
