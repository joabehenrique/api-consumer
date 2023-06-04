package com.uvv.firstproject.controller;

import com.uvv.firstproject.service.HoroscopeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "api/v1/horoscope")
public class HoroscopeController {
    private final HoroscopeService horoscopeService;

    @Autowired
    public HoroscopeController(HoroscopeService horoscopeService) {
        this.horoscopeService = horoscopeService;
    }

    @GetMapping
    public ResponseEntity<String> getRates() {
        return horoscopeService.getHoroscope();
    }
}
