package com.garamm.tamycalendar;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class CalendarController {

    @RequestMapping(value = "/")
    private String index() {
        return "index";
    }

    @GetMapping(value = "/test")
    @ResponseBody
    private String test() {
        return "ttt";
    }

}
