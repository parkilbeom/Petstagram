![Header](https://capsule-render.vercel.app/api?type=waving&color=FFCF54&height=240&section=header&text=Petstagram&fontSize=80&animation=fadeIn&fontAlignY=38&fontColor=3A4A51)


<div align="center">

## 🚀 프로젝트 사용법
해당 프로젝트를 clone합니다

git bash 터미널에 다음 명령어를 작성하여 프로젝트 실행에 필요한 패키지를 설치합니다
```sh
npm install
```
  
git bash 터미널에 다음 명령어를 작성합니다
```sh
npm run dev
```
  
**root경로에 .env파일이 필요합니다.**
  
env 파일에는 firebase 접속을 위한 API 정보가 작성되어 있습니다.
  
API 정보는 firebase에서 프로젝트를 추가하면 받을 수 있습니다.
```sh
# /.env
NEXT_PUBLIC_API_KEY  = [API_KEY]

NEXT_PUBLIC_AUTH_DOMAIN = [AUTH_DOMAIN]

NEXT_PUBLIC_PROJECT_ID = [PROJECT_ID]

NEXT_PUBLIC_STORAGE_BUCKET = [STORAGE_BUCKET]

NEXT_PUBLIC_MESSAGE_SENDER_ID = [MESSAGE_SENDER_ID]

NEXT_PUBLIC_APP_ID = [APP_ID]
```

  

## 🦁 Petstagram
### 반려동물사진을 공유하고 관련 내용을 공유하는 반려동물 주인들을 위한 sns
<br>

## 💻 프로젝트 소개

반려동물 사진을 공유하고 사람들과 소통하는 sns입니다. <br>
반려동물 케어 서비스로 사용자들이 서로 반려동물을 돌봐줄 수 있는 커뮤니티 형식의 기능도 제공합니다.

<br>

## ⌛ 개발 기간
#### 2023.04.17.월 - 2023.05.31.수

<br>

## Petstagram 프로젝트의 구성원

[박일범(parkilbeom)](https://github.com/parkilbeom)| [박원준(djswns7)](https://github.com/djswns7)  | [배상우(bsw98)](https://github.com/bsw98)	  |  [최예송(to06109)](https://github.com/to06109)   
-- | -- | -- | -- 
<img src="https://user-images.githubusercontent.com/119388194/233345397-10bb5b15-2fa4-47c2-9c25-efee4466e6d9.png" width="200">|<img src="https://user-images.githubusercontent.com/119388194/233345323-1b5d5451-a89a-41aa-aff0-729ee0bbe448.jpeg" width="200">|<img src="https://user-images.githubusercontent.com/119388194/233345607-abdfb9f9-300b-41d0-b029-a1d0012d72db.png" width="200">|<img src="https://user-images.githubusercontent.com/119388194/233345504-aadf057f-2aad-41d6-a5ca-c7a71dbfac59.jpeg" width="200">

<br>
  
## 📌 주요 기능
  
### 1. 유저인증(회원가입, 로그인)
<div align=left>
  <div align=center>
    <img src="https://github.com/mighty-paws/Petstagram/assets/69625013/8d9c4fc6-f646-4696-9dd3-4c27266c62d2" width="900">
  </div>

    - 아이디 중복확인
    - 유저정보 유효성 검사
    - firebase auth를 이용한 회원가입 기능

  <div align=center>
    <img src="https://github.com/mighty-paws/Petstagram/assets/69625013/e84cc978-9fc0-4cce-bcb4-9e50335a3821" width="900">
  </div>

    - 입력창 유효성 검사
    - firebase auth를 이용한 로그인 기능
  
</div>

### 2. 비밀번호 찾기
<div align=left>
  <div align=center>
    <img src="https://github.com/mighty-paws/Petstagram/assets/69625013/02a99a9b-79fc-470c-8a52-efaf4b8b0129" width="900">
  </div>

    - 가입한 이메일 입력시 비밀번호 변경 url을 이메일로 발송

</div>

### 3. 메인페이지
<!-- <div align=left>
  <div align=center>
    <iframe src="https://github.com/mighty-paws/Petstagram/assets/69625013/86067b90-26b6-4da7-a487-4a6759e9f7e7" width="900">
  </div>

    - 가입한 이메일 입력시 비밀번호 변경 url을 이메일로 발송

</div> -->
https://github.com/mighty-paws/Petstagram/assets/69625013/86067b90-26b6-4da7-a487-4a6759e9f7e7
<div align=left>
  <pre>
    <code>
    - 반응형 메뉴바
    - InfiniteScroll 구현을 통한 불필요한 렌더링 감소
    - 내가 팔로한 사람들이 팔로하는 사람으로 팔로우 추천
    - 게시물 작성 날짜 계산
    </code>
  </pre>
</div>

#### 기능이 완성되는 대로 추가하는 중입니다!
  
<br>

## ⚙️기술 스택
<div>
<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white"/>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
<img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=Firebase&logoColor=black"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/>
</div>
<div>
<img src="https://img.shields.io/badge/styled components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>
<img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=redux&logoColor=white"/>
<img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat-square&logo=Visual Studio Code&logoColor=white"/>
  <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white"/>
</div>

![Footer](https://capsule-render.vercel.app/api?type=waving&color=FFCF54&height=240&section=footer&animation=fadeIn)
