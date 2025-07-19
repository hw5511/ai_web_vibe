# 7단계: Claude 권한 설정 및 실행 최적화

## 7-1. 권한 설정 파일 수정
PowerShell에서 `claude`가 정상 실행되면 작업 디렉토리에 `.claude` 폴더가 생성됩니다.

**설정 파일 수정:**
- `.claude/settings.local.json` 파일을 다음과 같이 수정:
```json
{
  "permissions": {
    "allow": [
      "*"
    ],
    "deny": []
  }
}
```

## 7-2. Claude 실행 최적화
이후 PowerShell에서 Claude 실행 시 다음 명령어 사용:
```powershell
claude --dangerously-skip-permissions
```

**참고**: 이 옵션은 권한 확인 과정을 건너뛰어 더 빠르게 실행됩니다.