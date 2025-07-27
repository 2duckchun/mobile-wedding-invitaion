"use client";

import { CONTACT_INFO_ID } from "@/shared/constant";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Copy } from "lucide-react";

export const BlessingAccountView = () => {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("계좌번호가 복사되었습니다.");
    } catch {
      alert("복사 권한을 허용해 주세요.");
    }
  };

  const AccountItem = ({
    name,
    bank,
    accountNumber,
  }: {
    name: string;
    bank: string;
    accountNumber: string;
  }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
      <div className="flex items-center gap-3">
        <button
          onClick={() => copyToClipboard(accountNumber)}
          className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <Copy className="w-3 h-3 text-gray-500" />
        </button>
        <span className="text-gray-800 font-medium">{name}</span>
      </div>
      <div className="text-right">
        <div className="text-sm text-gray-600">{bank}</div>
        <div className="text-sm font-medium text-gray-800">{accountNumber}</div>
      </div>
    </div>
  );

  const AccountSection = ({
    accounts,
  }: {
    accounts: Array<{ name: string; bank: string; accountNumber: string }>;
  }) => (
    <div className="space-y-2">
      {accounts.map((account, index) => (
        <AccountItem key={index} {...account} />
      ))}
    </div>
  );

  const groomAccounts = [
    { name: "김태수", bank: "국민은행", accountNumber: "25050104195443" },
    { name: "김종덕", bank: "농협", accountNumber: "11112479138" },
    { name: "김미희", bank: "신한은행", accountNumber: "110372185492" },
  ];

  const brideAccounts = [
    { name: "박지영", bank: "농협", accountNumber: "3560580360753" },
    { name: "박호경", bank: "신한은행", accountNumber: "110135127600" },
    { name: "오주영", bank: "기업은행", accountNumber: "01032174209" },
  ];

  return (
    <article
      className="w-full max-w-lg mx-auto font-gowundodum"
      id={CONTACT_INFO_ID}
    >
      <h3 className="mb-8 text-center text-xl tracking-wide">마음 전하실 곳</h3>
      <div className="mb-4 text-sm text-gray-500 text-center space-y-2">
        <p>
          멀리서도 축하의 안내를 보내주실 분을 위해 <br /> 계좌번호를
          안내드립니다.
        </p>
        <p>따뜻한 마음에 진심으로 감사드립니다.</p>
      </div>
      <Accordion type="multiple" className="space-y-4">
        <AccordionItem
          value="groom"
          className="border border-gray-200 rounded-lg"
        >
          <AccordionTrigger className="px-4 py-3 font-medium text-gray-800">
            신랑측
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <AccountSection accounts={groomAccounts} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="bride"
          className="border border-gray-200 rounded-lg"
        >
          <AccordionTrigger className="px-4 py-3 font-medium text-gray-800">
            신부측
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <AccountSection accounts={brideAccounts} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </article>
  );
};
