# Windows 환경에서 Supabase MCP 설치 가이드

## 사전 준비사항

다음 정보를 미리 준비해주세요:

1. **Supabase Access Token**
   - https://supabase.com → 프로필 → Account → Access Tokens에서 발급
   - 예시: `sbp_1147da102d18880c237b1d451d9efe1e2483eb04`

2. **Supabase 프로젝트 ID**  
   - 프로젝트 대시보드 URL에서 확인: `https://supabase.com/dashboard/project/[프로젝트ID]`
   - 예시: `fnfiiuhwqvhxfepervza`

## Claude Code에게 전달할 설치 프롬프트

아래 프롬프트를 복사해서 다른 Claude Code에게 전달하세요. `YOUR_TOKEN`과 `YOUR_PROJECT_ID` 부분을 실제 값으로 교체하세요:

---

**Claude Code 설치 프롬프트:**

```
Windows 환경에서 Supabase MCP 서버를 설치해줘. 다음과 같이 진행해줘:

1. 프로젝트 루트에 .mcp.json 파일을 생성하고 다음 내용을 작성해줘(이미 .mcp.json파일이 존재할경우 mcp severs에 추가하기):

{
  "mcpServers": {
    "supabase": {
      "type": "stdio",
      "command": "cmd",
      "args": [
        "/c",
        "npx",
        "-y",
        "@supabase/mcp-server-supabase@latest",
        "--read-only",
        "--project-ref=YOUR_PROJECT_ID"
      ],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "YOUR_TOKEN"
      }
    }
  }
}

2. 설치 후 다음 명령어로 MCP 서버가 정상적으로 인식되는지 확인해줘:
claude mcp list

3. 만약 MCP 서버가 인식되지 않으면 다음 방법으로 Claude Code를 재시작하라고 유저에게 안내해줘:
가이드:
1) /exit 로 Claude Code 종료
2) 터미널에서 claude --dangerously-skip-permissions --mcp-config .mcp.json 로 실행
3) 실행시 enable 설정 허용
4) /mcp로 "✔ connected" 상태와 19개 도구 확인

중요사항:
- Windows 환경에서는 반드시 --mcp-config .mcp.json 플래그 필요
- Windows에서는 --dangerously-skip-permissions 플래그도 함께 사용해야 정상 작동
- .mcp.json 파일은 .gitignore에 추가하여 토큰이 노출되지 않도록 주의할 것
- 성공 시 /mcp 명령으로 "Supabase MCP Server ✔ connected" 상태 확인 가능
```

**사용법:** 위 프롬프트에서 YOUR_TOKEN과 YOUR_PROJECT_ID를 실제 값으로 교체한 후 Claude Code에게 전달하세요.


---

## 수동 설치 가이드 (참고용)

위 프롬프트로 설치가 안 될 경우 수동으로 진행하는 방법입니다.

### 1. .mcp.json 파일 생성
프로젝트 루트에 다음 내용으로 파일 생성:
```json
{
  "mcpServers": {
    "supabase": {
      "type": "stdio", 
      "command": "cmd",
      "args": [
        "/c",
        "npx",
        "-y", 
        "@supabase/mcp-server-supabase@latest",
        "--read-only",
        "--project-ref=YOUR_PROJECT_ID"
      ],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "YOUR_TOKEN"
      }
    }
  }
}
```

### 2. Claude Code 실행 (Windows 필수 방법)
```bash
claude --dangerously-skip-permissions --mcp-config .mcp.json
```

### 3. 연결 확인
```bash
/mcp
```
정상 연결 시 "Supabase MCP Server ✔ connected" 상태와 19개 도구 표시

## 사용 가능한 MCP 도구들

설치 후 다음 도구들을 사용할 수 있습니다:
- `mcp__supabase__list_tables`: 테이블 목록 조회
- `mcp__supabase__get_project_url`: 프로젝트 URL 조회
- 기타 Supabase 관련 작업들

## 주의사항 및 문제 해결

### 보안 주의사항
- Access Token은 민감한 정보이므로 `.gitignore`에 `.mcp.json` 추가 필수
- 토큰이 노출된 경우 즉시 재발급할 것

### Windows 환경 특이사항
- CLI 명령어로 추가 시 `cmd C:/` 같은 잘못된 경로 생성 문제
- 프로젝트 스코프 자동 인식 실패 → `--mcp-config` 플래그 필수
- 한글 경로 포함 시 오류 발생 가능 → 영문 경로 권장
- 권한 문제 발생 시 `--dangerously-skip-permissions` 플래그 사용