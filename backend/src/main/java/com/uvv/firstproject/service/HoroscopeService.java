package com.uvv.firstproject.service;

import com.uvv.firstproject.config.RapidConfig;
import org.springframework.http.*;

import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class HoroscopeService {
    private final RapidConfig rapidConfig;

    public HoroscopeService(RapidConfig rapidConfig) {
        this.rapidConfig = rapidConfig;
    }

    public ResponseEntity<String> getHoroscope(){
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();

        headers.set("X-RapidAPI-Key", rapidConfig.getAPI_KEY());

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
                rapidConfig.getAPI_URL(),
                HttpMethod.GET,
                entity,
                String.class
        );

        return response;
    }
}
