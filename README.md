<hr />

# <img src="/uploads/887fa19993e6f96cf7cdfe5ab4ffb700/BoBHuB_logo.png" alt="BoBhub_logo" widht="30" height="30"> BoB-Hub

## 성수낙낙에서 방문한 레이서들을 위한 밥메이트 매칭 서비스

## 1. 서비스 소개

#### 1.1 기술스택

**FE**

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white"> <img src="https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=styled-components&logoColor=white">
<img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"> <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">

-   타입 명시를 통해 생산성을 향상시키기 위해 TypeScript 사용
-   전역상태관리: Redux를 통해 유저 로그인 정보와 채팅 로그 관리

**BE**

<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white"> <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">

**공통**

<img src="https://img.shields.io/badge/socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white"> <img src="https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"> <img src="https://img.shields.io/badge/gitlab-FC6D26?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">

-   채팅서비스 구현: Socket.io를 활용한 실시간 통신 구현

## 2. 서비스 주요 기능 설명

### 2.1 주요기능

-   회원가입 페이지: 이메일 인증 기능
-   로그인 기능
-   식당 목록 카테고리별 조회 및 검색 기능
-   선택한 식당 방에서 실시간 채팅 기능
-   식당 상세페이지: 댓글(후기) CRUD 기능
-   마이페이지: 사용자 정보 수정 기능
-   관리자페이지: 식당 CRUD, 사용자 권한 변경 기능

### 2.2 본 프로젝트의 차별점

-   상세페이지에서 식당에 옵션을 선택 후 찜하기를 누르면 설정한 시간동안 2~4명의 사람을 모집함.
-   활성화된 모임은 타인이 메인페이지의 슬라이더에서 좋아요(하트 아이콘)를 누를 수 있음.
-   초기에 설정한 모집인원이 다 차면 해당 식당을 선택한 사람들이 채팅방에 접속하여 실시간 채팅이 가능함.

### 2.3 기대효과

-   성수낙낙 근처 맛집을 한눈에 확인할 수 있으므로 실제로 성수낙낙을 방문하는 레이서들의 적극적인 이용 예상
-   성수낙낙 방문 시 함께 식사를 할 사람이 없을 때 새로운 레이서와의 만남의 기회 제공
-   식당을 골랐어도 메뉴 선정이 고민 될 때 메뉴판 이미지를 통해 보다 빠른 메뉴 선택 가능

## 3. 서비스 구성

-   인프라 구조도 <br>
<img style ="width:700px" src = "https://user-images.githubusercontent.com/47781507/210013185-ee66248c-fa58-48de-9085-8e520c463ad5.png"/>

-   ERD <br>
<img style ="width:700px" src = "https://user-images.githubusercontent.com/47781507/210013366-b0afb69c-0ab1-4629-80f1-dc6b495f9b70.png"/>

-   API 문서(Notion): https://giant-painter-76a.notion.site/api-8a9d3abf185e40b78a0871db3ee334f9

## 4. 프로젝트 역할 분담

| 이름   | 담당 업무       |
| ------ | --------------- |
| 이수빈 | 팀장/프론트엔드 |
| 김유정 | 프론트엔드      |
| 김찬수 | 프론트엔드      |
| 윤동주 | 프론트엔드      |
| 장은영 | 프론트엔드      |
| 김동준 | 백엔드          |
| 안상준 | 백엔드          |

### **멤버별 Responsibility**

1. 이수빈: 팀장/프론트엔드

-   기획 단계: 회의진행, 아이디어 도출, 역할분배
-   개발 단계: 상세페이지, 채팅컴포넌트 개발
-   수정 단계: 발표준비, 발표

2. 김동준: 백엔드

-   기획 단계: Restful API 주소 설정
-   개발 단계: CRUD 라우팅, 서비스 로직, 에러 정리
-   수정 단계: 에러 관련 수정 및 디버깅

3. 김유정: 프론트엔드

-   기획 단계: 메인 페이지 와이어 프레임 작성
-   개발 단계: 메인 페이지, 유저가이드
-   수정 단계: 피드백 반영하여 코드 수정

4. 김찬수: 프론트엔드

-   기획 단계: 관리자 페이지 와이어 프레임 작성
-   개발 단계: 관리자 페이지, 페이지 별 실시간 액션, 전역 상태 관리
-   수정 단계: 피드백 반영하여 코드 수정

5. 안상준: 백엔드

-   기획 단계: DB 설계, ERD 구조화, MySql 및 EC2, S3 개발 환경 설정
-   개발 단계: CRUD 모델 SQL쿼리 및 트리거, 캐싱, 배포, Multer, nodemailer
-   수정 단계: 피드백 반영해서 백엔드 설계 수정

6. 윤동주: 프론트엔드

-   기획 단계: 로그인·회원가입 페이지 와이어 프레임 작성, Jira 무료 plan 생성
-   개발 단계: 로그인·회원가입 페이지
-   수정 단계: API 요청 에러 수정, 피드백 반영하여 코드 수정, 디자인 개선

7. 장은영: 프론트엔드

-   기획 단계: 식당목록 페이지 와이어 프레임 작성
-   개발 단계: 식당목록·사용자 페이지, theme 이용한 전체테마 color 정의, 공통 api 작성
-   수정 단계: 피드백 반영하여 코드 수정

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

-   Backend .env생성

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
MAIL_ID = <google developer 아이디>
MAIL_PASSWORD = <google developer 비밀번호>
```

## 6. 버전

-   1.0.0
