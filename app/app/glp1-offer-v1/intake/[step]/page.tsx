import IntakeRouter from "./IntakeRouter";

const VALID_STEPS = [
  "height-weight",
  "weight-goal",
  "gender",
  "priorities",
  "speed",
  "results",
] as const;

export function generateStaticParams() {
  return VALID_STEPS.map((step) => ({ step }));
}

export default async function StepPage({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const { step } = await params;
  return <IntakeRouter step={step} />;
}
