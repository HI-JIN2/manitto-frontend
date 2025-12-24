export const metadata = {
  title: "이용약관 | 마니또 파티",
  description: "마니또 파티 이용약관 안내",
};

export default function TermsPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold sm:text-3xl">이용약관</h1>
        <p className="text-sm text-muted sm:text-base">
          본 약관은 마니또 파티(이하 “서비스”)가 제공하는 서비스의 이용과 관련하여
          서비스와 이용자 간의 권리·의무 및 책임 사항을 규정합니다.
        </p>
      </section>

      <section className="space-y-3 rounded-2xl border border-white/10 bg-surface/60 p-5 sm:p-6">
        <h2 className="text-lg font-semibold sm:text-xl">제1조 (목적)</h2>
        <p className="text-sm text-muted sm:text-base">
          본 약관은 서비스 이용과 관련하여 서비스와 이용자 간의 기본적인 사항을
          정하는 것을 목적으로 합니다.
        </p>
      </section>

      <section className="space-y-3 rounded-2xl border border-white/10 bg-surface/60 p-5 sm:p-6">
        <h2 className="text-lg font-semibold sm:text-xl">제2조 (서비스 내용)</h2>
        <p className="text-sm text-muted sm:text-base">
          서비스는 다음 기능을 제공합니다.
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted sm:text-base">
          <li>마니또 파티 생성</li>
          <li>참여자 초대 및 참여</li>
          <li>마니또 자동 배정</li>
          <li>이메일을 통한 마니또 결과 안내</li>
        </ul>
        <p className="text-sm text-muted sm:text-base">
          서비스는 회원가입 없이도 이용할 수 있으며, 일부 기능은 로그인 이용자에게
          제공될 수 있습니다.
        </p>
      </section>

      <section className="space-y-3 rounded-2xl border border-white/10 bg-surface/60 p-5 sm:p-6">
        <h2 className="text-lg font-semibold sm:text-xl">제3조 (이용자의 의무)</h2>
        <p className="text-sm text-muted sm:text-base">
          이용자는 다음 행위를 해서는 안 됩니다.
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted sm:text-base">
          <li>타인의 개인정보를 무단으로 사용하거나 허위 정보를 입력하는 행위</li>
          <li>서비스 운영을 방해하는 행위</li>
          <li>법령 또는 공공질서에 위반되는 행위</li>
        </ul>
      </section>

      <section className="space-y-3 rounded-2xl border border-white/10 bg-surface/60 p-5 sm:p-6">
        <h2 className="text-lg font-semibold sm:text-xl">제4조 (서비스 이용 제한)</h2>
        <p className="text-sm text-muted sm:text-base">
          서비스는 다음 경우 이용을 제한할 수 있습니다.
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted sm:text-base">
          <li>약관 위반 행위가 확인된 경우</li>
          <li>시스템 장애 또는 점검이 필요한 경우</li>
          <li>기타 서비스 운영이 어렵다고 판단되는 경우</li>
        </ul>
      </section>

      <section className="space-y-3 rounded-2xl border border-white/10 bg-surface/60 p-5 sm:p-6">
        <h2 className="text-lg font-semibold sm:text-xl">제5조 (책임의 제한)</h2>
        <p className="text-sm text-muted sm:text-base">
          서비스는 마니또 파티 운영을 보조하는 도구이며, 참여자 간 발생하는 문제에
          대해 책임을 지지 않습니다.
        </p>
        <p className="text-sm text-muted sm:text-base">
          서비스는 무료로 제공되며, 서비스 이용으로 발생한 손해에 대해 법령에서
          허용하는 범위 내에서 책임을 제한합니다.
        </p>
      </section>

      <section className="space-y-3 rounded-2xl border border-white/10 bg-surface/60 p-5 sm:p-6">
        <h2 className="text-lg font-semibold sm:text-xl">제6조 (서비스 변경 및 종료)</h2>
        <p className="text-sm text-muted sm:text-base">
          서비스는 운영상 또는 기술상 필요에 따라 서비스의 일부 또는 전부를
          변경·종료할 수 있습니다.
        </p>
      </section>

      <section className="space-y-3 rounded-2xl border border-white/10 bg-surface/60 p-5 sm:p-6">
        <h2 className="text-lg font-semibold sm:text-xl">제7조 (약관 변경)</h2>
        <p className="text-sm text-muted sm:text-base">
          본 약관은 필요 시 변경될 수 있으며, 변경 사항은 서비스 내 공지를 통해
          안내합니다.
        </p>
      </section>

      <section className="space-y-3 rounded-2xl border border-white/10 bg-surface/60 p-5 sm:p-6">
        <h2 className="text-lg font-semibold sm:text-xl">제8조 (준거법)</h2>
        <p className="text-sm text-muted sm:text-base">
          본 약관은 대한민국 법령을 준거법으로 합니다.
        </p>
      </section>

      <section className="space-y-3 rounded-2xl border border-white/10 bg-surface/60 p-5 sm:p-6">
        <h2 className="text-lg font-semibold sm:text-xl">부칙</h2>
        <p className="text-sm text-muted sm:text-base">
          본 약관은 2025년 12월 24일부터 적용됩니다.
        </p>
      </section>
    </div>
  );
}
