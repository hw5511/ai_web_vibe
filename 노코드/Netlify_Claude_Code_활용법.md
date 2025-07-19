# Netlify + Claude Code 활용법 가이드 (2025)

## 사전 준비사항

다음 정보를 미리 준비해주세요:

1. **Netlify Personal Access Token (Windows 환경에서 권장)**
   - Windows + Claude Code 환경에서는 토큰 사용을 강력히 권장
   - 토큰 없이 시도해보고, 인증 문제 발생 시 필수로 설정
   
   **토큰 발급 방법:**
   - https://app.netlify.com 로그인
   - 대시보드 좌하단 사용자 아이콘 클릭
   - **User settings** → **OAuth** 메뉴 이동  
   - "**New access token**" 클릭하여 새 토큰 생성
   - 생성된 토큰을 즉시 복사하여 안전한 곳에 저장
   - ⚠️ **중요**: 이 토큰은 Git 저장소에 절대 커밋하면 안됨
   - 예시 형태: `nfp_3ibZtJTHwFspd8GLGCinWwMVsS7JUoA44477`

2. **Node.js 버전 확인**
   - Node.js 22 이상 권장
   - `node --version`으로 확인

## Claude Code에게 전달할 Netlify MCP 설치 프롬프트

아래 프롬프트를 복사해서 Claude Code에게 전달하면 Netlify MCP 서버를 자동으로 설치해줍니다. 
**먼저 위에서 설명한 방법으로 Personal Access Token을 발급받은 후** `YOUR_NETLIFY_TOKEN`을 실제 토큰 값으로 교체하세요:

 

**Claude Code 설치 프롬프트:**

```
Windows 환경에서 Netlify MCP 서버를 설치해줘. 다음과 같이 진행해줘:

1. 먼저 Netlify CLI가 설치되어 있는지 확인하고, 없으면 설치해줘:
npm install -g netlify-cli

2. 프로젝트 루트에 .mcp.json 파일을 생성하고 다음 내용을 작성해줘(이미 .mcp.json파일이 존재할경우 mcp severs에 추가하기):

먼저 토큰 없이 기본 설정으로 시도:
{
  "mcpServers": {
    "netlify": {
      "command": "npx",
      "args": ["-y", "@netlify/mcp"]
    }
  }
}

만약 인증 문제가 발생하면 Personal Access Token을 추가:
{
  "mcpServers": {
    "netlify": {
      "command": "npx",
      "args": ["-y", "@netlify/mcp"],
      "env": {
        "NETLIFY_PERSONAL_ACCESS_TOKEN": "YOUR_NETLIFY_TOKEN"
      }
    }
  }
}

3. 설치 후 다음 명령어로 MCP 서버가 정상적으로 인식되는지 확인해줘:
/mcp

4. 만약 MCP 서버가 인식되지 않으면 다음 방법으로 Claude Code를 재시작하라고 유저에게 안내해줘:
가이드:
1) /exit 로 Claude Code 종료
2) 터미널에서 claude --dangerously-skip-permissions --mcp-config .mcp.json 로 실행
3) 실행시 enable 설정 허용
4) /mcp로 "✔ connected" 상태 확인

중요사항:
- Windows 환경에서는 반드시 --mcp-config .mcp.json 플래그 필요
- Windows에서는 --dangerously-skip-permissions 플래그도 함께 사용해야 정상 작동
- .mcp.json 파일은 .gitignore에 추가하여 토큰이 노출되지 않도록 주의할 것
```

**사용법:** 
1. **권장**: 미리 Personal Access Token을 발급받아 두세요 (위 토큰 발급 방법 참조)
2. 먼저 기본 설정(토큰 없이)으로 시도해보세요
3. 인증 문제나 "✘ failed" 상태가 발생하면 YOUR_NETLIFY_TOKEN을 실제 Personal Access Token으로 교체하여 사용하세요
4. ⚠️ **중요**: 토큰을 사용할 경우 .mcp.json 파일을 Git 저장소에 커밋하지 마세요

---

## 📋 개요

Claude Code와 Netlify MCP Server를 활용하여 React + Vite + Supabase 프로젝트를 완전 자동화된 방식으로 배포하는 종합 가이드입니다.

---

## 🛠 Netlify MCP Server 설정

### 1. 사전 요구사항

```bash
# Node.js 22 이상 권장 (버전 확인)
node --version

# Netlify CLI 전역 설치
npm install -g netlify-cli
```

### 2. MCP Server 설치

#### 방법 1: Claude Code CLI 명령어
```bash
claude mcp add netlify -s user -- npx -y @netlify/mcp
```

#### 방법 2: 설정 파일 직접 편집 (권장)
`.claude.json` 파일에 직접 설정:

```json
{
  "mcpServers": {
    "netlify": {
      "command": "npx",
      "args": ["-y", "@netlify/mcp"]
    }
  }
}
```

### 3. 인증 설정

개인 액세스 토큰을 사용한 고급 설정:

```json
{
  "mcpServers": {
    "netlify": {
      "command": "npx",
      "args": ["-y", "@netlify/mcp"],
      "env": {
        "NETLIFY_PERSONAL_ACCESS_TOKEN": "YOUR-PAT-VALUE"
      }
    }
  }
}
```

⚠️ **주의**: PAT 값을 저장소에 커밋하지 말 것!

### 4. 설정 확인

```bash
# Claude Code 재시작 후 MCP 연결 상태 확인
/mcp
```

---

## 🚀 React + Vite + Supabase 자동 배포

### 1. 환경 변수 설정

#### Vite 환경 변수 (접두사 `VITE_` 필수)
```javascript
// .env.local
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

#### 코드에서 사용
```javascript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
```

### 2. Netlify 배포 설정

#### 기본 빌드 설정
- **Build Command**: `npm run build` 또는 `yarn build`
- **Publish Directory**: `dist`
- **Node Version**: 22 이상

#### Supabase 통합 자동화
1. Netlify 대시보드에서 Supabase 통합 검색
2. "Install" 선택
3. "Connect" 후 Supabase 인증
4. Supabase 프로젝트 및 프레임워크 선택
5. 환경 변수 자동 설정 완료

### 3. Claude Code 자동화 명령어

#### 기본 배포 명령어
```bash
# 사이트 초기화
ntl init

# 미리보기 배포
ntl deploy

# 프로덕션 배포
ntl deploy --prod
```

#### 자동화 스크립트 생성
`.claude/commands/netlify-deploy.md` 파일 생성:

```markdown
# Netlify 자동 배포

1. 프로젝트 빌드 확인
2. 환경 변수 검증
3. Netlify 배포 실행
4. 배포 상태 확인
5. URL 공유
```

---

## 🔧 Headless Mode 자동화

### 1. CI/CD 통합

```bash
# 비대화형 모드로 배포
claude -p "프로젝트를 빌드하고 Netlify에 배포하세요" --output-format stream-json
```

### 2. GitHub 이벤트 트리거

```yaml
# .github/workflows/deploy.yml 예시
name: Netlify Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy with Claude Code
        run: claude -p "변경사항을 Netlify에 자동 배포하세요"
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
```

### 3. 환경 변수 관리

```bash
# 터미널 설정에 토큰 저장
export NETLIFY_AUTH_TOKEN=your-token-here
```

---

## 🎯 실습용 워크플로우

### 1회차: 기본 배포 체험
```bash
# Claude Code에서 실행
"React Vite 랜딩페이지를 생성하고 Netlify에 배포해주세요"
```

### 2회차: 데이터베이스 연동 배포
```bash
# Supabase 연동 방명록 배포
"Supabase와 연동된 방명록 앱을 빌드하고 환경변수를 설정한 후 Netlify에 배포해주세요"
```

### 3회차: 모바일 최적화 배포
```bash
# PWA 설정 포함 배포
"모바일 최적화된 SNS 웹앱을 PWA로 설정하고 Netlify에 배포해주세요"
```

---

## 🔍 트러블슈팅

### 일반적인 오류 해결

#### 1. "supabaseUrl is required" 오류
- Netlify 대시보드에서 환경 변수 확인
- `VITE_` 접두사 정확히 사용했는지 확인

#### 2. MCP 연결 실패 및 인증 문제
```bash
# Netlify CLI 인증 상태 확인
netlify status
netlify login
```

**인증 문제 해결 방법:**
1. 먼저 기본 MCP 설정(토큰 없이)으로 시도
2. 인증 오류 발생 시 Personal Access Token 사용:
   - Netlify 대시보드 → 좌하단 사용자 아이콘 → User settings → OAuth → New access token
   - .mcp.json에 토큰 추가 (임시 해결책)
3. ⚠️ **중요**: 토큰은 Git 저장소에 커밋하지 말 것
4. 문제 해결 후 토큰을 MCP 설정에서 제거

#### 3. 빌드 실패
- Node.js 버전 22 이상 사용
- `package.json`의 빌드 스크립트 확인
- 의존성 설치 확인: `npm install`

### 고급 설정

#### 커스텀 도메인 자동 설정
```bash
# Claude Code로 도메인 연결
"custom-domain.com을 이 Netlify 사이트에 연결해주세요"
```

#### 성능 최적화 자동화
```bash
# 성능 최적화 및 배포
"이미지 최적화, 코드 분할을 적용하고 Netlify에 배포해주세요"
```

---

## 📊 배포 확인 및 모니터링

### 자동 상태 확인
```bash
# 배포 상태 모니터링
netlify status
netlify sites:list
```

### Claude Code 통합 확인
```bash
# MCP 도구 활성화 확인
/mcp
```

---

## 🎉 예상 결과

- **원클릭 배포**: Claude Code 명령어 하나로 전체 배포 프로세스 완료
- **자동 환경 설정**: Supabase 환경 변수 자동 구성
- **실시간 동기화**: GitHub 푸시 시 자동 재배포
- **모바일 최적화**: PWA 설정 자동 적용
- **성능 최적화**: 빌드 최적화 자동 수행

이 가이드를 통해 웹 개발 초보자도 AI 도구의 도움으로 전문적인 수준의 자동화된 배포 환경을 구축할 수 있습니다.