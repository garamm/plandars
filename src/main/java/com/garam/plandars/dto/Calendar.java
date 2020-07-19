package com.garam.plandars.dto;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_calendar")
public class Calendar {

    @Id
    @GeneratedValue
    @Column(name = "cal_code")
    private String calendarCode;

    @Column(name = "cate_code")
    private String categoryCode; // 카테고리 번호

    @Column(name = "start_date")
    private String startDate; // ex. 0000으로 시작 하면 매년 반복

    @Column(name = "end_date")
    private String endDate;

    @Column(name = "is_lunar")
    private boolean isLunar; // 음력(true), 양력(false)

    @Column(name = "title")
    private String title; // 일정명

    @Column(name = "memo")
    private String memo; // 메모

}