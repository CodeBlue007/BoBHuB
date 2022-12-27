<hr />

#  <img src="/uploads/887fa19993e6f96cf7cdfe5ab4ffb700/BoBHuB_logo.png" alt="BoBhub_logo" widht="30" height="30"> BoB-Hub

## 성수낙낙에서 식사를 할 레이서들을 위한 맴버 매칭 서비스

## 1. 서비스 소개
#### 1.1 기술스택
- FE

| React | Typescript | Redux
|---- | ---- | ---- |
| <img src="/uploads/d5d263f104e52410a439dfc2a2e4f6fb/다운로드.png" width="50" height="50"> | <img src="/uploads/9f323b1303c0bc4e747a31a395a094fa/Typescript_logo_2020.svg.png" width="50" height="50">| <img src="/uploads/1c2e54af5d362296e4944b120387c114/redux-logo.png" width="50" height="50"> | 

| Socket.io | Styled Components | React-router | Material UI 
| ---- | ---- | ----| ---- | 
| <img src="/uploads/36d63903265a4b13715b6935d090110a/image_4_.png" width="120" height="50">  | <img src="/uploads/169bc288781726dd3bcb504ed4c8dc6d/styled-components-1.svg" width="50" height="50">  | <img src="/uploads/705a179ed09f10c14e60372db36f1cd5/twitterimage.jpg" width="50" height="50">  | <img src="/uploads/e87545bc13927b9f3c52ad220c033cec/logo_raw.svg" width="50" height="50"> |

- 코드관리를 용이하게 하기 위해 TS사용
- 채팅서비스 구현 : Socket.io 사용해 실시간 통신 구현
- 전역상태관리 : Redux를 통해 유저 로그인 정보와 채팅로그 관리.

- 1.2 BE

| Node.js | express.js | MySQL | Socket.io
|---- | ---- | ---- | ---- |
| <img src="/uploads/627758d2a672de3e205d4ccb24bf891a/Node.js.png" width="50" height="50">| <img src="/uploads/32e5943a9b89f59faadef8063a2f3d2c/1_XP-mZOrIqX7OsFInN2ngRQ.webp" width="120" height="50">  | <img src="/uploads/1f928bfea52f0e5a6b7c7b81bbdeb217/MySQL-Logo.wine.svg" width="50" height="50">  | <img src="/uploads/36d63903265a4b13715b6935d090110a/image_4_.png" width="120" height="50">




## 2. 서비스 주요 기능 설명

#### 2.1 주요기능

  - 로그인/회원가입
  - 채팅컴포넌트를 이용한 실시간 채팅기능.
  - 사용자 페이지 프로필 정보 수정기능.
  - 관리자페이지 식당 CRUD, 사용자 권한 변경기능.
  - 식당목록 필터링, 검색기능
  - 식당 댓글 CRUD 기능

#### 2.2 프로젝트만의 차별점

  - 상세페이지에서 식당에 옵션을 선택 후 찜하기를 누르면 설정한 시간동안 2~4명의 사람을 모집 할 수 있음.
  - 활성화된 모임은 메인페이지의 슬라이더에서 좋아요를 누를 수 있음.
  - 좋아요가 초기에 모집인원가 같아진다면, 실시간으로 사용자들의 채팅방을 만들어줌. 

#### 2.3 기대효과
  
  - 성수낙낙 근처 맛집 리스트들을 보여줘서 실제 엘리서 레이서들의 적극적인 이용이 예상됨.
  - 큰 고민없이 점심, 저녁메뉴를 사람들과 함께 먹을 수 있음.
  - 또 뭐쓰져


## 3. 서비스 구성도
  - 서비스 구조도 그림 (사용한 기술 스택)
  - 와이어프레임 링크 (예상 웹 화면 UI) e.g) figma 사용
  - API 명세를 문서화한 링크
  - API : https://giant-painter-76a.notion.site/api-8a9d3abf185e40b78a0871db3ee334f9

## 4. 프로젝트 팀원 역할 분담
| 이름 | 담당 업무 |
| ------ | ------ |
| 이수빈 | 팀장/프론트엔드 개발 |
| 김유정 | 프론트엔드 개발 |
| 김찬수 | 프론트엔드 개발 |
| 윤동주 | 프론트엔드 개발 |
| 장은영 | 프론트엔드 개발 |
| 김동준 | 벡앤드 개발 |
| 안상준 | 벡앤드 개발 |

**멤버별 responsibility**

1. 이수빈: 팀장/프론트엔드 담당

- 기획 단계: 구체적인 설계와 지표에 따른 프로젝트 제안서 작성
- 개발 단계: 팀원간의 일정 등 조율 + 프론트 or 백엔드 개발
- 수정 단계: 기획, 스크럼 진행, 코치님 피드백 반영해서 수정, 발표 준비

2. 멤버 2: 백엔드 담당

- 기획 단계: 큰 주제에서 문제 해결 아이디어 도출, 와이어프레임 작성
- 개발 단계: 와이어프레임을 기반으로 API 완성
- 수정 단계: 피드백 반영해서 백엔드 설계 수정

## 5. 실행 방법
- 백엔드 (예시):
  ```bash
  1. mongodb 실행
  2. yarn start (혹은 npm start)
  ```

## 6. 버전
  - 프로젝트의 버전 기입 (예: 1.0.0)

## 7. FAQ
  - 자주 받는 질문 정리
  - 예시) 이 서비스는 어떻게 실행하면 되나요?
    - git clone을 하신 후 아래 커맨드를 입력하시면 됩니다. ~~~
