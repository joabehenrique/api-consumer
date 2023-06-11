package com.uvv.firstproject.service;

import com.uvv.firstproject.config.RapidConfig;
import org.springframework.http.*;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class HoroscopeService {
    private final RapidConfig rapidConfig;

    public HoroscopeService(RapidConfig rapidConfig) {
        this.rapidConfig = rapidConfig;
    }

    public String getDailyPhrase(){
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();

        headers.set("X-RapidAPI-Key", rapidConfig.getAPI_KEY());
        headers.set("X-RapidAPI-Host", "horoscope-astrology.p.rapidapi.com");

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
                rapidConfig.getApisHoroscope("dailyphrase"),
                HttpMethod.GET,
                entity,
                String.class
        );

        return response.getBody();
    }

    public String getNumerolog(String n) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();

        headers.set("X-RapidAPI-Key", rapidConfig.getAPI_KEY());

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
                rapidConfig.getApisHoroscope("numerology?n="+ n),
                HttpMethod.GET,
                entity,
                String.class
        );

        return response.getBody();
    }

    public String getSign(String s) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();

        headers.set("X-RapidAPI-Key", rapidConfig.getAPI_KEY());

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
                rapidConfig.getApisHoroscope("sign?s=" + s),
                HttpMethod.GET,
                entity,
                String.class
        );

        return response.getBody();
    }

    public String getHoroscope(String day, String sunsign) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();

        headers.set("X-RapidAPI-Key", rapidConfig.getAPI_KEY());

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
                rapidConfig.getApisHoroscope("horoscope?day="+day+"&sunsign="+sunsign),
                HttpMethod.GET,
                entity,
                String.class
        );

        return response.getBody();
    }
}
