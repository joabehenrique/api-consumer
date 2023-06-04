package com.uvv.firstproject.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Getter
@Configuration
public class RapidConfig {
    @Value("${rapid.api-key}")
    private String API_KEY;
    private final String API_URL = "https://horoscope-astrology.p.rapidapi.com/dailyphrase";
}
