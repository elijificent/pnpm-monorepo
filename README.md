# PNPM Monorepo Setup

Instructions for setting up a simple typescript monorepo with PNPM. This format allows for the rapid development of microservices while keeping project overhead and coupling low. It includes a very simple Express backend and a Next.js React frontend, though they do not communicate. See [setup.md](./setup.md) for instructions on setup.

## General Patterns

**services/\***

Node applications can be found here.

**packages/\***

Shared types and methods for the application
