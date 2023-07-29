import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntity, updateEntity, createEntity, reset } from './paciente.reducer';

export const PacienteUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const pacienteEntity = useAppSelector(state => state.paciente.entity);
  const loading = useAppSelector(state => state.paciente.loading);
  const updating = useAppSelector(state => state.paciente.updating);
  const updateSuccess = useAppSelector(state => state.paciente.updateSuccess);

  const handleClose = () => {
    navigate('/paciente' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.pacienteDesde = convertDateTimeToServer(values.pacienteDesde);

    const entity = {
      ...pacienteEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          pacienteDesde: displayDefaultDateTime(),
        }
      : {
          ...pacienteEntity,
          pacienteDesde: convertDateTimeFromServer(pacienteEntity.pacienteDesde),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="terapeutaLivreApp.paciente.home.createOrEditLabel" data-cy="PacienteCreateUpdateHeading">
            <Translate contentKey="terapeutaLivreApp.paciente.home.createOrEditLabel">Create or edit a Paciente</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="paciente-id"
                  label={translate('terapeutaLivreApp.paciente.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField label="Nome" id="paciente-nome" name="nome" data-cy="nome" type="text" />
              <ValidatedField label="Idade" id="paciente-idade" name="idade" data-cy="idade" type="text" />
              <ValidatedField label="Email" id="paciente-email" name="email" data-cy="email" type="text" />
              <ValidatedField label="Telefone" id="paciente-telefone" name="telefone" data-cy="telefone" type="text" />
              <ValidatedField label="Whatsapp" id="paciente-whatsapp" name="whatsapp" data-cy="whatsapp" type="text" />
              <ValidatedField
                label="Paciente Desde"
                id="paciente-pacienteDesde"
                name="pacienteDesde"
                data-cy="pacienteDesde"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField label="Ativo" id="paciente-ativo" name="ativo" data-cy="ativo" check type="checkbox" />
              <ValidatedField label="Arquivos" id="paciente-arquivos" name="arquivos" data-cy="arquivos" type="text" />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/paciente" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default PacienteUpdate;
