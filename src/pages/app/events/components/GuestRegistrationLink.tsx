/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link2, Copy, TickCircle, GlobalRefresh } from "iconsax-react";
import toast from "react-hot-toast";
import { _handleThrowErrorMessage } from "../../../../utils";
import { appUrls } from "../../../../services/urls";
import { api } from "../../../../services/api";

interface GuestRegistrationLinkProps {
  eventId: string;
}

type LinkStatus = "idle" | "generating" | "active";

export default function GuestRegistrationLink({
  eventId,
}: GuestRegistrationLinkProps) {
  const [status, setStatus] = useState<LinkStatus>("idle");
  const [registrationLink, setRegistrationLink] = useState("");
  const [copied, setCopied] = useState(false);

  const generateLink = async () => {
    setStatus("generating");
    setCopied(false);
    const payload = {
      eventId,
    };
    try {
      const { status, data } = await api.post(
        appUrls.GENERATE_GUEST_LINK_URL,
        payload,
      );
      const ticketId = data?.data;
      if ([200, 201].includes(status)) {
        setRegistrationLink(
          `https://www.eventcove.africa/events/guest/${ticketId}`,
        );
      }
      setStatus("active");
    } catch (error: any) {
      toast.error(_handleThrowErrorMessage(error?.data?.message));
      setStatus("idle");
    }
  };

  const copyLink = async () => {
    if (!registrationLink) return;
    try {
      await navigator.clipboard.writeText(registrationLink);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy link", error);
    }
  };

  return (
    <section className="w-full rounded-2xl border border-gray-100 bg-white p-2 shadow-sm">
      {/* Header */}
      <div>
        <h2 className="text-sm font-semibold tracking-tight text-gray-800">
          Generate a guest registration link
        </h2>

        <p className="text-sm text-gray-500">
          Create a one-time link for a guest to register for your event.
        </p>
      </div>

      <button
        type="button"
        onClick={generateLink}
        disabled={status === "generating"}
        className="mt-2 inline-flex items-center gap-3 rounded-xl bg-primary_100 p-2 text-sm font-medium text-white shadow-sm
            transition
            hover:bg-[#a8005a]
            focus:outline-none
            focus:ring-2 focus:ring-[#bd0066]/30
            disabled:cursor-not-allowed
            disabled:opacity-70"
      >
        {status === "generating" ? (
          <GlobalRefresh size={22} variant="Linear" className="animate-spin" />
        ) : (
          <Link2 size={22} variant="Linear" />
        )}

        {status === "generating"
          ? "Generating link..."
          : "Generate one-time link"}
      </button>

      {/* Generated link */}
      {status === "active" && registrationLink && (
        <div className="mt-2">
          <div
            className="
              flex items-center gap-4
              rounded-2xl
              border border-dashed border-gray-400
              bg-pink-50/70 p-5"
          >
            <p
              className="
                min-w-0 flex-1
                break-all
                text-sm font-medium
                leading-7
                text-[#bd0066]
              "
            >
              {registrationLink}
            </p>
            {copied ? (
              <TickCircle
                size={20}
                variant="Bold"
                className="text-primary_100"
              />
            ) : (
              <Copy
                onClick={copyLink}
                size={20}
                variant="Linear"
                className="text-primary_100"
              />
            )}
          </div>

          {copied && (
            <p className="mt-2 text-sm font-medium text-green-600">
              Registration link copied!
            </p>
          )}
        </div>
      )}
    </section>
  );
}
