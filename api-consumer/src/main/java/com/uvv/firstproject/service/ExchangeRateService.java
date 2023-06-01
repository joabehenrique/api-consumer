package com.uvv.firstproject.service;

import com.uvv.firstproject.config.ExchangeRateConfig;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

@Service
public class ExchangeRateService {
    private final ExchangeRateConfig exchangeRateConfig;

    @Autowired
    public ExchangeRateService(ExchangeRateConfig exchangeRateConfig) {
        this.exchangeRateConfig = exchangeRateConfig;
    }

    public String getRates() {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + exchangeRateConfig.getAPI_KEY());

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
                exchangeRateConfig.getAPI_URL(),
                HttpMethod.GET,
                entity,
                String.class
        );

        return response.getBody();
    }
}
