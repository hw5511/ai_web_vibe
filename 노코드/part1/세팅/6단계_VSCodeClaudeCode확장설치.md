# 6단계: VSCode Claude Code 확장 프로그램 설치

## 6-1. Extensions 마켓에서 Claude Code 설치
- VSCode 좌측 사이드바에서 Extensions 아이콘 클릭 (또는 `Ctrl + Shift + X`)
- 검색창에 "Claude Code" 입력
- Anthropic에서 제공하는 "Claude Code" 확장 프로그램 설치

## 6-2. VSCode 재시작
- VSCode를 완전히 종료
- VSCode 다시 실행

## 6-3. PowerShell에서 Claude Code npm 설치
- VSCode 터미널에서 PowerShell 선택 (WSL이 아닌 일반 PowerShell)
- PowerShell에서 Claude Code를 전역으로 설치:
```powershell
npm install -g @anthropic-ai/claude-code
```
- 설치 완료 후 PowerShell에서 `claude` 명령어 사용 가능

## 6-4. PowerShell에서 Claude 실행 테스트
- VSCode 터미널에서 PowerShell 선택 (WSL이 아닌 일반 PowerShell)
- 다음 명령어로 테스트:
```powershell
claude
```
- 정상적으로 Claude Code가 실행되면 설정 완료!

## 6-5. PowerShell 실행 오류 해결 방법
만약 PowerShell에서 `claude` 명령어 실행 시 다음과 같은 오류가 발생하는 경우:
- "Git이 설치되지 않았습니다"
- "환경변수 설정이 되지 않았습니다"
- 기타 환경 설정 관련 오류

**해결 방법:**
1. **WSL에서 Claude 실행**
   ```bash
   wsl
   claude
   ```

2. **Claude에게 오류 해결 요청**
   - 발생한 오류 메시지를 복사하여 Claude에게 붙여넣기
   - 다음과 같이 요청: 
   ```
   PowerShell에서 claude 실행 시 다음 오류가 발생합니다:
   [오류 메시지 붙여넣기]
   
   powershell.exe를 활용하여 Git 설치와 환경변수 설정을 해주세요.
   ```

3. **VSCode 재시작**
   - Claude가 제공한 해결책 적용 후
   - VSCode를 완전히 종료하고 다시 실행
   - PowerShell에서 `claude` 명령어 재테스트