# <img src="https://user-images.githubusercontent.com/47781507/211524479-3ac67ec1-16a5-4e23-b60d-249e1500c37f.png" alt="BoBHuB_logo" width="30" height="30"> BoBHuB

> **성수낙낙에 방문한 레이서들을 위한 밥메이트 매칭 서비스**

## 프로젝트 문서-<a href="https://dazzling-trumpet-1a7.notion.site/BoBHuB-82d9df121c8a46a69d689c5ae221a46a">바로가기</a>

### 목차

-   [1️. 서비스 개요](#1️⃣-서비스-개요)
    -   [주제](#📌-주제)
    -   [서비스명](#📌-서비스명)
    -   [목적](#📌-목적)
    -   [목표](#📌-목표)
    -   [타겟 유저](#📌-타겟-유저)
-   [2️. 서비스 소개](#2️⃣-서비스-소개)
    -   [서비스 도메인](#🔗-서비스-도메인)
    -   [테스트 계정](#👥-테스트-계정)
    -   [주요기능](#📌-주요기능)
    -   [페이지별 화면](#📌-페이지별-화면)
    -   [본 프로젝트의 차별점](#📌-본-프로젝트의-차별점)
    -   [기대효과](#📌-기대효과)
-   [3️. 서비스 구성](#3️⃣-서비스-구성)
    -   [서비스 흐름도](#📌-서비스-흐름도)
    -   [기술스택](#📌-기술스택)
        -   [FE](#◾-fe)
        -   [BE](#◾-be)
        -   [공통](#◾-공통))
    -   [인프라 구조도](#📌-인프라-구조도개선-예정)
    -   [ERD](#📌-erd)
    -   [API 문서(Notion)](#🔗-api-문서notion)
-   [4️. 프로젝트 역할 분담](#4️⃣-프로젝트-역할-분담)
    -   [멤버별 Responsibility](#멤버별-responsibility)
-   [5️. 실행 방법](#5️⃣-실행-방법)
-   [6️. Version](#6️⃣-version)
-   [7️. 협업 Tools](#7️⃣-협업-tools)

## 1️⃣ 서비스 개요

### 📌 주제

-   성수낙낙에 방문한 레이서들을 위한 혼밥 탈출 프로젝트

### 📌 서비스명

-   BoBHuB(밥허브)

### 📌 목적

-   새로운 맛집 탐방
-   타 트랙/기수 레이서 간 친목 도모(네트워킹)

### 📌 목표

-   실시간 사용자 트래픽 받아와서 처리하기
-   추가 작성 예정

### 📌 타겟 유저

-   성수낙낙에서 집중이 잘 돼서 왔는데, <br>
    밥은 먹어야겠고 <br>
    혼밥은 하기 싫은 <br>
    엘리스 레이서

## 2️⃣ 서비스 소개

### 🔗 서비스 도메인

http://kdt-sw3-team17.elicecoding.com/ <br>
<img src="https://user-images.githubusercontent.com/47781507/210108289-aff149fe-9253-4bbc-a3c8-7c3c90d0aaba.png" alt="BoBHuB_QRcode" width="250">

### 👥 테스트 계정

| Role  | ID                | PW   |
| ----- | ----------------- | ---- |
| Admin | admin@bobhub.com  | 11qq |
| User  | elicer@bobhub.com | 11qq |

> ⚠ 실제 서비스는 이메일 인증을 위해 실제 이메일로 가입하셔야 합니다.

### 📌 주요기능

-   회원가입 페이지: 이메일 인증 기능
-   로그인 기능
-   식당 목록 카테고리별 조회 및 검색 기능
-   선택한 식당 방에서 일대다 실시간 채팅 기능
-   식당 상세페이지: 댓글(후기) CRUD 기능
-   마이페이지: 사용자 정보 수정 기능
-   관리자페이지: 식당 CRUD, 사용자 권한 변경 기능

### 📌 페이지별 화면

|                                                                                                                    |                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| ![main](https://user-images.githubusercontent.com/47781507/210108654-eecbf9b1-bd2d-4081-b611-9036ed9275d2.png)     | ![slider](https://user-images.githubusercontent.com/47781507/210108726-269fe88a-9123-4244-b58d-53e001414033.png)     |
| 메인 페이지                                                                                                        | 메인페이지 하단 - 맛집 모임 참여 슬라이더                                                                            |
| ![register](https://user-images.githubusercontent.com/47781507/210129993-cf63ca36-ff12-4383-82bc-f8e1bba3c1e9.png) | ![login](https://user-images.githubusercontent.com/47781507/210129979-309cf78b-c01d-4763-bdcc-41f98fa56d6e.png)      |
| 회원가입 페이지                                                                                                    | 로그인 페이지                                                                                                        |
| ![shopList](https://user-images.githubusercontent.com/47781507/210108773-7c647cd0-e7a6-4fe8-9edf-1a60c5fcd1df.png) | ![shopDetail](https://user-images.githubusercontent.com/47781507/210130977-d75361d1-b110-4974-b53f-8abfca0e29b2.png) |
| 카테고리별 식당 목록 페이지                                                                                        | 식당 상세 정보 페이지                                                                                                |
| ![chatRoom](https://user-images.githubusercontent.com/47781507/210108869-105d80ad-bcbf-4496-be86-b4a45ede252d.png) | ![userGuide](https://user-images.githubusercontent.com/47781507/210108936-0c3d6a45-a11c-42ae-9cd2-94063949fa9f.png)  |
| 채팅방                                                                                                             | 유저 가이드 모달창                                                                                                   |
| ![myPage](https://user-images.githubusercontent.com/47781507/210130811-05f5b563-8a43-4848-a9b6-b4b2efd727f6.png)   | ![admin](https://user-images.githubusercontent.com/47781507/210130393-9e019e3f-4803-4c52-9549-e6517e25407d.png)      |
| 마이페이지                                                                                                         | 관리자페이지                                                                                                         |

### 📌 본 프로젝트의 차별점

-   식당 상세페이지에서 모집인원수 옵션을 선택 후 모임생성을 누르면 2~4명의 인원 모집 가능
-   활성화된 모임은 메인페이지 슬라이더에 등장, 참여를 원하는 타인이 좋아요(하트 아이콘)를 누를 수 있음
-   초기에 설정한 모집인원이 다 차면 해당 식당을 선택한 사람들이 채팅방에 접속하여 실시간 채팅(다대다) 가능

### 📌 기대효과

-   성수낙낙 근처 맛집을 한눈에 확인할 수 있으므로 실제로 성수낙낙을 방문하는 레이서들의 적극적인 이용 예상
-   성수낙낙 방문 시 함께 식사를 할 사람이 없을 때 새로운 레이서와의 만남의 기회 제공
-   식당을 골랐어도 메뉴 선정이 고민 될 때 메뉴판 이미지를 통해 보다 빠른 메뉴 선택 가능

## 3️⃣ 서비스 구성

### 📌 서비스 흐름도

-   User(Racer) <br>
    <img src="https://user-images.githubusercontent.com/47781507/210818601-dba344cf-3652-4af7-991a-2cbe23542faa.png" alt="user_diagram" width="700"> <br>
-   Admin <br>
    <img src="https://user-images.githubusercontent.com/47781507/210818587-c6cb75b2-11a8-4081-a563-c770003fd5f2.png" alt="admin_diagram" width="700">

### 📌 기술스택

#### ◾ FE

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white"> <img src="https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=styled-components&logoColor=white">
<img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"> <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">

-   타입 명시를 통한 생산성 향상 목적으로 TypeScript 사용
-   전역상태관리: Redux를 통해 유저 로그인 정보와 채팅 로그 관리

#### ◾ BE

<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white"> <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">

-   복잡한 SQL 쿼리문 작성 및 연습을 위해 ORM 미사용

#### ◾ 공통

<img src="https://img.shields.io/badge/socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white"> <img src="https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"> <img src="https://img.shields.io/badge/gitlab-FC6D26?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">

-   일대다 채팅서비스 구현: Socket.io를 활용한 실시간 통신 구현

### 📌 인프라 구조도(개선 예정)

<img src="https://user-images.githubusercontent.com/47781507/210818112-3fb090d8-2ae4-4217-8c81-296b1541517e.png" alt="Infrastructure" width="700">

### 📌 ERD

<img src="https://user-images.githubusercontent.com/47781507/210013366-b0afb69c-0ab1-4629-80f1-dc6b495f9b70.png" alt="ERD" width="700">

### 🔗 API 문서(Notion)

https://giant-painter-76a.notion.site/api-8a9d3abf185e40b78a0871db3ee334f9

## 4️⃣ 프로젝트 역할 분담

| 이름                                                                                                                                                     | 담당 업무           |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| <img src="https://user-images.githubusercontent.com/47781507/210137605-738d68a6-e165-4d2e-b471-83a6baec5339.png" alt="sb" width="40" height="40"> 이수빈 | `팀장` `프론트엔드` |
| <img src="https://user-images.githubusercontent.com/47781507/210137704-2254f511-f0b8-43fe-9605-9236dfa3152a.png" alt="yj" width="40" height="40"> 김유정 | `프론트엔드`        |
| <img src="https://user-images.githubusercontent.com/47781507/210137731-88407139-3c9b-4f50-8119-6a72fa74c4b4.png" alt="cs" width="40" height="40"> 김찬수 | `프론트엔드`        |
| <img src="https://user-images.githubusercontent.com/47781507/210137762-cd7b0737-7dfc-4103-973a-6d96ffed82d2.png" alt="dj" width="40" height="40"> 윤동주 | `프론트엔드`        |
| <img src="https://user-images.githubusercontent.com/47781507/210137778-52693f96-8e55-47d3-88ab-f15bdd318f96.png" alt="ey" width="40" height="40"> 장은영 | `프론트엔드`        |
| <img src="https://user-images.githubusercontent.com/47781507/210137809-f58e4d2e-6639-4704-980f-deca6008e7ce.png" alt="dj" width="40" height="40"> 김동준 | `백엔드`            |
| <img src="https://user-images.githubusercontent.com/47781507/210137829-4462ed74-7684-41d9-9dba-72aea8ff8701.png" alt="sj" width="40" height="40"> 안상준 | `백엔드`            |

### 멤버별 Responsibility

1. 이수빈: `팀장` `프론트엔드`

-   기획 단계: 회의진행, 아이디어 도출, 역할분배
-   개발 단계: 상세페이지, 채팅컴포넌트 개발
-   수정 단계: 발표준비, 발표

2. 김동준: `백엔드`

-   기획 단계: Restful API 주소 설정
-   개발 단계: CRUD 라우팅, 서비스 로직, 에러 정리
-   수정 단계: 에러 관련 수정 및 디버깅

3. 김유정: `프론트엔드`

-   기획 단계: 메인 페이지 와이어 프레임 작성
-   개발 단계: 메인 페이지, 유저가이드
-   수정 단계: 피드백 반영하여 코드 수정

4. 김찬수: `프론트엔드`

-   기획 단계: 관리자 페이지 와이어 프레임 작성
-   개발 단계: 관리자 페이지, 페이지 별 실시간 액션, 전역 상태 관리
-   수정 단계: 피드백 반영하여 코드 수정

5. 안상준: `백엔드`

-   기획 단계: DB 설계, ERD 구조화, MySQL 및 EC2, S3 개발 환경 설정
-   개발 단계: CRUD 모델 SQL쿼리 및 트리거, 캐싱, Multer, 배포
-   수정 단계: 피드백 반영해서 백엔드 설계 수정

6. 윤동주: `프론트엔드`

-   기획 단계: 로그인·회원가입 페이지 와이어 프레임 작성, Discord·Notion·Jira 팀 스페이스 생성 및 정리
-   개발 단계: 로그인·회원가입 페이지 구현, 로고·톤앤매너 구상
-   수정 단계: API 요청 에러 수정, 피드백 반영하여 코드 수정, 디자인 개선

7. 장은영: `프론트엔드`

-   기획 단계: 식당목록 페이지 와이어 프레임 작성
-   개발 단계: 식당목록·사용자 페이지, Theme 이용한 전체 테마 color 정의, 공통 API 작성
-   수정 단계: 피드백 반영하여 코드 수정

## 5️⃣ 실행 방법

1. `git clone ${repo address}`
2. SQL DDL 코드 실행 (bobhub/BE/src/seeder)
3. 백엔드와 프론트엔드 폴더에서 필요한 패키지 설치

```bash
yarn (혹은 npm install)
```

4. 실행

```bash
yarn run (혹은 npm start )
```

-   `BE` 디렉토리에서 .env 생성

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

## 6️⃣ Version

-   1.0.0

## 7️⃣ 협업 Tools

🔗 [Jira Roadmap](https://17171717.atlassian.net/jira/software/projects/UW17/boards/1/roadmap)

🔗 [Notion](https://www.notion.so/elice/4497050a9ede481ea2481923ef4d5a4f)
