import Chat from "@/components/Chat";

export default function Code() {
  // The Code workspace reuses the chat interface, with the working-directory
  // selector surfaced in the bottom-left of the message input.
  return <Chat chatId="new" showWorkingDir />;
}
