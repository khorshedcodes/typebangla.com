import { redirect } from "next/navigation";
import { KeyboardLayout } from "../../../store/typingStore";

interface Props {
  params: Promise<{ layout: string }>;
}

export default async function LearnLayoutPage({ params }: Props) {
  const { layout } = await params;
  // Serve the same LayoutPracticeClient — just at /learn/[layout]
  const { default: LayoutPracticeClient } = await import(
    "../../practice/[layout]/LayoutPracticeClient"
  );
  const validLayouts: KeyboardLayout[] = ["avro", "unibijoy", "jatiya", "probhat", "inscript", "unicode", "english"];
  if (!validLayouts.includes(layout as KeyboardLayout)) redirect("/learn");
  return <LayoutPracticeClient layout={layout as KeyboardLayout} />;
}
