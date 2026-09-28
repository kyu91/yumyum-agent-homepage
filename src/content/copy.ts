export type Locale = "ko" | "en";

type Pair<T> = readonly [T, T];
type Quad<T> = readonly [T, T, T, T];

export type ClipKind = "capture" | "text" | "file";

type Clip = { label: string; prompt: string; reply: string };

export type Copy = {
  nav: { ariaLabel: string; howItWorks: string; agents: string; privacy: string; langAriaLabel: string; githubLabel: string; downloadLabel: string };
  cover: {
    tag: string;
    titleTop: string;
    titleAccent: string;
    subtitle: string;
    cta: string;
    ctaSigned: string;
  };
  feed: {
    instruction: string;
    exampleLabel: string;
    defaultBubble: string;
    draftLine: string;
    returnLabel: string;
    clips: Record<ClipKind, Clip>;
  };
  video: { heading: string; lead: string; openLabel: string; closeLabel: string; placeholder: string };
  howItWorks: {
    heading: string;
    lead: string;
    steps: Quad<{ title: string; description: string }>;
    notes: Pair<{ label: string; text: string }>;
  };
  agents: { heading: string; lead: string; disclaimer: string };
  privacy: {
    heading: string;
    lead: string;
    cards: Pair<{ title: string; description: string }>;
    soul: { title: string; before: string; after: string };
    bannerStrong: string;
    bannerRest: string;
  };
  install: {
    heading: string;
    steps: Pair<string>;
    releaseVerification: string;
    requirements: string;
    windowsNote: string;
    license: string;
  };
  footer: {
    heading: string;
    cta: string;
    tagline: string;
    attribution: string;
    attributionLink: string;
    blogLabel: string;
    disclaimer: string;
  };
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
    cover: {
      tag: "macOS 메뉴바 앱",
      titleTop: "화면을 먹이면",
      titleAccent: "대화가 됩니다",
      subtitle: "펫에게 캡처나 파일을 먹이면 이미 로그인해둔 로컬 AI CLI로 그대로 전달돼요. 답은 말풍선으로 돌아와요.",
      cta: "macOS용 DMG 받기",
      ctaSigned: "서명·공증 완료",
    },
    feed: {
      instruction: "스크랩을 펫 위로 끌어오거나 탭해서 먹여보세요.",
      exampleLabel: "예시 응답",
      defaultBubble: "아직 아무것도 안 먹었어요.",
      draftLine: "초안에 담았어요 · Return으로 보내기",
      returnLabel: "Return",
      clips: {
        capture: { label: "화면 캡처", prompt: "이 화면 좀 봐줘", reply: "오른쪽 위에 401 오류가 보여요. 인증 토큰부터 확인해보세요." },
        text: { label: "클립보드", prompt: "I love you", reply: "“널 사랑해”로 번역할 수 있어요." },
        file: { label: "PDF 파일", prompt: "이 PDF 요약해줘", reply: "12쪽짜리 계약서예요. 3조 해지 조항부터 보시는 게 좋겠어요." },
      },
    },
    video: {
      heading: "지켜봐",
      lead: "실제로 먹이고, 실제로 답을 받는 장면이에요.",
      openLabel: "소개 영상 크게 보기",
      closeLabel: "영상 닫기",
      placeholder: "영상 준비 중",
    },
    howItWorks: {
      heading: "방법",
      lead: "펫에게 건네는 건 짧게. 대화는 여러 턴으로 계속 이어져요.",
      steps: [
        { title: "캡처", description: "펫을 오른쪽 클릭해 화면 영역을 고르면 바로 전송돼요." },
        { title: "클립보드 먹이기", description: "왼쪽 클릭이나 기본 단축키 Option+S로 파일, 이미지, 텍스트 순서의 클립보드 내용을 채팅 초안에 담아요." },
        { title: "파일 드롭", description: "Finder에서 파일을 펫 위로 끌어놓거나 파일 선택창에서 첨부해요." },
        { title: "대화 UI", description: "여러 턴이 쌓이는 말풍선은 닫았다 열어도 그대로 남아요. 상세 채팅창은 Markdown을 스트리밍으로 보여줘요." },
      ],
      notes: [
        { label: "클립보드", text: "초안에 담긴 뒤 Return을 눌러야 전송돼요. 자동 전송은 없어요." },
        { label: "권한", text: "손쉬운 사용, 입력 모니터링, 화면 기록이 필요해요." },
      ],
    },
    agents: {
      heading: "골라",
      lead: "설치와 로그인은 각자 몫이에요. YumYum Agent는 이미 준비된 CLI에 연결만 해요.",
      disclaimer: "각 CLI는 따로 설치하고 로그인해야 해요. 이름과 로고는 호환성 설명용이며, 후원이나 보증을 뜻하지 않아요.",
    },
    privacy: {
      heading: "믿어도 돼",
      lead: "무엇을 먹일지는 당신이 정해요.",
      cards: [
        { title: "보내지 않는 것", description: "텔레메트리를 보내지 않고, Keychain이나 CLI 로그인 파일도 읽지 않아요." },
        { title: "고른 것만", description: "직접 고른 텍스트, 파일, 캡처만 선택한 CLI로 전달돼요." },
      ],
      soul: { title: "성격은 로컬에", before: "", after: "에 평문으로 저장되고, 새 세션 첫 프롬프트에만 들어가요." },
      bannerStrong: "지금은 분석과 대화만 해요.",
      bannerRest: " 에이전트가 시스템을 직접 바꾸는 기능은 없어요.",
    },
    install: {
      heading: "설치해",
      steps: [
        "1. DMG를 열고 YumYum.app을 Applications 폴더로 옮기세요.",
        "2. Applications 폴더에서 YumYum.app을 실행하세요.",
      ],
      releaseVerification: "이 릴리스는 Developer ID로 서명하고 Apple 공증까지 받았고, 공증 티켓도 DMG에 스테이플링했어요. GitHub Actions에서 앱과 DMG 모두 spctl(Gatekeeper) 평가를 통과했어요.",
      requirements: "macOS 14 이상 · arm64 + x86_64 유니버설 바이너리",
      windowsNote: "Windows 버전은 개발 중이에요.",
      license: "오픈소스, Apache License 2.0.",
    },
    footer: {
      heading: "받아",
      cta: "macOS용 DMG 받기",
      tagline: "오픈소스 macOS 앱 · Apache-2.0",
      attribution: "마스코트와 에이전트 아이콘은 앱 저장소에서 Apache-2.0 라이선스로 가져왔어요.",
      attributionLink: "아이콘 출처 보기",
      blogLabel: "만든 이야기",
      disclaimer: "실제 인텔 하드웨어에서의 실행과, 새 맥에서 DMG를 받아 처음 켜는 과정은 아직 검증되지 않았어요.",
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
    cover: {
      tag: "macOS menu bar app",
      titleTop: "Feed it your screen,",
      titleAccent: "get a conversation.",
      subtitle: "Feed the pet a capture or a file and it goes straight to the local AI CLI you're already signed in to. The answer comes back as a speech bubble.",
      cta: "Get the DMG for macOS",
      ctaSigned: "signed & notarized",
    },
    feed: {
      instruction: "Drag a scrap onto the pet, or just tap it, to feed it.",
      exampleLabel: "Example reply",
      defaultBubble: "Nothing fed yet.",
      draftLine: "Added to draft · press Return to send",
      returnLabel: "Return",
      clips: {
        capture: { label: "Screen capture", prompt: "Take a look at this screen", reply: "There's a 401 error top right — check the auth token first." },
        text: { label: "Clipboard", prompt: "널 사랑해", reply: "I can translate this as “I love you.”" },
        file: { label: "PDF file", prompt: "Summarize this PDF", reply: "It's a 12-page contract. Start with the termination clause in section 3." },
      },
    },
    video: {
      heading: "Watch",
      lead: "Real feeding, real replies, straight from the app.",
      openLabel: "Play intro video full size",
      closeLabel: "Close video",
      placeholder: "Video coming soon",
    },
    howItWorks: {
      heading: "Ways",
      lead: "Keep what you hand the pet short. The conversation runs across turns.",
      steps: [
        { title: "Capture", description: "Right-click the pet, pick a screen region, and it's sent right away." },
        { title: "Feed the clipboard", description: "Left-click, or press the default shortcut Option+S, to put clipboard content — file, then image, then text — into the chat draft." },
        { title: "Drop a file", description: "Drag a file from Finder onto the pet, or attach it from the file picker." },
        { title: "The reply UI", description: "A bubble that stacks up across turns survives closing and reopening. The detail chat window streams Markdown." },
      ],
      notes: [
        { label: "Clipboard", text: "It lands in the draft — you press Return to actually send. Nothing sends automatically." },
        { label: "Permissions", text: "Needs Accessibility, Input Monitoring, and Screen Recording." },
      ],
    },
    agents: {
      heading: "Choose",
      lead: "Installing and signing in is on you. YumYum Agent just connects to the CLI you already set up.",
      disclaimer: "You install and sign in to each CLI separately. Names and logos are used only to describe compatibility — not sponsorship or endorsement.",
    },
    privacy: {
      heading: "Trust it",
      lead: "You decide what gets fed.",
      cards: [
        { title: "What it never sends", description: "No telemetry, and it never reads your Keychain or CLI login files." },
        { title: "Only what you pick", description: "Only the text, files, and captures you choose go to the CLI you selected." },
      ],
      soul: { title: "Personality stays local", before: "Stored in plain text at ", after: ", injected only into the first prompt of a new session." },
      bannerStrong: "Right now it's analysis and chat only.",
      bannerRest: " The agent has no ability to change your system directly.",
    },
    install: {
      heading: "Install",
      steps: [
        "1. Open the DMG and move YumYum.app into Applications.",
        "2. Launch YumYum.app from the Applications folder.",
      ],
      releaseVerification: "This release is Developer ID signed and Apple-notarized, with the ticket stapled to the DMG. In GitHub Actions, both the app and DMG passed spctl (Gatekeeper) assessment.",
      requirements: "macOS 14+ · arm64 + x86_64 universal binary",
      windowsNote: "A Windows version is in development.",
      license: "Open source, Apache License 2.0.",
    },
    footer: {
      heading: "Get it",
      cta: "Get the DMG for macOS",
      tagline: "Open-source macOS app · Apache-2.0",
      attribution: "The mascot and agent icons are reused from the app repository under Apache-2.0.",
      attributionLink: "Icon sources and rights",
      blogLabel: "Build notes",
      disclaimer: "Execution on real Intel hardware, and first launch after downloading the DMG on a separate clean Mac, remain unverified.",
    },
    meta: {
      title: "YumYum Agent — chat with local AI through a desktop pet",
      description: "A macOS app that feeds captures and files to a pet on your screen and shows answers from the local AI CLI you're already signed in to, in a native speech bubble and chat.",
      ogDescription: "Feed captures and files, and get answers from your local AI CLI in a native speech bubble.",
    },
  },
} satisfies Record<Locale, Copy>;
