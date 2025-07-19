# 2단계: Node.js 설치 (VSCode 터미널에서)

## 2-1. VSCode에서 WSL 터미널 열기
- VSCode를 실행
- `Ctrl + Shift + ~` (또는 터미널 → 새 터미널)
- 터미널에서 `wsl` 명령어 입력하여 Linux 환경으로 전환

## 2-2. 패키지 목록 업데이트

```bash
sudo apt update
(비밀번호 입력 필요)
```

## 2-3. Node.js 설치

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## 2-4. 설치 확인

```bash
node --version
npm --version
```