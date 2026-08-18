# YumYum Agent 소개 홈페이지 프로젝트

macOS 앱 **YumYum Agent**를 소개하는 랜딩/마케팅 홈페이지. 앱 자체 소스는 별도 레포([kyu91/yumyum-agent](https://github.com/kyu91/yumyum-agent))에 있고, 이 레포는 그 앱을 소개하는 웹사이트 전용이다. 앱 레포와 스택이 다르므로(Swift Package Manager vs Next.js) 절대 하나로 합치지 않는다.

도메인은 사용자가 직접 준비. 배포 대상(Vercel vs self-host)도 아직 미정 — 결정되면 이 문서의 "배포" 섹션을 채울 것.

## 기술 스택 (제안, 확정 아님)

haas-team의 다른 홈페이지 프로젝트(`02_wellos`, `01_reallawfirm`)와 동일한 스택을 기본값으로 제안한다. 사용자가 다른 걸 원하면 이 섹션을 교체한다.

- **Framework**: Next.js (App Router), TypeScript
- **Styling**: Tailwind CSS **v3** — v4는 Vercel 프로덕션 빌드에서 `@theme` 커스텀 색상 유틸리티가 클래스를 생성하지 않는 문제가 wellos 프로젝트에서 실측됨. 새로 시작해도 v3로 고정할 것.
- **배포**: Vercel (GitHub 연동 자동 배포) 기본 제안. 대안으로 duncan-ubuntu 홈서버 + Cloudflare Tunnel 자체 호스팅도 가능 (haas.kr 패턴).
- **폼/문의가 필요하면**: Resend로 이메일 발송 (wellos 패턴 재사용 가능)

프로젝트 시작 시 `/init`으로 실제 구조가 잡히면 이 파일 상단에 `@AGENTS.md`를 추가하고, 빌드 명령·디렉터리 구조·컬러 시스템 등 실제 결정 사항을 AGENTS.md로 옮기는 걸 권장 (wellos 레포 패턴).

## 제품 사실 — 카피 작성 시 이 섹션을 근거로 삼을 것

앱을 잘 모르고 이 레포에 들어온 세션이 기능을 지어내지 않도록, 정확한 사실만 정리한다. **더 최신/정확한 내용이 필요하면 추측하지 말고 앱 레포(`kyu91/yumyum-agent`)의 `README.md`, `AGENTS.md`, `docs/product-spec.md`를 직접 확인할 것** — 이 문서는 스냅샷이라 시간이 지나면 어긋날 수 있다.

### 한 줄 소개

화면 위를 돌아다니는 캐릭터(펫)에게 화면 캡처나 파일을 "먹이면", 이미 로그인된 로컬 AI CLI(Hermes, OpenCode, Codex, Claude Code)에게 그대로 전달하고 응답을 네이티브 말풍선/채팅으로 보여주는 macOS 메뉴바 앱.

### 핵심 동작

- **캡처**: 펫 오른쪽 클릭 → 액션 메뉴 → 화면 영역 캡처, 즉시 전송.
- **클립보드 먹이기**: 펫 왼쪽 클릭 또는 전역 단축키(기본 `Option+S`, 원하는 키 조합으로 직접 녹화해서 변경 가능)로 클립보드 내용(파일 > 이미지 > 텍스트 우선순위)을 채팅 초안에 담고, Return을 눌러야 실제 전송됨 — 자동 전송 없음.
- **파일 선택/드롭**: Finder에서 파일을 펫에 드래그하거나 파일 선택창으로 첨부.
- **응답 UI**: 컴팩트 말풍선은 여러 턴이 쌓이는 스크롤 가능한 대화 형태로, 닫았다 다시 열어도 대화가 유지되고 상세 채팅창에서 "새 세션"을 눌러야 초기화됨. 상세 채팅창은 전체 대화 기록 + Markdown 렌더링(스트리밍 중에도 안전).
- **전역 단축키가 다른 앱 포커스 중에도 동작**하려면 macOS 손쉬운 사용(Accessibility) + 입력 모니터링(Input Monitoring) 권한이 필요하고, 화면 캡처에는 화면 기록(Screen Recording) 권한이 필요. 앱이 권한 상태를 실행마다 확인해서 안 준 게 있으면 안내 창을 다시 띄움.

### 지원 에이전트 (사용자가 각자 별도로 설치·로그인)

| CLI | 비고 |
|---|---|
| Hermes | ACP(Agent Client Protocol) v1 |
| OpenCode | `opencode run --pure --format json` |
| Codex | ChatGPT 로그인 필요, read-only sandbox |
| Claude Code | plan permission mode |

YumYum Agent는 이 CLI들의 로그인·네트워크·모델 처리에 관여하지 않는다. 상표명은 호환성 설명용으로만 쓰고 후원/보증 관계 아님을 카피에 명시할 것.

### 프라이버시 (마케팅 포인트로 쓰기 좋음)

- 텔레메트리 전송 없음, Keychain·CLI 로그인 파일을 읽지 않음.
- 사용자가 명시적으로 선택한 텍스트/파일/캡처만 선택한 CLI로 전달.
- "Soul"이라는 캐릭터 성격 설정을 `~/Library/Application Support/YumYum/SOUL.md`에 평문으로 저장, 새 세션 첫 프롬프트에만 주입.
- **현재는 분석/채팅 전용** — 에이전트가 사용자 시스템에 실제 변경을 가하는 기능은 아직 없음(안전장치가 기본 거부로 설계되어 있고 의도적으로 막아둔 상태). "AI가 알아서 뭘 실행한다"처럼 과장하지 말 것.

### 배포 상태 (카피에서 과장하지 말아야 할 것)

- 현재 배포: `kyu91/yumyum-agent` GitHub Releases의 macOS 유니버설(arm64 + x86_64) DMG. **미서명(Unsigned) 개발자 프리뷰 — Apple Developer ID 서명·공증 안 됨.** 설치 시 macOS Gatekeeper가 막으므로 "시스템 설정 → 개인정보 보호 및 보안 → Open Anyway" 안내가 필요. 카피에 "서명됨/notarized"라고 쓰지 말 것. 최신 버전은 레포 Releases 페이지에서 직접 확인 (이 문서에 버전 번호를 박아두지 않음 — 금방 stale해짐).
- App Store 배포·자동 업데이트 없음.
- Intel 하드웨어에서의 실제 검증, clean-machine Gatekeeper 동작은 아직 미검증 상태(README의 "Safety boundaries and limitations" 참고).
- macOS 14 이상 필요.
- 오픈소스, Apache License 2.0.
- Windows 버전 개발 중(미출시) — 다운로드 링크나 지원 플랫폼으로 취급하지 말고, "개발 중" 정도로만 짧게 언급할 것.

### 링크

- 앱 레포/다운로드: https://github.com/kyu91/yumyum-agent
- Releases: https://github.com/kyu91/yumyum-agent/releases

## 하지 말 것

- 앱 소스 코드를 이 레포로 옮기거나 서브모듈로 끌어오지 않는다 — 완전히 별도 프로젝트.
- 제품 사실 섹션에 없는 기능(예: 자동 실행, 클라우드 동기화, 팀 협업 등)을 카피에 지어내지 않는다. 확실하지 않으면 앱 레포 문서를 다시 확인하거나 사용자에게 물어본다.
- 실제 버전 번호나 스크린샷은 이 문서에 하드코딩하지 말고, 필요할 때 앱 레포에서 최신 걸 가져와서 쓴다.
