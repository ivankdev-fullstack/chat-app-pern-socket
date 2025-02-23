# Description

ChatApp is a simple application where you can connect from different browsers to interact between users in a form of chat.

## Techonologies used

- **Socket.IO:** A real-time, bidirectional communication library that enables WebSocket-based event-driven interactions between clients and servers.

- **Express.js:** A minimal and flexible Node.js web framework that simplifies building APIs and web applications with middleware support.

- **TypeScript:** A statically typed superset of JavaScript that enhances code quality, maintainability, and developer experience.

- **Prisma:** A modern ORM for Node.js and TypeScript that simplifies database management with an intuitive query API and type safety.

- **JWT:** A compact, URL-safe token format used for securely transmitting authentication and authorization data between parties.

- **React 18:** The latest version of the React library with features like automatic batching, concurrent rendering, and improved server-side rendering for better performance.

- **Tailwind:** A utility-first CSS framework that enables rapid UI development with a highly customizable and composable approach.

- **DaisyUI:** A plugin for Tailwind CSS that provides pre-designed, customizable UI components to speed up frontend development.

## Installation & Configuration

Install npm packages for `backend` and `frontend` directories.

```bash
$ npm install
```

Fill up `.env` files.

`backend`:

```bash
# DATABASE
DATABASE_URL=

# APP
PORT=3333
AVATARS_API_URL="https://avatar.iran.liara.run/public"
CLIENT_URL=
JWT_SECRET=
NODE_ENV=development
```

`frontend`:

```bash
# APP
VITE_SERVER_URL=
```

## Running the app

```bash
$ npm run dev # same for both directories
```
