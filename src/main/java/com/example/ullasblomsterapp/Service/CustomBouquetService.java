package com.example.ullasblomsterapp.Service;

import com.example.ullasblomsterapp.Model.CustomBouquet;
import com.example.ullasblomsterapp.Repository.CustomBouquetRepository;
import org.springframework.stereotype.Service;

@Service
public class CustomBouquetService {

    private final CustomBouquetRepository customBouquetRepository;

    public CustomBouquetService(CustomBouquetRepository customBouquetRepository) {
        this.customBouquetRepository = customBouquetRepository;
    }

    //Snakker med db og sender videre til repository
    public CustomBouquet saveBouquet(CustomBouquet bouquet) {
        return customBouquetRepository.save(bouquet);
    }
}