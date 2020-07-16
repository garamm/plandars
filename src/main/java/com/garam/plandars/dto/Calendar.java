package com.garam.plandars.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class Calendar {
    private String categoryCode; // 카테고리 번호
    private String dateType; // 기념일, 명절, 일반
    private String startDate; // ex. 0000으로 시작 하면 매년 반복
    private String endDate;
    private boolean isLunar; // 음력(true), 양력(false)
    private String title; // 일정명

}