# 수업 1-4: MUI 테마프로바이더 적용

## 실습 프롬프트

**참고:** 이 수업은 수업 1-1에서 생성한 lecture1/my-react-app 프로젝트를 기반으로 진행됩니다.

**다음 프롬프트를 통째로 Claude에게 입력하세요:**

```
다음 작업을 순서대로 진행해주세요:

1. lecture1/my-react-app 디렉토리로 이동하여 작업을 시작해주세요.

2. src 폴더에 theme.js 파일을 생성하고 다음 내용을 포함하여 MUI 테마를 설정해주세요:
   - createTheme을 사용한 기본 테마 생성
   - 기본 색상 팔레트 설정 (primary, secondary)
   - 타이포그래피 설정 (폰트 패밀리, 크기)
   - 간격(spacing) 설정
   - 테마를 기본 export로 내보내기

3. src/main.jsx 파일을 수정하여 테마프로바이더를 적용해주세요:
   - @mui/material/styles에서 ThemeProvider import
   - 위에서 생성한 theme 파일 import
   - App 컴포넌트를 ThemeProvider로 감싸기
   - CssBaseline 컴포넌트도 함께 적용하여 기본 스타일 초기화

4. 개발 서버를 실행하여 테마가 정상적으로 적용되었는지 확인해주세요:
   - timeout 10 npm run dev 명령어로 실행하여 10초 후 자동 종료
   - "Local: http://localhost:xxxx/" 메시지 확인되면 성공
   - 개발 서버는 타임아웃으로 자동 종료됨
   - 작업 완료 후 혹시 실행 중인 npm run dev 프로세스가 있는지 확인하고, Claude Code는 건드리지 않으면서 개발 서버만 종료 처리:
     * 개발 서버 확인: netstat -ano | findstr LISTENING | findstr 517
     * 개발 서버 종료: cmd //c "taskkill /PID [개발서버PID] /F"
     * 종료 확인: tasklist | findstr node.exe

5. 작업 완료 후 다음 정보를 확인해주세요:
   - theme.js 파일의 내용 출력
   - main.jsx 파일의 수정된 내용 출력
   - 개발 서버 실행 결과 및 접속 URL 확인
   - 기본 Vite React 페이지에서 CssBaseline이 적용된 상태 확인

6. 백업 템플릿 생성 및 향후 사용을 위한 가이드 문서 작성:
   - 현재 프로젝트를 _template_react_mui로 백업 복사: cp -r my-react-app _template_react_mui
```



## 학습 목표

- MUI 테마 시스템의 기본 구조 이해
- ThemeProvider를 사용한 전역 테마 적용 방법 학습
- 테마를 별도 파일로 관리하는 모듈화 방법 익히기
- CssBaseline을 활용한 기본 스타일 초기화 적용
