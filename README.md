# 김해준 임정임 모바일청첩장 프로젝트

https://khjlji-wedding-invitation.herokuapp.com/

## Setup

본 레포를 클론받은 후에 의존 package들을 설치해줍니다.

```
yarn
```

`.env.template`을 참고하여 `.env` 파일을 생성하고 필요한 환경변수들을 세팅해 줍니다.

```
HASURA_GRAPHQL_ENDPOINT=
HASURA_ADMIN_SECRET=
HASURA_JWT_SECRET_KEY=

TELEGRAM_TOKEN=
TELEGRAM_DEFAULT_CHAT_ID=

PORT=
```

이후에 다음 명령어를 통해 개발서버를 실행합니다.

```
yarn dev
```

frontend 혹은 backend 서버만 개별적으로 실행하려면 아래 커맨드를 실행합니다.

```
yarn dev:frontend
yarn dev:backend
```

## Build

```
yarn build
```

## Deploy

배포는 본 저장소에 커밋시 github actions를 통해 heroku로 배포됩니다.

## 개발후기

https://onsealeatang.gitbook.io/khjlji-wedding-invitation/
