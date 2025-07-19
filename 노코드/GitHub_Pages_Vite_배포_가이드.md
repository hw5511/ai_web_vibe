# GitHub Pages + Vite 배포 가이드 (2025)

## 📋 개요

Vite React 애플리케이션을 GitHub Pages에 배포하는 완전 가이드입니다. `vite-plugin-github-pages` 특정 플러그인은 존재하지 않으며, 대신 `gh-pages` 패키지나 GitHub Actions를 활용한 자동화 방식을 사용합니다.

---

## 🛠 방법 1: gh-pages 패키지를 활용한 수동 배포

### 1. 설치 및 기본 설정

```bash
# gh-pages 패키지 설치
npm install --save-dev gh-pages
```

### 2. Vite 설정 수정

`vite.config.js` 파일 수정:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/repository-name/' // GitHub 저장소 이름으로 변경
})
```

⚠️ **중요**: 
- 일반 저장소: `base: '/repository-name/'`
- 사용자/조직 메인 페이지 (username.github.io): `base: '/'`
- 커스텀 도메인: `base: '/'`

### 3. package.json 스크립트 추가

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://username.github.io/repository-name"
}
```

### 4. 배포 실행

```bash
npm run deploy
```

이 명령어는 자동으로 `dist` 폴더를 `gh-pages` 브랜치에 푸시합니다.

---

## 🚀 방법 2: GitHub Actions 자동 배포 (권장)

### 1. 워크플로우 파일 생성

`.github/workflows/deploy.yml` 파일 생성:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v4
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### 2. GitHub Pages 설정

1. GitHub 저장소 → **Settings** → **Pages**
2. **Source**: "Deploy from a branch"
3. **Branch**: "gh-pages" 선택

### 3. 자동 배포 확인

- `main` 브랜치에 푸시할 때마다 자동 배포
- Actions 탭에서 배포 진행 상황 확인

---

## 🌐 커스텀 도메인 설정

### 1. DNS 설정

도메인 제공업체에서 CNAME 레코드 생성:

```
Type: CNAME
Name: www
Value: username.github.io

Type: CNAME  
Name: @
Value: username.github.io
```

### 2. CNAME 파일 생성

`public/CNAME` 파일에 도메인 추가:

```
yourdomain.com
```

### 3. GitHub 설정

1. 저장소 **Settings** → **Pages**
2. **Custom domain**에 도메인 입력
3. **Enforce HTTPS** 체크

### 4. Vite 설정 수정

커스텀 도메인 사용 시:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/' // 커스텀 도메인에서는 루트 경로 사용
})
```

---

## 🔧 Claude Code 자동화 통합

### 1. 배포 명령어 자동화

`.claude/commands/github-deploy.md` 파일 생성:

```markdown
# GitHub Pages 자동 배포

다음 단계를 수행해주세요:

1. 프로젝트 빌드 (`npm run build`)
2. 빌드 오류 확인 및 수정
3. gh-pages 배포 (`npm run deploy`)
4. 배포 상태 확인
5. 배포 URL 확인 및 공유
```

### 2. GitHub Actions 워크플로우 생성

Claude Code로 자동 워크플로우 생성:

```bash
# Claude Code에서 실행
"GitHub Actions 워크플로우를 생성하여 main 브랜치 푸시 시 자동으로 Vite 앱을 GitHub Pages에 배포하도록 설정해주세요"
```

### 3. 환경별 설정 자동화

```bash
# 개발/프로덕션 환경 자동 설정
"repository 이름을 확인하고 vite.config.js의 base 경로를 자동으로 설정해주세요"
```

---

## 🎯 React Router 호환성

### Hash Router 사용 (권장)

GitHub Pages는 SPA 라우팅을 기본 지원하지 않으므로 Hash Router 사용:

```javascript
import { createHashRouter, RouterProvider } from 'react-router-dom';

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
```

### 404.html 파일 추가 (Browser Router 사용 시)

`public/404.html` 파일 생성하여 SPA 라우팅 지원:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Single Page Apps for GitHub Pages</title>
    <script type="text/javascript">
      var pathSegmentsToKeep = 1;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body>
  </body>
</html>
```

---

## 🔍 트러블슈팅

### 일반적인 문제 해결

#### 1. 빈 페이지 (Blank Page)
- **원인**: 잘못된 base 경로 설정
- **해결**: `vite.config.js`의 base 경로 확인

#### 2. MIME Type 오류
- **원인**: 빌드되지 않은 JSX 파일 서빙
- **해결**: `npm run build` 후 `dist` 폴더 배포 확인

#### 3. 404 오류 (새로고침 시)
- **원인**: SPA 라우팅 미지원
- **해결**: Hash Router 사용 또는 404.html 추가

#### 4. CSS/JS 파일 로드 실패
- **원인**: 절대 경로 문제
- **해결**: base 경로 설정 확인

### 디버깅 명령어

```bash
# 로컬에서 프로덕션 빌드 테스트
npm run build
npm run preview

# GitHub Pages 상태 확인
gh-pages --help
```

---

## 📊 배포 프로세스 자동화 체크리스트

### 초기 설정
- [ ] GitHub 저장소 생성
- [ ] Vite 프로젝트 설정
- [ ] base 경로 구성
- [ ] 배포 방식 선택 (gh-pages vs GitHub Actions)

### 배포 전 점검
- [ ] 빌드 오류 없음 (`npm run build`)
- [ ] 로컬 프리뷰 정상 동작 (`npm run preview`)
- [ ] 환경 변수 설정 확인
- [ ] 라우터 설정 확인

### 배포 후 확인
- [ ] GitHub Pages 활성화 확인
- [ ] 배포 URL 접속 테스트
- [ ] 모든 페이지 정상 동작
- [ ] 리소스 로드 정상
- [ ] 모바일 반응형 확인

---

## 🎉 예상 결과

- **자동 배포**: GitHub 푸시 시 자동 빌드 및 배포
- **커스텀 도메인**: 개인 브랜딩 URL 제공
- **HTTPS 지원**: GitHub Pages 자동 SSL 인증서
- **CDN 가속**: GitHub 글로벌 CDN 활용
- **무료 호스팅**: 무제한 정적 사이트 호스팅

이 가이드를 통해 Vite React 애플리케이션을 GitHub Pages에 전문적으로 배포하고 관리할 수 있습니다.