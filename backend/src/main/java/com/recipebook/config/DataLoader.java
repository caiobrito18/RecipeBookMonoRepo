package com.recipebook.config;

import com.recipebook.entity.Categoria;
import com.recipebook.entity.Recipe;
import com.recipebook.repository.RecipeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(RecipeRepository repository) {
        return args -> {
            Recipe r1 = new Recipe();
            r1.setNome("Bolo");
            r1.setCategoria(Categoria.DOCE);
            r1.setTempoPreparo(40);
            r1.setPorcoes(10);
            r1.setIngredientes(Arrays.asList("Ovo", "Farinha"));
            r1.setModoPreparo("Assar");
            repository.save(r1);
        };
    }
}