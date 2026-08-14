import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ layout: string }>;
}

export default async function LearnLayoutRedirect({ params }: Props) {
  const { layout } = await params;
  redirect(`/courses/${layout}`);
}
