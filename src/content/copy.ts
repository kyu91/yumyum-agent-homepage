export type Locale = "ko" | "en";

type Pair<T> = readonly [T, T];
type Quad<T> = readonly [T, T, T, T];
type Triple<T> = readonly [T, T, T];

export type Copy = {
  nav: { ariaLabel: string; howItWorks: string; agents: string; privacy: string; langAriaLabel: string; githubLabel: string; downloadLabel: string };
  hero: {
    titleTop: string; titleAccent: string; subtitle: string; cta: string; versionSuffix: string;
    requirements: string; install: Triple<string>; localBadge: string;
  };
  howItWorks: {
    eyebrow: string; titleTop: string; titleBottom: string; lead: string;
    steps: Quad<{ title: string; description: string }>;
    notes: Pair<{ label: string; text: string }>;
  };
  agents: {
    eyebrow: string; titleTop: string; titleAccent: string; lead: string;
    details: Quad<string>; disclaimer: string;
  };
  demo: {
    eyebrow: string; titleTop: string; titleAccent: string; lead: string;
    clips: Triple<{ title: string; description: string }>;
    placeholder: string;
  };
  privacy: {
    eyebrow: string; titleTop: string; titleBottom: string;
    cards: Pair<{ title: string; description: string }>;
    soul: { title: string; before: string; after: string };
    bannerStrong: string; bannerRest: string;
  };
  footer: { tagline: string; attribution: string; attributionLink: string; disclaimer: string };
  meta: { title: string; description: string; ogDescription: string };
};

export const copy = {
  ko: {
    nav: {
      ariaLabel: "주요 메뉴",
      howItWorks: "작동 방식",
      agents: "에이전트",
      privacy: "프라이버시",
      langAriaLabel: "언어 선택",
      githubLabel: "GitHub 저장소",
      downloadLabel: "다운로드",
    },
    hero: {
      titleTop: "화면을 먹이고,",
      titleAccent: "대화를 이어가세요.",
      subtitle: "화면 캡처나 파일을 화면 위의 펫에게 먹이면, 이미 로그인한 로컬 AI CLI로 전달하고 답을 네이티브 말풍선과 채팅으로 보여줍니다.",
      cta: "macOS용 DMG 받기",
      versionSuffix: "최신 프리뷰",
      requirements: "macOS 14+ · Apple Silicon / Intel 유니버설",
      install: [
        "1. DMG를 열고 YumYum.app을 응용 프로그램으로 옮깁니다.",
        "2. 처음 실행이 막히면 시스템 설정 → 개인정보 보호 및 보안으로 이동합니다.",
        "3. “Open Anyway”를 눌러 실행합니다.",
      ],
      localBadge: "local CLI 연결",
    },
    howItWorks: {
      eyebrow: "작동 방식",
      titleTop: "먹이는 건 짧게,",
      titleBottom: "대화는 길게.",
      lead: "펫에게 건네는 입력은 단순하게. 응답은 여러 턴의 대화로 계속 이어집니다.",
      steps: [
        { title: "캡처", description: "펫을 오른쪽 클릭해 화면 영역을 고르면 즉시 전송합니다." },
        { title: "클립보드 먹이기", description: "왼쪽 클릭 또는 기본 전역 단축키 Option+S로 파일 > 이미지 > 텍스트 순서의 내용을 채팅 초안에 담습니다." },
        { title: "파일 드롭", description: "Finder에서 파일을 펫 위로 끌어놓거나 파일 선택창에서 첨부합니다." },
        { title: "응답 UI", description: "여러 턴이 쌓이는 스크롤 대화가 닫았다 다시 열어도 이어집니다. 상세 채팅창은 Markdown 스트리밍을 지원합니다." },
      ],
      notes: [
        { label: "클립보드:", text: "초안에 담긴 뒤 Return을 눌러야 실제 전송됩니다. 자동 전송은 없습니다." },
        { label: "권한:", text: "손쉬운 사용 + 입력 모니터링 · 화면 기록" },
      ],
    },
    agents: {
      eyebrow: "지원 에이전트",
      titleTop: "로그인은 각자,",
      titleAccent: "대화는 한곳에서.",
      lead: "YumYum Agent는 설치와 로그인에 관여하지 않습니다. 사용자가 준비한 로컬 CLI에 연결합니다.",
      details: ["ACP v1", "opencode run --pure --format json", "ChatGPT 로그인 필요 · read-only sandbox", "plan permission mode"],
      disclaimer: "각 CLI는 사용자가 별도로 설치하고 로그인해야 합니다. 이름과 상표는 호환성 설명을 위한 것이며, 후원이나 보증을 뜻하지 않습니다.",
    },
    demo: {
      eyebrow: "실제 사용 화면",
      titleTop: "설명을 읽는 것보다",
      titleAccent: "한 번 보는 게 빠릅니다.",
      lead: "실제 앱에서 클립보드를 먹이고, 파일을 떨어뜨리고, 질문에 답을 받는 장면입니다.",
      clips: [
        { title: "클립보드 먹이기", description: "복사한 텍스트나 이미지를 Option+S로 펫에게 건네고 Return으로 보냅니다." },
        { title: "파일 드롭", description: "Finder에서 파일을 끌어다 펫 위에 그대로 떨어뜨립니다." },
        { title: "질문하고 답 받기", description: "짧은 질문을 보내면 말풍선으로 답이 돌아옵니다." },
      ],
      placeholder: "영상 준비 중",
    },
    privacy: {
      eyebrow: "프라이버시",
      titleTop: "무엇을 먹일지는",
      titleBottom: "당신이 정합니다.",
      cards: [
        { title: "보내지 않는 것", description: "텔레메트리를 보내지 않고, Keychain이나 CLI 로그인 파일을 읽지 않습니다." },
        { title: "선택한 것만", description: "사용자가 명시적으로 선택한 텍스트, 파일, 캡처만 선택한 CLI로 전달합니다." },
      ],
      soul: {
        title: "캐릭터 성격은 로컬에",
        before: "",
        after: "에 평문으로 저장하고, 새 세션 첫 프롬프트에만 주입합니다.",
      },
      bannerStrong: "현재는 분석/채팅 전용입니다.",
      bannerRest: " 에이전트가 사용자 시스템에 실제 변경을 가하는 기능은 없습니다.",
    },
    footer: {
      tagline: "오픈소스 macOS 앱 · Apache-2.0",
      attribution: "Mascot와 agent icon은 앱 레포에서 Apache-2.0 라이선스로 재사용했습니다.",
      attributionLink: "아이콘 출처와 권리 안내 ↗",
      disclaimer: "Intel 하드웨어에서의 실행과 깨끗한 Mac에서의 Gatekeeper 동작은 아직 검증되지 않았습니다.",
    },
    meta: {
      title: "YumYum Agent — 화면 위 펫과 로컬 AI 대화",
      description: "화면 위 펫에게 캡처와 파일을 먹이면 이미 로그인한 로컬 AI CLI의 답을 네이티브 말풍선과 채팅으로 보여주는 macOS 앱.",
      ogDescription: "캡처와 파일을 먹이고, 로컬 AI CLI의 답을 네이티브 말풍선으로 받으세요.",
    },
  },
  en: {
    nav: {
      ariaLabel: "Main menu",
      howItWorks: "How it works",
      agents: "Agents",
      privacy: "Privacy",
      langAriaLabel: "Language",
      githubLabel: "GitHub repository",
      downloadLabel: "Download",
    },
    hero: {
      titleTop: "Feed it your screen,",
      titleAccent: "keep the conversation going.",
      subtitle: "Feed a screen capture or a file to the pet on your desktop, and it hands them to the local AI CLI you are already signed in to — answers come back in a native speech bubble and chat.",
      cta: "Download the DMG for macOS",
      versionSuffix: "latest preview",
      requirements: "macOS 14+ · Apple Silicon / Intel universal",
      install: [
        "1. Open the DMG and move YumYum.app into Applications.",
        "2. If the first launch is blocked, go to System Settings → Privacy & Security.",
        "3. Click \"Open Anyway\" to launch it.",
      ],
      localBadge: "local CLI connected",
    },
    howItWorks: {
      eyebrow: "How it works",
      titleTop: "Feeding takes a second.",
      titleBottom: "The conversation keeps going.",
      lead: "Keep what you hand the pet simple. Answers continue across multiple turns.",
      steps: [
        { title: "Capture", description: "Right-click the pet, pick a screen region, and it is sent right away." },
        { title: "Feed the clipboard", description: "Left-click, or press the default global shortcut Option+S, to put clipboard content — file, then image, then text — into the chat draft." },
        { title: "Drop a file", description: "Drag a file from Finder onto the pet, or attach it from the file picker." },
        { title: "Answer UI", description: "A scrolling conversation stacks up across turns and survives closing and reopening. The detail chat window renders streaming Markdown." },
      ],
      notes: [
        { label: "Clipboard:", text: "It lands in the draft; you press Return to actually send. Nothing is sent automatically." },
        { label: "Permissions:", text: "Accessibility + Input Monitoring · Screen Recording" },
      ],
    },
    agents: {
      eyebrow: "Supported agents",
      titleTop: "Sign in separately,",
      titleAccent: "chat in one place.",
      lead: "YumYum Agent does not handle installing or signing in. It connects to the local CLIs you set up yourself.",
      details: ["ACP v1", "opencode run --pure --format json", "ChatGPT sign-in required · read-only sandbox", "plan permission mode"],
      disclaimer: "You install and sign in to each CLI separately. Names and trademarks are used only to describe compatibility and do not imply sponsorship or endorsement.",
    },
    demo: {
      eyebrow: "See it in action",
      titleTop: "Quicker to watch",
      titleAccent: "than to read about.",
      lead: "Straight from the app: feeding the clipboard, dropping a file, and asking a quick question.",
      clips: [
        { title: "Feed the clipboard", description: "Hand copied text or an image to the pet with Option+S, then press Return to send." },
        { title: "Drop a file", description: "Drag a file from Finder and drop it right onto the pet." },
        { title: "Ask a question", description: "Send a short question and the answer comes back in a speech bubble." },
      ],
      placeholder: "Video coming soon",
    },
    privacy: {
      eyebrow: "Privacy",
      titleTop: "You decide",
      titleBottom: "what gets fed.",
      cards: [
        { title: "What it never sends", description: "It sends no telemetry and never reads your Keychain or CLI login files." },
        { title: "Only what you pick", description: "Only the text, files, and captures you explicitly choose are passed to the CLI you selected." },
      ],
      soul: {
        title: "The character personality stays local",
        before: "Stored in plain text at ",
        after: ", injected only into the first prompt of a new session.",
      },
      bannerStrong: "Right now it is analysis and chat only.",
      bannerRest: " The agent has no ability to make actual changes to your system.",
    },
    footer: {
      tagline: "Open-source macOS app · Apache-2.0",
      attribution: "The mascot and agent icons are reused from the app repository under Apache-2.0.",
      attributionLink: "Icon sources and rights ↗",
      disclaimer: "Running on Intel hardware and Gatekeeper behavior on a clean Mac have not been verified yet.",
    },
    meta: {
      title: "YumYum Agent — chat with local AI through a desktop pet",
      description: "A macOS app that feeds captures and files to a pet on your screen and shows answers from the local AI CLI you are already signed in to in a native speech bubble and chat.",
      ogDescription: "Feed captures and files, and get answers from your local AI CLI in a native speech bubble.",
    },
  },
} satisfies Record<Locale, Copy>;
