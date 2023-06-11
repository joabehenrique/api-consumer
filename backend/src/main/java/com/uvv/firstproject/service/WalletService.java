package com.uvv.firstproject.service;

import com.uvv.firstproject.dto.UserDTO;
import com.uvv.firstproject.entity.User;
import com.uvv.firstproject.entity.Wallet;
import com.uvv.firstproject.repository.WalletRepository;
import com.uvv.firstproject.service.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class WalletService {
    private final WalletRepository walletRepository;

    @Autowired
    public WalletService(WalletRepository walletRepository) {
        this.walletRepository = walletRepository;
    }

    public Wallet createWallet(Wallet wallet) {
        return walletRepository.save(wallet);
    }

    public Wallet getWallet(Long id) {
        return walletRepository.findById(id).orElseThrow(() -> new RuntimeException("Wallet not found"));
    }

    public Wallet updateWallet(Long id, Wallet wallet) {
        Wallet existingWallet = walletRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Wallet not found with id :" + id));

        existingWallet.setName(wallet.getName());
        existingWallet.setCryptocurrencies(wallet.getCryptocurrencies());
        return walletRepository.save(existingWallet);
    }

    public void deleteWallet(Long id) {
        walletRepository.deleteById(id);
    }

    public Page<Wallet> findAllPaged(Pageable pageRequest) {
        Page<Wallet> wallet = walletRepository.findAll(pageRequest);
        return wallet.map(Wallet::new);
    }
}
