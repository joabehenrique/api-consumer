package com.uvv.firstproject.controller;

import com.uvv.firstproject.service.HoroscopeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URISyntaxException;

@RestController
@RequestMapping(value = "api/v1/horoscope")
public class HoroscopeController {
    private final HoroscopeService horoscopeService;

    @Autowired
    public HoroscopeController(HoroscopeService horoscopeService) {
        this.horoscopeService = horoscopeService;
    }

    @GetMapping("/dailyphrase")
    public String getDailyPhrase() {
        return horoscopeService.getDailyPhrase();
    }

    @GetMapping("/numerolog")
    public String getNumerolog(@RequestParam String n) throws URISyntaxException {
        return horoscopeService.getNumerolog(n);
    }

    @GetMapping("/sign")
    public String getSign(@RequestParam String s) {
        return horoscopeService.getSign(s);
    }

    @GetMapping("/horoscope")
    public String getHoroscope(@RequestParam String day, @RequestParam String sunsign) {
        return horoscopeService.getHoroscope(day, sunsign);
    }
}
