import React, { useState, useEffect } from 'react';
import '../assets/css/blog.css';
import ListaCategorias from '../components/ListaCategorias';
import ListaPost from '../components/ListaPost';
import { Route, useParams, useRouteMatch, Link, Switch } from "react-router-dom";
import { busca } from '../api/api';
import SubCategoria from './SubCategoria';

const Categoria = () => {

    const { id } = useParams();
    const { url, path } = useRouteMatch();
    const [subCategorias, setSubCategorias] = useState([]);

    useEffect(() => {
        busca(`/categorias/${id}`, (categoria) => {
            setSubCategorias(categoria.subcategorias);
        });
    }, [id]);

    return (
        <>
            <div className="container">
                <h2 className="titulo-pagina">Pet Notícias</h2>
            </div>

            <ListaCategorias />

            <ul className="lista-categorias container flex">
                {
                    subCategorias.map((subCategoria) => (
                        <li className={`lista-categorias__categoria lista-categorias__categoria--${id}`} key={subCategoria}>
                            <Link to={`${url}/${subCategoria}`}>{subCategoria}</Link>
                        </li>
                    ))
                }
            </ul>

            <Switch>
                <Route exact path={`${path}/`}>
                    <ListaPost url={`/posts?categoria=${id}`} />
                </Route>
                <Route exact path={`${path}/:subCategoria`}>
                    <SubCategoria />
                </Route>
            </Switch>
        </>
    )
}

export default Categoria;