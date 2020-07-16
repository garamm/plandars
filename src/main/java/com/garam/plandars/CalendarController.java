package com.garam.plandars;

import com.garam.plandars.dto.Calendar;
import com.garam.plandars.dto.Result;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;

@RestController
@RequestMapping(value = "/calendar")
@CrossOrigin(origins="http://localhost:5500")
public class CalendarController {


    @GetMapping(value = "/holiday")
    private HashMap<String, Object> getHoliday() {

//        ArrayList<Calendar> holidays = new ArrayList<>();
//        holidays.add(new Calendar("기념일", "0000-12-25", "0000-12-25", false, "성탄절", "red", "white", false));
//        return Util.makeResult(new Result(200, "조회 성공", holidays));
        return null;

    }



}
