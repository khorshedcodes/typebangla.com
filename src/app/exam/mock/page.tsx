import { redirect } from "next/navigation";

export default function MockExamRedirectPage() {
  redirect("/exam/govt");
}
