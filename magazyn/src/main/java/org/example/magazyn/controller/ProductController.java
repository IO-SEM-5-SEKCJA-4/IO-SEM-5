package org.example.magazyn.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.magazyn.dto.ProductDto;
import org.example.magazyn.entity.Product;
import org.example.magazyn.entity.User;
import org.example.magazyn.repository.UserRepository;
import org.example.magazyn.service.ProductService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final UserRepository userRepository;

    @GetMapping("/products")
    public String getProducts(Model model, Principal principal) {
        List<Product> products = productService.getAllProducts();
        model.addAttribute("products", products);
        return "products";
    }

    @GetMapping("/products/add")
    public String showAddProductForm(Model model) {
        model.addAttribute("productDto", new ProductDto());
        return "addProduct";
    }

    @PostMapping("/products/add")
    public String addProduct(
            @Valid @ModelAttribute("productDto") ProductDto productDto,
            Principal principal
    ) throws IOException {
        User currentUser = userRepository.findByEmail(principal.getName());
        productService.addProduct(productDto, currentUser);
        return "redirect:/products";
    }


}