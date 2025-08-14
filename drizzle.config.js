import 'dotenv/config';
/** @type {import("drizzle-kit").config} */
export default {
schema: "./utils/schema.js",
dialect: "postgresql",
dbCredentials: {
  url: 'postgresql://neondb_owner:npg_MkQEYzGq6y9Z@ep-patient-credit-a1w0uoqh-pooler.ap-southeast-1.aws.neon.tech/mock_interview?sslmode=require&channel_binding=require'
}
};