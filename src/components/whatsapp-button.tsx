import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export function WhatsAppButton({
  phoneNumber = "917842951590",
  defaultMessage = "Hello SVS Nutraceuticals, I would like to inquire about your nutraceutical ingredients.",
}: WhatsAppButtonProps) {
  const encodedMessage = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <aside
      aria-label="Contact via WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center group pointer-events-auto"
    >
      {/* Tooltip hint on hover */}
      <span className="hidden sm:inline-block mr-3 px-3 py-1.5 rounded-lg bg-forest-deep text-white text-xs font-medium shadow-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap border border-white/10">
        Chat on WhatsApp
      </span>

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with SVS Nutraceuticals on WhatsApp"
        className="relative flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20ba59] hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 cursor-pointer"
      >
        {/* Soft pulse animation effect */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping -z-10" />

        {/* WhatsApp Icon */}
        <svg
          viewBox="0 0 24 24"
          width="30"
          height="30"
          fill="currentColor"
          className="shrink-0"
        >
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.174L2 22l4.985-1.39A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.636 0-3.155-.49-4.43-1.332l-.318-.208-2.964.826.83-2.895-.228-.328A8.13 8.13 0 013.833 12c0-4.503 3.664-8.167 8.167-8.167 4.503 0 8.167 3.664 8.167 8.167 0 4.503-3.664 8.167-8.167 8.167z" />
          <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.476-.15-.677.15-.2.3-.777.98-.952 1.18-.175.2-.351.226-.652.076-.3-.15-1.267-.467-2.414-1.488-.893-.797-1.496-1.78-1.671-2.08-.176-.3-.019-.462.132-.612.136-.134.301-.35.452-.525.15-.176.2-.3.301-.5.1-.2.05-.376-.025-.526-.075-.15-.677-1.632-.927-2.235-.244-.588-.493-.508-.677-.518-.175-.008-.376-.01-.577-.01-.2 0-.526.076-.802.376-.276.3-1.053 1.03-1.053 2.512s1.078 2.912 1.228 3.113c.15.2 2.122 3.24 5.14 4.544.718.31 1.278.496 1.716.634.721.228 1.377.196 1.896.118.578-.088 1.78-.727 2.03-1.43.25-.702.25-1.303.176-1.43-.076-.126-.276-.201-.577-.351z" />
        </svg>
      </a>
    </aside>
  );
}
