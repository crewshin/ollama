import { createFileRoute } from "@tanstack/react-router";
import { SidebarLayout } from "@/components/layout/layout";
import { ChatSidebar } from "@/components/ChatSidebar";
import Code from "@/components/Code";

export const Route = createFileRoute("/code")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarLayout sidebar={<ChatSidebar activeSection="code" />}>
      <Code />
    </SidebarLayout>
  );
}
