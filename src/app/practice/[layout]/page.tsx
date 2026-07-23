import { redirect } from "next/navigation";

interface Props { params: Promise<{ layout: string }>; }

export default async function OldPracticeLayoutRedirect({ params }: Props) {
  const { layout } = await params;
  redirect(`/learn/${layout}`);
}
