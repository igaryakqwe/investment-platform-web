interface EnvConfig {
  API_URL: string;
}

const env = {
  API_URL: process.env.NEXT_PUBLIC_API_URL!,
} satisfies EnvConfig;

export default env;
