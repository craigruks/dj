build:
    pnpm run build

deploy: build
    npx wrangler pages deploy . --project-name=dj-ruks --branch=main --commit-dirty=true

dev:
    pnpm run dev
