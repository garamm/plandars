## Plandars

<br>
NodeJS / React / MySQL
<br>
DB : plandars

<br><br>

create database
```
CREATE DATABASE plandars DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
```

<br><br>

tb_user

||Field|Type|Comment|
|---|---|---|---|
|PK|u_id|varchar(50) NOT NULL|아이디|
||u_pwd|varchar(50) NOT NULL|비밀번호|
||u_path|varchar(50) NOT NULL|회원가입 경로|

```
create table tb_user (
	u_id varchar(50) not null comment '아이디',
	u_pwd varchar(50) not null comment '비밀번호',
	u_path varchar(50) not null comment '회원가입 경로',
	primary key (u_id)
);
```

<br><br>

tb_category

||Field|Type|Comment|
|---|---|---|---|
|PK|c_id|int(8) UNSIGNED ZEROFILL NOT NULL auto_increment|카테고리 코드|
||u_id|varchar(50) NOT NULL|유저 아이디|
||c_name|varchar(30) NOT NULL|카테고리명|
||c_color|varchar(30) NOT NULL|카테고리 색상|
||c_alpha|double NOT NULL|투명도|

```
create table tb_category (
	c_id int(8) UNSIGNED ZEROFILL NOT NULL auto_increment comment '카테고리 코드',
    u_id varchar(50) comment '유저 아이디',
	c_name varchar(30) not null comment '카테고리명',
	c_color varchar(30) not null comment '카테고리 색상',
	c_alpha double not null comment '투명도',
	primary key(c_id)
);
```

<br><br>

tb_schedule

||Field|Type|Comment|
|---|---|---|---|
|PK|s_id|int(8) UNSIGNED ZEROFILL NOT NULL auto_increment|일정 코드|
||u_id|varchar(50) NOT NULL|유저 아이디|
||s_title|varchar(30) NOT NULL|일정명|
||c_id|int(8) NOT NULL|카테고리 코드|
||s_gid|char(10) NOT NULL|일정그룹 코드|
||s_start|char(10) NOT NULL|일정 시작일|
||s_end|char(10) NOT NULL|일정 종료일|
||s_moon|char(1) NOT NULL|음력여부 Y/N|
||s_type|varchar(30) NOT NULL|일정/체크리스트|
||s_chk|char(1) NOT NULL|(체크리스트인 경우) 체크유무 Y/N|
||s_memo|varchar(200)|일정 메모|
||s_addr|varchar(30)|일정 주소|
||s_lat|varchar(30)|일정 주소 위도|
||s_lon|varchar(30)|일정 주소 경도|


```
create table tb_schedule (
	s_id int(8) UNSIGNED ZEROFILL NOT NULL auto_increment comment '일정 코드',
    u_id varchar(50) not null comment '유저 아이디',
	s_title varchar(30) not null comment '일정명',
	c_id int(8) not null comment '카테고리 코드',
	s_gid char(10) not null comment '일정그룹 코드',
	s_start char(10) not null comment '일정 시작일',
	s_end char(10) not null comment '일정 종료일',
	s_moon char(1) not null comment '음력여부 Y/N',
	s_type varchar(30) not null comment '일정/체크리스트',
	s_chk char(1) not null comment '체크유무 Y/N',
	s_memo varchar(200) comment '일정 메모',
	s_addr varchar(30) comment '일정 주소',
	s_lat varchar(30) comment '일정 주소 위도',
	s_lon varchar(30) comment '일정 주소 경도',
	primary key(s_id)
);
```

<br><br>

tb_holiday

||Field|Type|Comment|
|---|---|---|---|
|PK|h_title|varchar(30) NOT NULL|휴일명|
||c_id|char(8) NOT NULL|카테고리 코드|
|PK|h_start|char(10) NOT NULL|일정 시작일|
|PK|h_end|char(10) NOT NULL|일정 종료일|
||h_moon|char(1) NOT NULL|음력여부 Y/N|
||h_rest|char(1) NOT NULL|휴일여부 Y/N|

```
create table tb_holiday (
	h_title varchar(30) not null comment '휴일명',
	c_id char(8) not null comment '카테고리 코드',
	h_start char(10) not null comment '일정 시작일',
	h_end char(10) not null comment '일정 종료일',
	h_moon char(1) not null comment '음력여부 Y/N',
	h_rest char(1) not null comment '휴일여부 Y/N',
	primary key(h_title, h_start, h_end)
);
```

