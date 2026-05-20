package com.example.ullasblomsterapp.Controller;

import com.example.ullasblomsterapp.Model.CustomBouquet;
import com.example.ullasblomsterapp.Service.CustomBouquetService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/custom-bouquets")
public class CustomBouquetController {

    private final CustomBouquetService customBouquetService;

    public CustomBouquetController(CustomBouquetService customBouquetService) {
        this.customBouquetService = customBouquetService;
    }

    //Opretter og gemmer en buket til db
    @PostMapping
    public CustomBouquet createBouquet(@RequestBody CustomBouquet bouquet) {
        return customBouquetService.saveBouquet(bouquet);
    }
}