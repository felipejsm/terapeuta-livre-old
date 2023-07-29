import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, getPaginationState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './paciente.reducer';

export const Paciente = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const pacienteList = useAppSelector(state => state.paciente.entities);
  const loading = useAppSelector(state => state.paciente.loading);
  const totalItems = useAppSelector(state => state.paciente.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      })
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (location.search !== endURL) {
      navigate(`${location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = paginationState.sort;
    const order = paginationState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  return (
    <div>
      <h2 id="paciente-heading" data-cy="PacienteHeading">
        <Translate contentKey="terapeutaLivreApp.paciente.home.title">Pacientes</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="terapeutaLivreApp.paciente.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/paciente/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="terapeutaLivreApp.paciente.home.createLabel">Create new Paciente</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {pacienteList && pacienteList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="terapeutaLivreApp.paciente.id">Id</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('nome')}>
                  <Translate contentKey="terapeutaLivreApp.paciente.nome">Nome</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('nome')} />
                </th>
                <th className="hand" onClick={sort('idade')}>
                  <Translate contentKey="terapeutaLivreApp.paciente.idade">Idade</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('idade')} />
                </th>
                <th className="hand" onClick={sort('email')}>
                  <Translate contentKey="terapeutaLivreApp.paciente.email">Email</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('email')} />
                </th>
                <th className="hand" onClick={sort('telefone')}>
                  <Translate contentKey="terapeutaLivreApp.paciente.telefone">Telefone</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('telefone')} />
                </th>
                <th className="hand" onClick={sort('whatsapp')}>
                  <Translate contentKey="terapeutaLivreApp.paciente.whatsapp">Whatsapp</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('whatsapp')} />
                </th>
                <th className="hand" onClick={sort('pacienteDesde')}>
                  <Translate contentKey="terapeutaLivreApp.paciente.pacienteDesde">Paciente Desde</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('pacienteDesde')} />
                </th>
                <th className="hand" onClick={sort('ativo')}>
                  <Translate contentKey="terapeutaLivreApp.paciente.ativo">Ativo</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('ativo')} />
                </th>
                <th className="hand" onClick={sort('arquivos')}>
                  <Translate contentKey="terapeutaLivreApp.paciente.arquivos">Arquivos</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('arquivos')} />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {pacienteList.map((paciente, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/paciente/${paciente.id}`} color="link" size="sm">
                      {paciente.id}
                    </Button>
                  </td>
                  <td>{paciente.nome}</td>
                  <td>{paciente.idade}</td>
                  <td>{paciente.email}</td>
                  <td>{paciente.telefone}</td>
                  <td>{paciente.whatsapp}</td>
                  <td>
                    {paciente.pacienteDesde ? <TextFormat type="date" value={paciente.pacienteDesde} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{paciente.ativo ? 'true' : 'false'}</td>
                  <td>{paciente.arquivos}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/paciente/${paciente.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/paciente/${paciente.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/paciente/${paciente.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="terapeutaLivreApp.paciente.home.notFound">No Pacientes found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={pacienteList && pacienteList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Paciente;
