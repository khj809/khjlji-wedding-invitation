# 김해준 임정임 모바일청첩장 프로젝트

https://khjlji-wedding-invitation.herokuapp.com/

## Setup

본 레포를 클론받은 후에 `.env` 파일을 생성하여 필요한 환경변수들을 세팅해 줍니다.

```
PRISMA_ENDPOINT=
PRISMA_SECRET=
PORT=
TELEGRAM_TOKEN=
```

이후에 다음 명령어를 통해 개발서버를 실행합니다.

```
npm run dev
```

개발서버는 프론트엔드 서버와 백엔드 서버가 동시에 `npm-run-all`로 실행되며, 프론트는 rollup을 통해 hot reloading이 되고, 백엔드는 nodemon을 통해 hot reloading이 됩니다.

## Build

```
npm run build
```

## Deploy

배포는 본 저장소에 커밋시 travis를 통해 heroku로 배포됩니다.

## 개발후기

https://onsealeatang.gitbook.io/khjlji-wedding-invitation/
