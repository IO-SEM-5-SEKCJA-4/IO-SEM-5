package org.example.magazyn.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Controller
public class ProductController {

    private final ProductRepo productRepository;

    @Autowired
    public ProductController(ProductRepo productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping("/dodawanie")
    public String add(Model model) {
        return "addproduct";
    }

    @PostMapping("/dodawanie")
    public String addProduct(@ModelAttribute Product product, Model model) {
        productRepository.save(product);
        return "index";
    }

    @GetMapping("/produkty")
    @ResponseBody
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

}
