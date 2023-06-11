package com.uvv.firstproject.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Map;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Wallet {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @ElementCollection
    private Map<String, BigDecimal> cryptocurrencies;

    public Wallet(Wallet wallet) {
        this.id = wallet.getId();
        this.name = wallet.getName();
        this.cryptocurrencies = wallet.getCryptocurrencies();
    }
}
