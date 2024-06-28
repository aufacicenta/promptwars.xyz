import { ReactNode } from "react";

export type IlluviumPassportContextControllerProps = {
  children: ReactNode;
};

export type IlluviumPassportContextType = {
  login: () => Promise<void>
};
