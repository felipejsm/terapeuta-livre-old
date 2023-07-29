import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './paciente.reducer';

export const PacienteDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const pacienteEntity = useAppSelector(state => state.paciente.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="pacienteDetailsHeading">
          <Translate contentKey="terapeutaLivreApp.paciente.detail.title">Paciente</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="terapeutaLivreApp.paciente.id">Id</Translate>
            </span>
          </dt>
          <dd>{pacienteEntity.id}</dd>
          <dt>
            <span id="nome">
              <Translate contentKey="terapeutaLivreApp.paciente.nome">Nome</Translate>
            </span>
          </dt>
          <dd>{pacienteEntity.nome}</dd>
          <dt>
            <span id="idade">
              <Translate contentKey="terapeutaLivreApp.paciente.idade">Idade</Translate>
            </span>
          </dt>
          <dd>{pacienteEntity.idade}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="terapeutaLivreApp.paciente.email">Email</Translate>
            </span>
          </dt>
          <dd>{pacienteEntity.email}</dd>
          <dt>
            <span id="telefone">
              <Translate contentKey="terapeutaLivreApp.paciente.telefone">Telefone</Translate>
            </span>
          </dt>
          <dd>{pacienteEntity.telefone}</dd>
          <dt>
            <span id="whatsapp">
              <Translate contentKey="terapeutaLivreApp.paciente.whatsapp">Whatsapp</Translate>
            </span>
          </dt>
          <dd>{pacienteEntity.whatsapp}</dd>
          <dt>
            <span id="pacienteDesde">
              <Translate contentKey="terapeutaLivreApp.paciente.pacienteDesde">Paciente Desde</Translate>
            </span>
          </dt>
          <dd>
            {pacienteEntity.pacienteDesde ? <TextFormat value={pacienteEntity.pacienteDesde} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="ativo">
              <Translate contentKey="terapeutaLivreApp.paciente.ativo">Ativo</Translate>
            </span>
          </dt>
          <dd>{pacienteEntity.ativo ? 'true' : 'false'}</dd>
          <dt>
            <span id="arquivos">
              <Translate contentKey="terapeutaLivreApp.paciente.arquivos">Arquivos</Translate>
            </span>
          </dt>
          <dd>{pacienteEntity.arquivos}</dd>
        </dl>
        <Button tag={Link} to="/paciente" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/paciente/${pacienteEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default PacienteDetail;
