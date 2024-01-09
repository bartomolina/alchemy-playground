import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_ALCHEMY_SEPOLIA: z.string().min(1),
    NEXT_PUBLIC_PRIVY_APP_ID: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_ALCHEMY_SEPOLIA: process.env.NEXT_PUBLIC_ALCHEMY_SEPOLIA,
    NEXT_PUBLIC_PRIVY_APP_ID: process.env.NEXT_PUBLIC_PRIVY_APP_ID,
  },
});
