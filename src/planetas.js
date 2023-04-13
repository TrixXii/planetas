import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Col, Pagination, Row } from "react-bootstrap";

export function Planets() {
    const [planets, setPlanets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const urlBase = "https://swapi.dev/api/planets/?page=";
    const [verPla, setverPla] = useState(false);

    useEffect(() => {
        const xhr = new XMLHttpRequest();
        const url = urlBase + currentPage;

        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                const response = JSON.parse(this.responseText);
                const planets = response.results;
                setPlanets(planets);
            }
        };

        xhr.open("GET", url, true);
        xhr.send();
    }, [currentPage]);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    return ( < > {
                verPla ? (verPla && < VerPlaneta > < /VerPlaneta>  ): 
                    ( < div id = "pp" >
                        <
                        div id = "contPlanetas" >
                        <
                        Row xs = { 1 }
                        md = { 3 }
                        className = "g-4 m-2 text-start" > {
                            planets.map((planet) => ( <
                                Col key = { planet.name } >
                                <
                                Card className = "text-bg-dark"
                                style = {
                                    { height: '250px' } } >
                                <
                                Card.Body >
                                <
                                Card.Title > { planet.name } < /Card.Title> <
                                Card.Text >
                                <
                                b > Clima: < /b> {planet.climate} <
                                br / >
                                <
                                b > Gravedad: < /b> {planet.gravity} <
                                br / >
                                <
                                b > Población: < /b> {planet.population} <
                                /Card.Text> <
                                div className = "d-flex justify-content-between align-items-center" >
                                <
                                div className = "btn-group" >
                                <
                                button type = "button"
                                className = "btn btn-sm btn-outline-secondary detallePla"
                                onClick = {
                                    () => setverPla(true) } > View <
                                /button>

                                <
                                button type = "button"
                                className = "btn btn-sm btn-outline-secondary" >
                                Edit <
                                /button> <
                                /div> <
                                small className = "text-body-secondary" > UwU < /small> <
                                /div> <
                                /Card.Body> <
                                /Card> <
                                /Col>
                            ))
                        } <
                        /Row> <
                        /div> <
                        Pagination className = "my-3" >
                        <
                        Pagination.Prev onClick = { handlePrevPage }
                        disabled = { currentPage === 1 }
                        /> <
                        Pagination.Item active > { `Página ${currentPage}` } < /Pagination.Item> <
                        Pagination.Next onClick = { handleNextPage }
                        disabled = { currentPage === 6 }
                        /> <
                        /Pagination> <
                        /div>
                    )
                } <
                />);
            }

            function VerPlaneta() {
                return ( < > {
                            verPla ? (verPla && < VerPlaneta > < /VerPlaneta>  ): 'hola'} <
                                />);
                            }