# 1단계: WSL (Windows Subsystem for Linux) 설치

## 1-1. PowerShell을 관리자 권한으로 실행

- 시작 메뉴에서 "PowerShell" 검색
- 우클릭 → "관리자 권한으로 실행" 선택

## 1-2. WSL 설치 명령어 실행

```powershell
wsl --install -d Ubuntu-24.04
```

- 실행 후 - 사용자 이름과 비밀번호 설정
- 주의 : 비밀번호 입력시 비밀번호가 '안보임!!!' 그래서 차분히 입력할 것
- [사용자이름]@[아마도 컴퓨터 이름]:/mnt/c/Users/[사용자 이름]$ 이런식으로 '$' 표시가 뜨면 Linux 환경으로 진입 성공