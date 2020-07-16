package com.garam.plandars;

import com.garam.plandars.dto.Result;

import java.util.HashMap;

public class Util {

    public static HashMap<String, Object> makeResult(Result input) {
        HashMap map = new HashMap();
        map.put("resultCode", input.getResultCode());
        map.put("resultMsg", input.getResultMsg());
        map.put("resultData", input.getResultData());
        return map;
    }
}
