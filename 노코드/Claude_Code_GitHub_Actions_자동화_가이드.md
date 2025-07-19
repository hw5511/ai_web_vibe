# Claude Code GitHub Actions 자동화 가이드 (2025)

## 🔧 AI에게 GitHub CLI 설치 및 인증 지시하는 프롬프트

### GitHub CLI 설치가 필요한 경우
```
GitHub CLI를 관리자 권한으로 설치해줘. 만약 권한 문제나 시간 초과가 발생하면 새 PowerShell 창을 관리자 권한으로 열어서 설치를 진행해줘.

사용할 명령어:
1. 일반 설치: winget install --id GitHub.cli
2. 관리자 권한으로 새창 실행: Start-Process powershell -Verb RunAs -ArgumentList 'winget install --id GitHub.cli --accept-source-agreements --accept-package-agreements; pause'
3. 설치 확인: Test-Path 'C:\Program Files\GitHub CLI\gh.exe'
4. 버전 확인: & 'C:\Program Files\GitHub CLI\gh.exe' --version
```

### GitHub CLI 인증이 필요한 경우  
```
GitHub CLI 인증을 새창으로 실행해줘. 사용자가 브라우저에서 인증을 완료할 수 있도록 별도의 PowerShell 창에서 진행해줘.

명령어: Start-Process powershell -ArgumentList "-NoExit -Command & 'C:\\Program Files\\GitHub CLI\\gh.exe' auth login --web --git-protocol https --hostname github.com"

사용자 안내: "새 PowerShell 창이 열리면 Git 인증 질문에 Y를 입력하고 브라우저에서 인증을 완료해주세요."
```
---

## 📋 개요

Claude Code가 GitHub Actions 워크플로우를 자동으로 생성하고 관리하는 완전 가이드입니다. 2025년 현재 Claude Code는 공식 GitHub Actions 통합과 MCP 서버를 통한 고급 자동화를 제공합니다.

---

## 🚀 Claude Code GitHub Actions 공식 통합

### 1. 자동 설치 (권장 방법)

Claude Code 터미널에서 한 번의 명령어로 설정:

```bash
# Claude Code 실행 후
1. /install-github-app
2 github cli가 인식이 안될경우 -> anyway방식으로 하기 위해 엔터 -> 브라우저 열린것에서 claude 연결 
3. 터미널에서 또 엔터 -> Create a long-lived token with your Claude subscription 선택 
```

이 명령어는 다음을 자동으로 수행합니다:
- GitHub App 설치 안내
- 필요한 secrets 설정
- 워크플로우 파일 생성

### 2. 수동 설치 방법

#### 단계 1: GitHub App 설치
1. [Claude GitHub App 페이지](https://github.com/apps/claude-code) 방문
2. 저장소 또는 조직에 설치
3. contents, issues, pull requests 권한 부여

#### 단계 2: API 키 설정
```bash
# GitHub 저장소 Settings → Secrets and variables → Actions
ANTHROPIC_API_KEY=your-api-key-here
```

#### 단계 3: 워크플로우 파일 생성
`.github/workflows/claude-code.yml`:

```yaml
name: Claude Code Assistant

on:
  issues:
    types: [opened, edited]
  issue_comment:
    types: [created, edited]
  pull_request:
    types: [opened, edited, synchronize]
  pull_request_review_comment:
    types: [created, edited]

jobs:
  claude-assistant:
    if: contains(github.event.comment.body, '@claude') || contains(github.event.issue.body, '@claude') || contains(github.event.pull_request.body, '@claude')
    runs-on: ubuntu-latest
    
    steps:
    - name: Claude Code Action
      uses: anthropics/claude-code-action@v1
      with:
        github-token: ${{ secrets.GITHUB_TOKEN }}
        anthropic-api-key: ${{ secrets.ANTHROPIC_API_KEY }}
```

---

## 🛠 GitHub MCP Server 통합

### 1. GitHub MCP Server 설정

```bash
# Claude Code에 GitHub MCP 서버 추가
claude mcp add github -s user -- npx @anthropic/mcp-server-github
```

### 2. 고급 설정 (.claude.json)

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["@anthropic/mcp-server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_your_github_token"
      }
    }
  }
}
```

### 3. MCP 기반 워크플로우 자동화

Claude Code가 GitHub MCP를 통해 자동 수행할 수 있는 작업들:

#### CI/CD 파이프라인 생성
```bash
# Claude Code 명령어 예시
"React + Vite 프로젝트를 위한 GitHub Pages 배포 워크플로우를 생성해주세요"
```

#### 자동 PR 관리
```bash
"이슈 #123의 내용을 바탕으로 기능을 구현하고 PR을 생성해주세요"
```

#### 코드 리뷰 자동화
```bash
"이 PR의 코드를 검토하고 개선사항을 제안해주세요"
```

---

## 🎯 실제 사용 시나리오

### 1. 웹 초보자용 배포 자동화

#### 시나리오: Vite + Netlify 배포
```bash
# Claude Code에서 실행
"@claude Vite React 프로젝트를 Netlify에 자동 배포하는 GitHub Actions 워크플로우를 생성해주세요. 
환경변수는 Supabase 연동을 위한 것이고, main 브랜치 푸시 시 자동 배포되도록 설정해주세요."
```

생성되는 워크플로우 예시:
```yaml
name: Deploy to Netlify

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: '20'
    - run: npm ci
    - run: npm run build
      env:
        VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
        VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
    - uses: netlify/actions/cli@master
      with:
        args: deploy --prod --dir=dist
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### 2. GitHub Pages 자동 배포

```bash
# Claude Code 명령어
"@claude 포트폴리오 프로젝트를 GitHub Pages에 배포하는 워크플로우를 생성하고, 
커스텀 도메인 설정도 포함해주세요."
```

### 3. 이슈 기반 기능 개발

```markdown
<!-- GitHub 이슈에서 -->
@claude 이 이슈의 내용을 바탕으로 다음을 수행해주세요:
1. 필요한 컴포넌트 생성
2. 테스트 코드 작성  
3. 문서 업데이트
4. PR 생성
```

---

## 🔧 고급 자동화 기능

### 1. 워크플로우 템플릿 생성

`.claude/commands/create-workflow.md`:

```markdown
# GitHub Actions 워크플로우 생성

다음 정보를 바탕으로 워크플로우를 생성해주세요:

## 프로젝트 정보 수집
- [ ] 프레임워크 확인 (React, Vue, etc.)
- [ ] 빌드 도구 확인 (Vite, Webpack, etc.)
- [ ] 배포 대상 확인 (Netlify, GitHub Pages, etc.)

## 워크플로우 생성
- [ ] 적절한 Node.js 버전 설정
- [ ] 의존성 캐싱 설정
- [ ] 환경변수 구성
- [ ] 배포 단계 구성
- [ ] 오류 처리 추가

## 보안 체크
- [ ] Secrets 사용 확인
- [ ] 권한 최소화
- [ ] 의존성 보안 스캔
```

### 2. 조건부 워크플로우 생성

```bash
# 브랜치별 다른 동작
"main 브랜치는 프로덕션 배포, develop 브랜치는 스테이징 배포하는 워크플로우를 만들어주세요"
```

### 3. 성능 최적화 워크플로우

```bash
# 최적화된 빌드 프로세스
"빌드 시간을 최소화하고 캐싱을 극대화하는 워크플로우를 생성해주세요"
```

---

## 🎯 커리큘럼별 적용 방안

### 2회차: 방명록 프로젝트
```bash
"@claude Supabase와 연동된 방명록 프로젝트를 Netlify에 배포하는 워크플로우를 생성하고, 
환경변수 검증과 빌드 최적화를 포함해주세요."
```

### 3회차: SNS 웹앱 프로젝트  
```bash
"@claude 모바일 최적화된 SNS 웹앱을 PWA로 설정하여 Netlify에 배포하는 워크플로우를 생성하고,
성능 테스트와 lighthouse 점수 측정을 포함해주세요."
```

### 4회차: 포트폴리오 프로젝트
```bash
"@claude 인터랙티브 포트폴리오를 GitHub Pages에 배포하는 워크플로우를 생성하고,
커스텀 도메인 설정과 SEO 최적화를 포함해주세요."
```

---

## 🔍 자동화 모니터링 및 관리

### 1. 워크플로우 상태 확인

Claude Code가 자동으로 제공하는 모니터링:

```bash
# 배포 상태 자동 체크
"최근 배포 상태와 실패한 워크플로우가 있는지 확인해주세요"
```

### 2. 자동 알림 설정

```yaml
# Slack 알림 추가 예시
- name: Slack Notification
  if: failure()
  uses: 8398a7/action-slack@v3
  with:
    status: failure
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### 3. 성능 최적화 제안

```bash
# 워크플로우 최적화 분석
"현재 워크플로우의 성능을 분석하고 개선점을 제안해주세요"
```

---

## 🛡️ 보안 및 베스트 프랙티스

### 1. Secrets 관리

Claude Code가 자동으로 적용하는 보안 원칙:

- API 키는 절대 하드코딩하지 않음
- 최소 권한 원칙 적용
- 정기적인 토큰 순환 권장

### 2. 워크플로우 보안 체크

```bash
"@claude 현재 워크플로우의 보안 취약점을 분석하고 개선방안을 제시해주세요"
```

### 3. 의존성 보안 스캔

자동으로 추가되는 보안 단계:

```yaml
- name: Security Audit
  run: npm audit --audit-level moderate
```

---

## 🚀 2025년 고급 기능

### 1. AI 기반 코드 리뷰

```bash
# 자동 코드 리뷰 설정
"@claude PR에 대해 자동 코드 리뷰를 수행하고 개선사항을 제안하는 워크플로우를 만들어주세요"
```

### 2. 자동 테스트 생성

```bash
# 테스트 자동화
"@claude 새로 추가된 컴포넌트에 대한 테스트를 자동으로 생성하는 워크플로우를 만들어주세요"
```

### 3. 성능 모니터링

```bash
# 성능 벤치마크
"@claude 배포 시마다 성능 벤치마크를 실행하고 결과를 PR에 코멘트하는 워크플로우를 만들어주세요"
```

---

## 🎉 예상 결과

Claude Code GitHub Actions 통합을 통해 얻을 수 있는 결과:

- **원클릭 워크플로우 생성**: 자연어 명령으로 복잡한 CI/CD 파이프라인 생성
- **지능형 자동화**: 프로젝트 특성에 맞는 최적화된 워크플로우 제안
- **실시간 문제 해결**: 워크플로우 실패 시 자동 분석 및 수정 제안
- **보안 강화**: 자동 보안 체크 및 베스트 프랙티스 적용
- **성능 최적화**: 빌드 시간 단축 및 리소스 효율성 향상

이 가이드를 통해 웹 개발 초보자도 AI의 도움으로 전문가 수준의 CI/CD 파이프라인을 구축할 수 있습니다.