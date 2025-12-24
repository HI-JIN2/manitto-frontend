export const metadata = {
  title: "개인정보처리방침 | 마니또 파티",
  description: "마니또 파티 개인정보처리방침 안내",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3 rounded-2xl border border-white/10 bg-surface/60 p-5 sm:p-6">
        <h1 className="text-2xl font-semibold sm:text-3xl">개인정보처리방침</h1>
        <p className="text-sm text-muted sm:text-base">
          마니또 파티(이하 “서비스”)는 이용자의 개인정보를 중요하게 생각하며,
          「개인정보 보호법」 등 관련 법령을 준수합니다. 본 개인정보처리방침은
          서비스 이용과 관련하여 수집하는 개인정보의 항목, 이용 목적, 보관 및
          파기 등에 대해 안내합니다.
        </p>
        <div className="mt-6 space-y-6">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold sm:text-xl">1. 수집하는 개인정보 항목</h2>
            <p className="text-sm text-muted sm:text-base">
              서비스는 회원가입 없이 이용 가능하며, 마니또 파티 생성 및 참여를 위해
              아래 정보만을 최소한으로 수집합니다.
            </p>
            <div className="space-y-3 text-sm text-muted sm:text-base">
              <div>
                <p className="font-semibold text-foreground">① 마니또 파티 참여 시</p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>이름</li>
                  <li>이메일 주소</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-foreground">② 계정 생성(선택 시)</p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>Google 계정 이메일 주소</li>
                </ul>
                <p className="mt-2 text-xs text-muted sm:text-sm">
                  ※ 비밀번호는 직접 수집하거나 저장하지 않습니다.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold sm:text-xl">2. 개인정보 수집 및 이용 목적</h2>
            <p className="text-sm text-muted sm:text-base">
              수집한 개인정보는 다음 목적에 한하여 사용됩니다.
            </p>
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted sm:text-base">
              <li>마니또 파티 참여자 식별</li>
              <li>마니또 배정 결과 안내 이메일 발송</li>
              <li>파티 참여 이력 관리 (로그인 이용 시)</li>
              <li>서비스 운영 및 오류 대응</li>
            </ul>
            <p className="text-sm text-muted sm:text-base">
              수집된 개인정보는 마니또 파티 운영 외의 목적으로 사용되지 않습니다.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold sm:text-xl">3. 개인정보 보관 및 이용 기간</h2>
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted sm:text-base">
              <li>마니또 파티 종료 후, 관련 개인정보는 일정 기간 보관 후 파기됩니다.</li>
              <li>
                로그인 계정을 생성한 경우, 이용자가 계정 삭제를 요청할 때까지
                보관됩니다.
              </li>
              <li>
                법령에 따라 보관이 필요한 경우 해당 법령에서 정한 기간 동안 보관할 수
                있습니다.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold sm:text-xl">4. 개인정보의 제3자 제공</h2>
            <p className="text-sm text-muted sm:text-base">
              서비스는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다.
              다만, 아래의 경우에는 예외로 합니다.
            </p>
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted sm:text-base">
              <li>이용자가 사전에 동의한 경우</li>
              <li>법령에 따라 제공이 요구되는 경우</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold sm:text-xl">5. 개인정보 처리 위탁</h2>
            <p className="text-sm text-muted sm:text-base">
              서비스 운영을 위해 다음과 같은 외부 서비스를 이용할 수 있습니다.
            </p>
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted sm:text-base">
              <li>이메일 발송 서비스</li>
              <li>클라우드 서버 제공 업체</li>
            </ul>
            <p className="text-sm text-muted sm:text-base">
              이 경우, 개인정보 보호 관련 법령을 준수하며 필요한 범위 내에서만
              위탁합니다.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold sm:text-xl">6. 이용자의 권리</h2>
            <p className="text-sm text-muted sm:text-base">
              이용자는 언제든지 다음 권리를 행사할 수 있습니다.
            </p>
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted sm:text-base">
              <li>개인정보 열람 요청</li>
              <li>개인정보 수정 및 삭제 요청</li>
              <li>개인정보 처리 중단 요청</li>
            </ul>
            <p className="text-sm text-muted sm:text-base">
              관련 요청은 서비스 내 문의 수단을 통해 접수할 수 있습니다.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold sm:text-xl">7. 개인정보 보호를 위한 조치</h2>
            <p className="text-sm text-muted sm:text-base">
              서비스는 개인정보 보호를 위해 다음과 같은 조치를 취하고 있습니다.
            </p>
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted sm:text-base">
              <li>최소한의 개인정보만 수집</li>
              <li>접근 권한 제한</li>
              <li>보안 설정을 통한 데이터 보호</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold sm:text-xl">8. 개인정보처리방침 변경</h2>
            <p className="text-sm text-muted sm:text-base">
              본 개인정보처리방침은 관련 법령 또는 서비스 변경에 따라 수정될 수 있으며,
              변경 시 서비스 내 공지를 통해 안내합니다.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold sm:text-xl">9. 문의</h2>
            <div className="space-y-1 text-sm text-muted sm:text-base">
              <p>서비스명: 마니또 파티</p>
              <p>운영자: 유진</p>
              <p>문의: manitto.party@gmail.com</p>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
