# 수업 1: Claude 프롬프트를 통한 React 개발환경 구축

## 실습 프롬프트

**참고:** Claude 설치할 때 Node.js를 설치했습니다. 만약 Claude 설치를 안한 컴퓨터에서 아래 세팅하려면 2단계 부분으로 Node.js를 설치하고 오시오.

**다음 프롬프트를 통째로 Claude에게 입력하세요:**

```
다음 작업을 순서대로 진행해주세요:
1. 루트 디렉토리에 lecture1이라는 새로운 디렉토리를 생성하고, 
2. lecture1 디렉토리로 이동하여 다음 명령어로 Vite React 프로젝트를 생성해주세요:
   echo 'y' | npm create vite@latest my-react-app -- --template react
   (node.js 버전과 호환문제가 발생할 경우 node.js 최신버전 업데이트)
3. 생성된 my-react-app 디렉토리로 이동하여 모든 의존성을 설치해주세요.
4. my-react-app 디렉토리에서 의존성 설치 및 개발 서버 테스트:
   - npm install 실행
   - 개발 서버 테스트 (10초 타임아웃으로 자동 중단):
     timeout 10 npm run dev 명령어로 실행하여 10초 후 자동 종료
   - 서버 로그에서 다음 오류들을 자동 검출 및 해결:
     * "EADDRINUSE" 포트 충돌 → vite.config.js에서 다른 포트 설정
     * 의존성 관련 오류 → package-lock.json 삭제 후 npm install 재실행
   - 오류 해결 후 다시 같은 방식으로 정상 실행 확인
   - "Local: http://localhost:xxxx/" 메시지 확인되면 성공
   - 개발 서버는 타임아웃으로 자동 종료됨
   - 작업 완료 후 혹시 실행 중인 npm run dev 프로세스가 있는지 확인하고, Claude Code는 건드리지 않으면서 개발 서버만 종료 처리:
     * 개발 서버 확인: netstat -ano | findstr LISTENING | findstr 517
     * 개발 서버 종료: cmd //c "taskkill /PID [개발서버PID] /F"
     * 종료 확인: tasklist | findstr node.exe
5. 수업에 필요한 필수 패키지 설치:
   - 다음 명령어로 React 관련 최신 버전 정보를 확인:
     npm outdated
   - **수업 진행을 위해 반드시 설치해야 하는 패키지들**:
     * React Router (필수): npm install react-router-dom@latest
     * **Material-UI (MUI) 완전 설치 (수업 필수)**: 
       - 핵심 패키지: npm install @mui/material @emotion/react @emotion/styled
       - 아이콘 패키지: npm install @mui/icons-material
       - 폰트 패키지: npm install @fontsource/roboto
     * 개발 도구: npm install --save-dev @vitejs/plugin-react@latest
   - package.json에서 모든 의존성이 최신 버전으로 업데이트되었는지 확인
   - npm ls 명령어로 설치된 패키지 버전 확인
```
