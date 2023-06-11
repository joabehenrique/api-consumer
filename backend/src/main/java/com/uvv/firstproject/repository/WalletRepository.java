package com.uvv.firstproject.repository;


import com.uvv.firstproject.entity.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WalletRepository extends JpaRepository<Wallet, Long> {

}
