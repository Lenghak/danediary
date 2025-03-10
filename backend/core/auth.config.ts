import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI, organization } from "better-auth/plugins";
import Bun from "bun";
import Valkey from "iovalkey";
import schema from "~/db/schema";
import envConfig from "./env.config";

const sqlClient = new Bun.SQL(Bun.env.DATABASE_URL as string);
const valkeyClient = new Valkey(Bun.env.VALKEY_URL as string);

export const authConfig = betterAuth({
  appName: Bun.env.APP_NAME,
  database: drizzleAdapter(
    { client: sqlClient },
    { provider: "pg", schema, usePlural: true },
  ),
  rateLimit: {
    enabled: true,
    storage: "secondary-storage",
  },
  socialProviders: {
    github: {
      clientId: Bun.env.GITHUB_CLIENT_ID as string,
      clientSecret: Bun.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: Bun.env.GOOGLE_CLIENT_ID as string,
      clientSecret: Bun.env.GOOGLE_CLIENT_SECRET as string,
    },
    facebook: {
      clientId: Bun.env.FACEBOOK_APP_ID as string,
      clientSecret: Bun.env.FACEBOOK_APP_SECRET as string,
    },
    twitter: {
      clientId: Bun.env.TWITTER_CLIENT_ID as string,
      clientSecret: Bun.env.TWITTER_CLIENT_SECRET as string,
    },
    discord: {
      clientId: Bun.env.DISCORD_CLIENT_ID as string,
      clientSecret: Bun.env.DISCORD_CLIENT_SECRET as string,
    },
  },
  plugins: [
    openAPI({ disableDefaultReference: true }),
    organization({
      allowUserToCreateOrganization: true,
    }),
  ],
  trustedOrigins: envConfig.CORS_ORIGIN_WHITELIST,
  secondaryStorage: {
    get: async (key) => {
      const value = await valkeyClient.get(key);
      return value ? value : null;
    },
    set: async (key, value, ttl) => {
      if (ttl) {
        await valkeyClient.set(key, value, "EX", ttl);
      } else {
        await valkeyClient.set(key, value);
      }
    },
    delete: async (key) => {
      await valkeyClient.del(key);
    },
  },
});
