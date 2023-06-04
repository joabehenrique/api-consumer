package com.uvv.firstproject.config;

import lombok.Getter;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;

@Getter
@Configuration
public class ExchangeRateConfig {
    @Value("${exchangerate.api-key}")
    private String API_KEY;
    public String getApiUrlForCurrency(String currency) {
        return  "https://v6.exchangerate-api.com/v6/latest/" + currency;
    }
}
