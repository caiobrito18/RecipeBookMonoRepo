package com.recipebook.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "O nome é obrigatório")
    @Column(unique = true)
    private String nome;
    
    @NotNull(message = "A categoria é obrigatória")
    @Enumerated(EnumType.STRING)
    private Categoria categoria;
    
    @NotNull(message = "O tempo de preparo é obrigatório")
    @Min(value = 1, message = "O tempo de preparo deve ser pelo menos 1 minuto")
    private Integer tempoPreparo;
    
    @NotNull(message = "A quantidade de porções é obrigatória")
    @Min(value = 1, message = "A quantidade de porções não pode ser menor do que 1")
    private Integer porcoes;
    
    @NotEmpty(message = "A receita deve ter pelo menos um ingrediente")
    @ElementCollection
    private List<String> ingredientes;
    
    @NotBlank(message = "O modo de preparo é obrigatório")
    @Column(length = 1000)
    private String modoPreparo;
    
    private LocalDateTime dataCadastro = LocalDateTime.now();

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    
    public Categoria getCategoria() { return categoria; }
    public void setCategoria(Categoria categoria) { this.categoria = categoria; }
    
    public Integer getTempoPreparo() { return tempoPreparo; }
    public void setTempoPreparo(Integer tempoPreparo) { this.tempoPreparo = tempoPreparo; }
    
    public Integer getPorcoes() { return porcoes; }
    public void setPorcoes(Integer porcoes) { this.porcoes = porcoes; }
    
    public List<String> getIngredientes() { return ingredientes; }
    public void setIngredientes(List<String> ingredientes) { this.ingredientes = ingredientes; }
    
    public String getModoPreparo() { return modoPreparo; }
    public void setModoPreparo(String modoPreparo) { this.modoPreparo = modoPreparo; }
    
    public LocalDateTime getDataCadastro() { return dataCadastro; }
    public void setDataCadastro(LocalDateTime dataCadastro) { this.dataCadastro = dataCadastro; }
}