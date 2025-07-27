import { Modal } from "@/shared/ui/modal";
import { Mail, Phone, X } from "lucide-react";
import Link from "next/link";

export const FamilyContactInfoModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const ContactRow = ({
    role,
    name,
    phone,
  }: {
    role: string;
    name: string;
    phone: string;
  }) => (
    <div className="flex items-center">
      <div className="w-24 text-gray-300 text-left text-sm">{role}</div>
      <div className="flex-1 text-center">
        <span className="text-white font-medium">{name}</span>
      </div>
      <div className="w-12 flex justify-center gap-2">
        <button
          className="p-1 hover:bg-gray-700 rounded transition-colors"
          aria-label="전화번호 연결"
        >
          <Link href={`tel:${phone}`}>
            <Phone className="w-5 h-5 text-gray-300" />
          </Link>
        </button>
        <button
          className="p-1 hover:bg-gray-700 rounded transition-colors"
          aria-label="SMS 연결"
        >
          <Link href={`sms:${phone}`}>
            <Mail className="w-5 h-5 text-gray-300" />
          </Link>
        </button>
      </div>
    </div>
  );

  const ContactSection = ({
    title,
    subtitle,
    contacts,
  }: {
    title: string;
    subtitle: string;
    contacts: Array<{ role: string; name: string; phone: string }>;
  }) => (
    <div>
      <div className="border-b border-dotted border-gray-600 pb-2 text-center flex items-end gap-2 mb-2">
        <h3 className="text-white text-lg">{title}</h3>
        <p className="text-gray-400 text-sm">{subtitle}</p>
      </div>
      <div className=" space-y-3">
        {contacts.map((contact, index) => (
          <ContactRow key={index} {...contact} />
        ))}
      </div>
    </div>
  );

  const groomContacts = [
    { role: "신랑", name: "김태수", phone: "010-1234-5678" },
    { role: "신랑 아버지", name: "김종덕", phone: "010-2345-6789" },
    { role: "신랑 어머니", name: "김미희", phone: "010-3456-7890" },
  ];

  const brideContacts = [
    { role: "신부", name: "박지영", phone: "010-8765-4321" },
    { role: "신부 아버지", name: "박호경", phone: "010-7654-3210" },
    { role: "신부 어머니", name: "오주영", phone: "010-6543-2109" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeButtonIcon={<X className="w-5 h-5 text-white" />}
    >
      <div className="bg-gray-800 rounded-lg max-w-md w-full p-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <p className="text-gray-400 text-sm">CONTACT</p>
          <h2 className="text-white text-2xl font-bold">연락하기</h2>
        </div>

        <div className="space-y-8">
          {/* 신랑측 */}
          <ContactSection
            title="신랑측"
            subtitle="GROOM"
            contacts={groomContacts}
          />

          {/* 신부측 */}
          <ContactSection
            title="신부측"
            subtitle="BRIDE"
            contacts={brideContacts}
          />
        </div>
      </div>
    </Modal>
  );
};
