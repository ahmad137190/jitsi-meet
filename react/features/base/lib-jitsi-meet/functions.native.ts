// @ts-ignore
import { safeJsonParse } from '@jitsi/js-utils/json';
import { NativeModules } from 'react-native';

import { loadScript } from '../util/loadScript.native';

import logger from './logger';
import axios from "axios";

export * from './functions.any';

const { JavaScriptSandbox } = NativeModules;

/**
 * Loads config.js from a specific remote server.
 *
 * @param {string} url - The URL to load.
 * @returns {Promise<Object>}
 */
export async function loadConfig(url: string): Promise<Object> {
    try {
      //  const response = await fetch("https://app137.satia.co/");

        // axios(
        //     {
        //         // url: baseUrl + url + params,
        //        // url:  url,
        //         //url:  "https://vc2.satia.co/config.js",
        //         url:  "https://app137.satia.co/",
        //         //url:  "https://alpha.jitsi.net/config.js",
        //         method: "get",
        //         //params: params,
        //         timeout: 60 * 1000,
        //         headers: {
        //             'Content-Type': 'application/x-www-form-urlencoded',
        //             // "Authorization": token,
        //         },
        //         /*      headers: { "Authorization": params._session?params._session:params.token, 'X-Requested-With': 'XMLHttpRequest'},*/
        //     },
        // )
        //     .then(async response => {
        //
        //         let data = response.data;
        //         // @ts-ignore
        //         throw new Error('Failed to load config from @@@',data.toString());
        //
        //         // @ts-ignore
        //       //  throw new Error('Failed to load config from @@@',response.text.toString());
        //
        //     }).catch((e) => {
        //     console.log(e);
        //     logger.error(`Failed to load config from ??? ${url}`, e);
        // });
        // return ""

        const configTxt = await loadScript(url, 10 * 1000 /* Timeout in ms */, true /* skipeval */);
        const configJson = await JavaScriptSandbox.evaluate(`${configTxt}\nJSON.stringify(config);`);
        const config = safeJsonParse(configJson);

        if (typeof config !== 'object') {
            throw new Error('config is not an object');
        }

        logger.info(`Config loaded from ${url}`);

        return config;
    } catch (err) {
        logger.error(`Failed to load config from ?? ${url}`, err);

        throw err;
    }
}
