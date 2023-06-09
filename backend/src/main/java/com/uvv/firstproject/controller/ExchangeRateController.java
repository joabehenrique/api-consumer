package com.uvv.firstproject.controller;

import com.uvv.firstproject.service.ExchangeRateService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(value = "api/v1/rates")
public class ExchangeRateController {
    private final ExchangeRateService exchangeRateService;

    public ExchangeRateController(ExchangeRateService exchangeRateService) {
        this.exchangeRateService = exchangeRateService;
    }

    @GetMapping
    public String getRates() {
        return exchangeRateService.getRates();
    }

    @GetMapping("/paged")
    public ResponseEntity<Map<String, Double>> getRatesPaged(@RequestParam(value = "page", defaultValue = "0") int page,
                                                             @RequestParam(value = "limit", defaultValue = "5") int limit,
                                                             @RequestParam(value = "currency", defaultValue = "USD") String currency) {
        return ResponseEntity.ok(exchangeRateService.getRatesPaged(page, limit, currency));
    }
}
