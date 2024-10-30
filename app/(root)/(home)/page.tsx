import { UserButton } from "@clerk/nextjs";
const originalWarn = console.warn;
const originalError = console.error;
if (process.env.NODE_ENV === 'production') {
  console.warn = () => {};
  console.error = () => {};
}

console.warn = (message, ...args) => {
  if (typeof message === "string" && message.includes("DialogContent")) {
    return;
  }
  originalWarn(message, ...args);
};

console.error = (message, ...args) => {
  if (typeof message === "string" && message.includes("DialogContent")) {
    return;
  }
  originalError(message, ...args);
};

export default function Home() {
  return (
    <div>
      <h1>Welcome to Clerk!</h1>
    </div>
  );
}





