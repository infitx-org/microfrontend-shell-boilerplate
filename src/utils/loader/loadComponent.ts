import { ComponentType } from 'react';
import WebpackContainerError from './WebpackContainerError';
import WebpackLoadingError from './WebpackLoadingError';

export default (function loadComponentWrapper() {
  const loaded = new Map();

  return function loadComponent(
    url: string,
    scope: string,
    moduleName: string,
  ): () => Promise<{ default: ComponentType<any> }> {
    return () =>
      new Promise((resolve, reject) => {
        // defines the reference to track
        const ref = `${url}${scope}`;

        async function init() {
          const subMap = loaded.get(ref);
          if (subMap.has(moduleName)) {
            resolve(subMap.get(moduleName));
            return;
          }

          try {
            // @ts-ignore
            const factory = await window[scope].get(`./${moduleName}`);
            const Module = factory();

            subMap.set(moduleName, Module);
            loaded.set(ref, subMap);

            resolve(Module);
          } catch (e) {
            reject(new WebpackContainerError(`module ${moduleName} not found`));
          }
        }

        async function load() {
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
            loaded.set(ref, new Map());
            init();
          } catch (error) {
            reject(error);
          }
        }

        if (loaded.has(ref)) {
          init();
        } else {
          const script = document.createElement('script');
          script.src = url;
          script.onerror = () => {
            reject(new WebpackLoadingError(`Error loading from ${url}`));
          };
          script.onload = load;

          const head =
            document.querySelector('head') ||
            document.body.appendChild(document.createElement('head'));
          head.appendChild(script);
        }
      });
  };
})();
