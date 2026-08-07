import { redirect } from "next/navigation";

interface Props { params: Promise<{ layout: string }>; }

export default async function PracticeLayoutRedirect({ params }: Props) {
  const { layout } = await params;
  redirect(`/practice?layout=${layout}`);
}
