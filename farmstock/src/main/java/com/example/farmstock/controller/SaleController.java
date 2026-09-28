package com.example.farmstock.controller;

import com.example.farmstock.entity.Sale;
import com.example.farmstock.service.SaleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sales")
public class SaleController {

    private final SaleService saleService;

    public SaleController(SaleService saleService) {
        this.saleService = saleService;
    }

    @PostMapping
    public Sale addSale(@RequestBody Sale sale) {
        return saleService.addSale(sale);
    }

    @GetMapping
    public List<Sale> getAllSales() {
        return saleService.getAllSales();
    }
}