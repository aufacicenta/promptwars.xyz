import { routes } from "@/hooks/useRoutes/useRoutes";
import { config, passport } from "@imtbl/sdk";

const passportInstance = new passport.Passport({
  baseConfig: {
    environment: config.Environment.SANDBOX, // or Environment.PRODUCTION
    publishableKey: process.env.NEXT_PUBLIC_IMX_PASSPORT_PUB_KEY, // replace with your publishable API key from Hub
  },
  clientId: process.env.NEXT_PUBLIC_IMX_PASSPORT_CLIENT_ID!, // replace with your client ID from Hub
  redirectUri: routes.oauth.illuvium.passport.redirectUri(), // replace with one of your redirect URIs from Hub
  logoutRedirectUri: routes.oauth.illuvium.passport.logoutRedirectUri(), // replace with one of your logout URIs from Hub
  audience: "platform_api",
  scope: "openid offline_access email transact",
  popupOverlayOptions: {
    disableGenericPopupOverlay: false, // Set to true to disable the generic pop-up overlay
    disableBlockedPopupOverlay: false, // Set to true to disable the blocked pop-up overlay
  },
});

const e = {
  passportInstance,
};

export default e;
