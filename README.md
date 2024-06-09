# PNPM Monorepo Setup

Instructions for setting up a simple monorepo with PNPM. This format allows for rapid development of microservices while keeping overhead and coupling low. It includes a very simple Express backend and a Next.js React frontend, though they do not communicate.

## PNPM Project Setup

1. Initialize PNPM project

```shell
cd pnpm-project
pnpm init
```

2. Update `package.json` to be private

```json
{
  "private": true
}
```

3. Create and update `pnpm-workspace.yaml` with desired paths

```shell
touch pnpm-workspace.yaml
```

```yaml
packages:
  - 'services/*'
  - 'packages/*'
```

4. Add TypeScript to the project. Use `-w` to add a dependency to the PNPM project itself.

```shell
pnpm add typescript --save-dev -w
```

5. Create the root `tsconfig.json` file

```shell
pnpm exec tsc --init
```

```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "$schema": "https://json.schemastore.org/tsconfig"
}
```

6. Add workspace tools

```shell
pnpm add -w eslint prettier
pnpm add -w @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-prettier eslint-config-prettier
```

```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "plugins": ["@typescript-eslint"],
  "rules": {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"]
  }
}
```

```shell
touch .prettierrc
```

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80
}
```

## Creating a Custom Service

These steps walk you through creating an Express backend service. This will be a similar process for other Node services.

1. Create a folder for the package

```shell
mkdir -p services/backend-server
cd services/backend-server
pnpm init
pnpm add typescript --save-dev
```

2. Add a `tsconfig.json`

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

3. Update `package.json`

```json
{
  "main": "dist/index.js",
  "scripts": {
    "dev": "ts-node-dev src/index.ts",
    "build": "tsc",
    "serve": "node dist/index.js"
  }
}
```

4. Add service dependencies

```shell
pnpm add express cors
pnpm add @types/node @types/express @types/cors ts-node-dev --save-dev
```

5. Create `index.ts`

```typescript
import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the backend server!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

### Backend Server Layout

```mono
backend-server
├── package.json
├── src
│   └── index.ts
└── tsconfig.json
```

## Creating a Next.js React Client

Using the `create-next-app` command to create a Next.js frontend. Other commands exist and can be used similarly.

1. Use `create-next-app` to create the client. Select TypeScript or run with `--ts` to make sure TypeScript is added.

```shell
pnpm create next-app frontend-client --ts
```

2. Update `tsconfig.json`

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "noEmit": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Frontend Client Layout

```mono
frontend-client
├── README.md
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── public
│   ├── next.svg
│   └── vercel.svg
├── src
│   └── app
│       ├── favicon.ico
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
├── tailwind.config.ts
└── tsconfig.json
```

## Creating a Type Package

1. Initialize the package

```shell
mkdir -p packages/types
cd packages/types
pnpm init
pnpm add typescript --save-dev
```

2. Update `package.json`

```json
{
  "name": "@pnpm-project/types",
  "main": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc -w"
  }
}
```

3. Update `tsconfig.json`, it can be identical to backend-server

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true
  },
  "include": ["src/**/*.ts"]
}
```

4. Add types to `src/index.ts`

```typescript
export interface TestRequest {
  body: any;
}

export interface TestResponse {
  status: 'OKAY' | 'ERROR';
  body?: any;
}
```

### Types Package Layout

```mono
types
├── package.json
├── src
│   └── index.ts
└── tsconfig.json
```

## Adding Types to Services

1. Add the types package as a dependency

```shell
pnpm add --filter backend-server --filter frontend-client "@pnpm-project/types@workspace:*"
```

2. Use the type

```typescript
import { TestRequest } from '@pnpm-project/types';

const request: TestRequest = {
  body: {
    message: 'Hello from the backend server!',
  },
};
```
