import { defineApp } from "convex/server";
import agent from "@convex-dev/agent/convex.config";
import migrations from "@convex-dev/migrations/convex.config";

const app = defineApp();
app.use(agent);
app.use(migrations);

export default app;
