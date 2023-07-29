package com.nssp.app.service.impl;

import com.nssp.app.domain.Paciente;
import com.nssp.app.repository.PacienteRepository;
import com.nssp.app.service.PacienteService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Paciente}.
 */
@Service
@Transactional
public class PacienteServiceImpl implements PacienteService {

    private final Logger log = LoggerFactory.getLogger(PacienteServiceImpl.class);

    private final PacienteRepository pacienteRepository;

    public PacienteServiceImpl(PacienteRepository pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }

    @Override
    public Paciente save(Paciente paciente) {
        log.debug("Request to save Paciente : {}", paciente);
        return pacienteRepository.save(paciente);
    }

    @Override
    public Paciente update(Paciente paciente) {
        log.debug("Request to update Paciente : {}", paciente);
        return pacienteRepository.save(paciente);
    }

    @Override
    public Optional<Paciente> partialUpdate(Paciente paciente) {
        log.debug("Request to partially update Paciente : {}", paciente);

        return pacienteRepository
            .findById(paciente.getId())
            .map(existingPaciente -> {
                if (paciente.getNome() != null) {
                    existingPaciente.setNome(paciente.getNome());
                }
                if (paciente.getIdade() != null) {
                    existingPaciente.setIdade(paciente.getIdade());
                }
                if (paciente.getEmail() != null) {
                    existingPaciente.setEmail(paciente.getEmail());
                }
                if (paciente.getTelefone() != null) {
                    existingPaciente.setTelefone(paciente.getTelefone());
                }
                if (paciente.getWhatsapp() != null) {
                    existingPaciente.setWhatsapp(paciente.getWhatsapp());
                }
                if (paciente.getPacienteDesde() != null) {
                    existingPaciente.setPacienteDesde(paciente.getPacienteDesde());
                }
                if (paciente.getAtivo() != null) {
                    existingPaciente.setAtivo(paciente.getAtivo());
                }
                if (paciente.getArquivos() != null) {
                    existingPaciente.setArquivos(paciente.getArquivos());
                }

                return existingPaciente;
            })
            .map(pacienteRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Paciente> findAll(Pageable pageable) {
        log.debug("Request to get all Pacientes");
        return pacienteRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Paciente> findOne(Long id) {
        log.debug("Request to get Paciente : {}", id);
        return pacienteRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Paciente : {}", id);
        pacienteRepository.deleteById(id);
    }
}
