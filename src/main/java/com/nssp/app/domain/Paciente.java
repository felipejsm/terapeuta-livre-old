package com.nssp.app.domain;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.Instant;

/**
 * A Paciente.
 */
@Entity
@Table(name = "paciente")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Paciente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "idade")
    private Integer idade;

    @Column(name = "email")
    private String email;

    @Column(name = "telefone")
    private String telefone;

    @Column(name = "whatsapp")
    private String whatsapp;

    @Column(name = "paciente_desde")
    private Instant pacienteDesde;

    @Column(name = "ativo")
    private Boolean ativo;

    @Column(name = "arquivos")
    private String arquivos;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Paciente id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return this.nome;
    }

    public Paciente nome(String nome) {
        this.setNome(nome);
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getIdade() {
        return this.idade;
    }

    public Paciente idade(Integer idade) {
        this.setIdade(idade);
        return this;
    }

    public void setIdade(Integer idade) {
        this.idade = idade;
    }

    public String getEmail() {
        return this.email;
    }

    public Paciente email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return this.telefone;
    }

    public Paciente telefone(String telefone) {
        this.setTelefone(telefone);
        return this;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getWhatsapp() {
        return this.whatsapp;
    }

    public Paciente whatsapp(String whatsapp) {
        this.setWhatsapp(whatsapp);
        return this;
    }

    public void setWhatsapp(String whatsapp) {
        this.whatsapp = whatsapp;
    }

    public Instant getPacienteDesde() {
        return this.pacienteDesde;
    }

    public Paciente pacienteDesde(Instant pacienteDesde) {
        this.setPacienteDesde(pacienteDesde);
        return this;
    }

    public void setPacienteDesde(Instant pacienteDesde) {
        this.pacienteDesde = pacienteDesde;
    }

    public Boolean getAtivo() {
        return this.ativo;
    }

    public Paciente ativo(Boolean ativo) {
        this.setAtivo(ativo);
        return this;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }

    public String getArquivos() {
        return this.arquivos;
    }

    public Paciente arquivos(String arquivos) {
        this.setArquivos(arquivos);
        return this;
    }

    public void setArquivos(String arquivos) {
        this.arquivos = arquivos;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Paciente)) {
            return false;
        }
        return id != null && id.equals(((Paciente) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Paciente{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", idade=" + getIdade() +
            ", email='" + getEmail() + "'" +
            ", telefone='" + getTelefone() + "'" +
            ", whatsapp='" + getWhatsapp() + "'" +
            ", pacienteDesde='" + getPacienteDesde() + "'" +
            ", ativo='" + getAtivo() + "'" +
            ", arquivos='" + getArquivos() + "'" +
            "}";
    }
}
