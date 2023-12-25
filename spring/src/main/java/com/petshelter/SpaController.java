package com.petshelter;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SpaController {

    @RequestMapping({"/auth/**"})
    public String forward() {
        return "forward:/";
    }
}
