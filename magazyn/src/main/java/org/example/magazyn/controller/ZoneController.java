package org.example.magazyn.controller;

import lombok.RequiredArgsConstructor;
import org.example.magazyn.dto.ZoneDto;
import org.example.magazyn.entity.Zone;
import org.example.magazyn.service.ZoneService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequiredArgsConstructor
@RequestMapping("/zones")
public class ZoneController {

    private final ZoneService zoneService;

    @GetMapping
    public String getZones(Model model) {
        model.addAttribute("zones", zoneService.getAllZones());
        return "zones";
    }

    @GetMapping("/add")
    public String showAddZoneForm(Model model) {
        model.addAttribute("zoneDto", new ZoneDto());
        return "addZone";
    }

    @PostMapping("/add")
    public String addZone(@ModelAttribute ZoneDto zoneDto,
                          BindingResult bindingResult,
                          RedirectAttributes redirectAttributes) {
        if (bindingResult.hasErrors()) {
            return "addZone";
        }

        try {
            Zone createdZone = zoneService.createZone(zoneDto);
            redirectAttributes.addFlashAttribute("successMessage",
                    "Strefa " + createdZone.getName() + " została utworzona.");
            return "redirect:/zones";
        } catch (Exception e) {
            bindingResult.rejectValue("name", "error.zoneDto", e.getMessage());
            return "addZone";
        }
    }

    @GetMapping("/details/{id}")
    public String getZoneDetails(@PathVariable Long id, Model model) {
        Zone zone = zoneService.getZoneById(id);
        model.addAttribute("zone", zone);
        model.addAttribute("products", zoneService.getProductsInZone(id));
        return "zoneDetails";
    }

    @GetMapping("/edit/{id}")
    public String showEditZoneForm(@PathVariable Long id, Model model) {
        Zone zone = zoneService.getZoneById(id);
        ZoneDto zoneDto = new ZoneDto(zone.getName(), zone.getMaxCapacity());
        model.addAttribute("zoneDto", zoneDto);
        model.addAttribute("zoneId", id);
        return "editZone";
    }

    @PostMapping("/edit/{id}")
    public String editZone(@PathVariable Long id,
                           @ModelAttribute ZoneDto zoneDto,
                           BindingResult bindingResult,
                           RedirectAttributes redirectAttributes) {
        if (bindingResult.hasErrors()) {
            return "editZone";
        }

        try {
            Zone updatedZone = zoneService.updateZone(id, zoneDto);
            redirectAttributes.addFlashAttribute("successMessage",
                    "Strefa " + updatedZone.getName() + " została zaktualizowana.");
            return "redirect:/zones";
        } catch (Exception e) {
            bindingResult.rejectValue("name", "error.zoneDto", e.getMessage());
            return "editZone";
        }
    }

    @GetMapping("/delete/{id}")
    public String deleteZone(@PathVariable Long id,
                             RedirectAttributes redirectAttributes) {
        try {
            Zone zone = zoneService.getZoneById(id);
            zoneService.deleteZone(id);
            redirectAttributes.addFlashAttribute("successMessage",
                    "Strefa " + zone.getName() + " została usunięta.");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("errorMessage",
                    "Nie można usunąć strefy: " + e.getMessage());
        }
        return "redirect:/zones";
    }
}