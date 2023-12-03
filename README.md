# Reddit Clone
Reddit Clone Kinda

## Stack
- NextJS 14
- TailwindCSS and ShadcnUI
- next-safe-action
- prisma
- lucia
- Playwright

## Requirement
- Node v20
- pnpm v8
- postgresql v14

## Instalation (development)
1. Install depedency `pnpm install`
1. Copy .env.example to .env fill based on your configuration
1. Migrate database `pnpm run db:migrate`
1. Run server `pnpm run dev`
1. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing
- install playwright depedencies `pnpm dlx playwright install`
- testing `pnpm run test:e2e` or test in debug mode `pnpm run test:e2edebug`

## Deployment
1. Install depedency `pnpm install`
1. Copy .env.example to .env fill based on your configuration
1. Migrate database `pnpm run db:migrate`
1. Build project `pnpm run build`
1. Run project `pnpm run start`

## Road Map
1. Create Post [v]
2. Detail Post [v]
3. Upvote [v]
4. Comment [v]
5. Scroll Post [ ]
