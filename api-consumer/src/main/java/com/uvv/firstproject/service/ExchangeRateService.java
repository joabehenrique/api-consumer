package com.uvv.firstproject.service;

import com.uvv.firstproject.config.ExchangeRateConfig;
import com.uvv.firstproject.dto.RateDTO;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    public Map<String, Double>  getRatesPaged(int page, int limit){
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();

        headers.set("Authorization", "Bearer " + exchangeRateConfig.getAPI_KEY());

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<RateDTO> response = restTemplate.exchange(
                exchangeRateConfig.getAPI_URL(),
                HttpMethod.GET,
                entity,
                RateDTO.class
        );

        RateDTO bodyResponse = response.getBody();

        assert bodyResponse != null;
        List<String> keys = new ArrayList<>(bodyResponse.getConversion_rates().keySet());
        List<String> subKeys = keys.stream()
                .skip((long) page * limit)
                .limit(limit)
                .toList();

        Map<String, Double> paginatedRates = new LinkedHashMap<>();
        for (String key : subKeys) {
            paginatedRates.put(key, bodyResponse.getConversion_rates().get(key));
        }

        return paginatedRates;
    }
}
