package com.uvv.firstproject.controller;

import com.uvv.firstproject.entity.Wallet;
import com.uvv.firstproject.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/wallets")
public class WalletController {

    private final WalletService walletService;

    @Autowired
    public WalletController(WalletService walletService) {
        this.walletService = walletService;
    }

    @GetMapping
    public ResponseEntity<Page<Wallet>> getPlans(Pageable pageRequest) {
        Page<Wallet> list = walletService.findAllPaged(pageRequest);

        return ResponseEntity.ok().body(list);
    }

    @PostMapping
    public ResponseEntity<Wallet> createWallet(@RequestBody Wallet wallet) {
        return new ResponseEntity<>(walletService.createWallet(wallet), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Wallet> getWallet(@PathVariable Long id) {
        return new ResponseEntity<>(walletService.getWallet(id), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Wallet> updateWallet(@PathVariable Long id, @RequestBody Wallet wallet) {
        return new ResponseEntity<>(walletService.updateWallet(id, wallet), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteWallet(@PathVariable Long id) {
        walletService.deleteWallet(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
