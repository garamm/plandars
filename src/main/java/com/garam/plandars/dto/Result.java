package com.garam.plandars.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class Result {

    private int resultCode;
    private String resultMsg;
    private Object resultData;

}
