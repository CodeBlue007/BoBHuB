<hr />

#  <img src="/uploads/887fa19993e6f96cf7cdfe5ab4ffb700/BoBHuB_logo.png" alt="BoBhub_logo" widht="30" height="30"> BoB-Hub

## 성수낙낙에서 식사를 할 레이서들을 위한 맴버 매칭 서비스

## 1. 서비스 소개
#### 1.1 기술스택
**FE**

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white"> <img src="https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=styled-components&logoColor=white">
 <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"> <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"> 
- 코드관리를 용이하게 하기 위해 TS사용
- 전역상태관리 : Redux를 통해 유저 로그인 정보와 채팅로그 관리.

**BE**

<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white"> <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">

**공통**

<img src="https://img.shields.io/badge/socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white"> <img src="https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"> <img src="https://img.shields.io/badge/gitlab-FC6D26?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
- 채팅서비스 구현 : Socket.io 사용해 실시간 통신 구현

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
  - 엘리스 랩 방문 시, 같이 식사를 할 사람이 없을 때 새로운 레이서와 만날 기회가 생김.  
  - 메뉴 선정이 고민 될 때 선택지들을 볼 수 있으며 점심, 저녁메뉴를 레이서들과 함께 먹을 수 있음.


## 3. 서비스 구성도
  - 서비스 구조도 그림 (사용한 기술 스택)
  - 와이어프레임 링크 (예상 웹 화면 UI) e.g) figma 사용
  - API : https://giant-painter-76a.notion.site/api-8a9d3abf185e40b78a0871db3ee334f9

## 4. 프로젝트 팀원 역할 분담
| 이름 | 담당 업무 |
| ------ | ------ |
| 이수빈 | 팀장/프론트엔드 개발 |
| 김유정 | 프론트엔드 개발 |
| 김찬수 | 프론트엔드 개발 |
| 윤동주 | 프론트엔드 개발 |
| 장은영 | 프론트엔드 개발 |
| 김동준 | 백엔드 개발 |
| 안상준 | 백엔드 개발 |

**멤버별 responsibility**

1. 이수빈: 팀장/프론트엔드 담당

- 기획 단계: 회의진행, 아이디어 도출, 역할분배 
- 개발 단계: 상세페이지, 채팅컴포넌트 개발
- 수정 단계: 발표준비, 발표

2. 멤버 2: 백엔드 담당

- 기획 단계: 큰 주제에서 문제 해결 아이디어 도출, 와이어프레임 작성
- 개발 단계: 와이어프레임을 기반으로 API 완성
- 수정 단계: 피드백 반영해서 백엔드 설계 수정

3. 김찬수: 프론트엔드 담당

- 기획 단계: 관리자 페이지 와이어 프레임 작성
- 개발 단계: 관리자 페이지, 페이지 별 실시간 액션, 전역 상태 관리
- 수정 단계: 피드백 반영하여 코드 수정

## 5. 실행 방법
  1. git clone <repo address>
  2. SQL DDL 코드 실행 (bobhub/BE/src/seeder)
  3. 백엔드와 프론트엔드 폴더에서 필요한 패키지 설치
  ```bash
  yarn (혹은 npm install)
  ```
  4. 실행
  ```bash
  yarn run (혹은 npm start )
  ```
  - Backend .env생성
  ```bash
  NODE_ENV=<local 혹은 ec2>
  PORT= <포트번호> 
  #setupProxy.js에서 target값 SERVER PORT로 설정 요망

  COOKIE_SECRET= <랜덤 문자열>

  LOCAL_MYSQL_PASSWORD = <local 비밀번호>
  EC2_MYSQL_PASSWORD = <ec2 비밀번호>
  EC2_MYSQL_USER = <ec2 계정>
  EC2_MYSQL_HOST = <ec2 storage URL>

  S3_BUCKET_NAME = <계정>
  S3_ACCESS_KEY_ID = <ID>
  S3_ACCESS_KEY_PASSWORD = <비밀번호>
  #NodeMailer
  MAIL_ID = <google develope 아이디>
  MAIL_PASSWORD = <naver develope 앱 비밀번호>
  ```

## 6. 버전
  - 1.0.0

## 7. FAQ
  - 자주 받는 질문 정리
  - 예시) 이 서비스는 어떻게 실행하면 되나요?
    - git clone을 하신 후 아래 커맨드를 입력하시면 됩니다. ~~~
