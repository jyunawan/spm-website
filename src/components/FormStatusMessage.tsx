import { AlertCircle, CheckCircle2 } from "lucide-react";

export type FormStatus = "idle" | "sending" | "success" | "error";

type Props = {
  message: string;
  status: FormStatus;
  successTitle: string;
  errorTitle: string;
};

function FormStatusMessage({
  message,
  status,
  successTitle,
  errorTitle,
}: Props) {
  if (status === "idle" || status === "sending" || !message) {
    return null;
  }

  const isSuccess = status === "success";
  const Icon = isSuccess ? CheckCircle2 : AlertCircle;

  return (
    <div
      className={[
        "flex items-start gap-3 border p-4",
        isSuccess
          ? "border-green-700/25 bg-green-50 text-green-900"
          : "border-indocoat-red/30 bg-red-50 text-indocoat-red-dark",
      ].join(" ")}
      role="status"
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <div>
        <p className="text-sm font-black uppercase tracking-[0.12em]">
          {isSuccess ? successTitle : errorTitle}
        </p>
        <p className="mt-1 text-sm leading-6">{message}</p>
      </div>
    </div>
  );
}

export default FormStatusMessage;
