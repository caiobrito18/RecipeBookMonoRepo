package com.recipebook.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.recipebook.entity.Recipe;
import com.recipebook.repository.RecipeRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/receitas")
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepository;

    @GetMapping
    public List<Recipe> listar() {
        return recipeRepository.findAllByOrderByDataCadastroDesc();
    }

    @PostMapping
    public ResponseEntity<Recipe> criar(@Valid @RequestBody Recipe recipe) {
        try {
            Recipe saved = recipeRepository.save(recipe);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (Exception e) {
            throw new RuntimeException("ConstraintViolationException");
        }
    }
}