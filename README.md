## Plandars

<br>
NodeJS / React / MySQL
<br>
DB : plandars

<br><br>

tb_user

||Field|Type|Comment|
|---|---|---|---|
|PK|u_id|varchar(50) NOT NULL|아이디|
||u_pwd|varchar(50) NOT NULL|비밀번호|

```
create table tb_user (
	u_id varchar(50) not null,
	u_pwd varchar(50) not null,
	primary key (u_id)
) charset = utf8;
```

<br><br>

tb_category

||Field|Type|Comment|
|---|---|---|---|
|PK|c_id|int NOT NULL auto_increment|카테고리 코드|
||u_id|varchar(50) NOT NULL|유저 아이디|
||c_name|varchar(30) NOT NULL|카테고리명|
||c_color|varchar(30) NOT NULL|카테고리 색상|
||c_alpha|double NOT NULL|투명도|

```
create table tb_category (
	c_id int not null auto_increment,
    u_id varchar(50),
	c_name varchar(30) not null,
	c_color varchar(30) not null,
	c_alpha double not null,
	primary key(c_id)
) charset = utf8;
```

<br><br>

tb_schedule

||Field|Type|Comment|
|---|---|---|---|
|PK|s_id|int NOT NULL auto_increment|일정 코드|
||u_id|varchar(50) NOT NULL|유저 아이디|
||s_title|varchar(30) NOT NULL|일정명|
||c_id|int NOT NULL|카테고리 코드|
||s_gid|char(10) NOT NULL|일정그룹 코드|
||s_start|char(10) NOT NULL|일정 시작일|
||s_end|char(10) NOT NULL|일정 종료일|
||s_moon|int NOT NULL|음력여부|
||s_type|varchar(30) NOT NULL|일정/체크리스트|
||s_chk|char(1) NOT NULL|(체크리스트인 경우) 체크유무 Y/N|
||s_memo|varchar(200)|일정 메모|
||s_addr|varchar(30)|일정 주소|
||s_lat|varchar(30)|일정 주소 위도|
||s_lon|varchar(30)|일정 주소 경도|


```
create table tb_schedule (
	s_id int not null auto_increment,
    u_id varchar(50) not null,
	s_title varchar(30) not null,
	c_id int not null,
	s_gid char(10) not null,
	s_start char(10) not null,
	s_end char(10) not null,
	s_moon int not null,
	s_type varchar(30) not null,
	s_chk char(1) not null,
	s_memo varchar(200),
	s_addr varchar(30),
	s_lat varchar(30),
	s_lon varchar(30),
	primary key(s_id)
) charset = utf8;
```

<br><br>

tb_holiday

||Field|Type|Comment|
|---|---|---|---|
|PK|h_id|int NOT NULL auto_increment|일정 코드|
||h_title|varchar(30) NOT NULL|휴일명|
||c_id|int NOT NULL|카테고리 코드|
||h_gid|char(10) NOT NULL|일정그룹 코드|
||h_start|char(10) NOT NULL|일정 시작일|
||h_end|char(10) NOT NULL|일정 종료일|
||h_moon|int NOT NULL|음력여부|
||h_rest|int NOT NULL|휴일여부|

```
create table tb_holiday (
	h_id int not null auto_increment,
    u_id varchar(50) not null,
	h_title varchar(30) not null,
	c_id int not null,
	h_gid char(10) not null,
	h_start char(10) not null,
	h_end char(10) not null,
	h_moon int not null,
	h_rest int not null,
	primary key(h_id)
) charset = utf8;
```

