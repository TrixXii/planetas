import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Col, Pagination, Row } from "react-bootstrap";

export function Planets() {
    const [planets, setPlanets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const urlBase = "https://swapi.dev/api/planets/?page=";
    const [verPla, setverPla] = useState(false);
    const [selectedPlanet, setSelectedPlanet] = useState(null);

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

    const handleViewPlanet = (planet) => {
        setSelectedPlanet(planet);
        setverPla(true);
    };

    return ( <
        > {
            verPla ? (
                verPla && < VerPlaneta planet = { selectedPlanet }
                />
            ) : ( <
                div id = "pp" >
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
                            () => handleViewPlanet(planet) } > View < /button>

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

    function VerPlaneta({ planet }) {
        const [atras, setatras] = useState(false);
        const [planetDetails, setPlanetDetails] = useState(null);

        useEffect(() => {
            async function fetchPlanetDetails() {
                const response = await fetch(planet.url);
                const data = await response.json();

                const residentPromises = data.residents.map((residentUrl) =>
                    fetch(residentUrl).then((res) => res.json())
                );
                const residents = await Promise.all(residentPromises);

                setPlanetDetails({...data, residents });
            }

            fetchPlanetDetails();
        }, [planet]);

        if (!planetDetails) {
            return <div > Loading... < /div>;
        }

        const { name, diameter, climate, population, residents, terrain } = planetDetails;

        return ( <
            > {
                atras ? (
                    atras && < Planets / >
                ) : ( <
                    div >
                    <
                    div className = "row" >
                    <
                    div className = "col" >
                    <
                    h2 > { name } < /h2> <
                    p > < b > Clima: < /b> {climate}</p >
                    <
                    p > < b > Gravedad: < /b> {planet.gravity}</p >
                    <
                    p > < b > Población: < /b>  {population}</p >
                    <
                    p > < b > Diametro: < /b> {diameter}</p >
                    <
                    p > < b > Terreno: < /b> {terrain}</p >
                    <
                    p > < b > Superficie de agua: < /b> {planet.surface_water}</p >
                    <
                    p > < b > Periodo de rotación: < /b> {planet.rotation_period}</p >
                    <
                    p > < b > Periodo orbital: < /b> {planet.orbital_period}</p >
                    <
                    /div> <
                    /div> <
                    h2 > Residents: < /h2> <
                    div > {
                        planet.residents.length === 0 ? (
                            " No hay residentes"
                        ) : ( <
                            div > {
                                residents.map((resident) => ( <
                                    p key = { resident.name } > { resident.name } < /p>
                                ))
                            } <
                            /div>
                        )
                    } <
                    /div> <
                    button type = "button"
                    className = "btn btn-sm btn-outline-secondary detallePla"
                    onClick = {
                        () => setatras(true) } > Volver < /button> <
                    /div>
                )
            } <
            />
        );
    }

    // function VerPlaneta(props) {
    //     const [atras, setatras] = useState(false);
    // const planet = props.planet;

    // return(<> {atras ? (atras && < Planets > </Planets>  ):
    //     <div>
    //         <div className="row">
    //             <div className="col">
    //                 <h2>{planet.name}</h2>
    //                 <p><b>Clima:</b> {planet.climate}</p>
    //                 <p><b>Gravedad:</b> {planet.gravity}</p>
    //                 <p><b>Población:</b> {planet.population}</p>
    //                 <p><b>Diametro:</b> {planet.diameter}</p>
    //                 <p><b>Terreno:</b> {planet.terrain}</p>
    //                 <p><b>Superficie de agua:</b> {planet.surface_water}</p>
    //                 <p><b>Periodo de rotación:</b> {planet.rotation_period}</p>
    //                 <p><b>Periodo orbital:</b> {planet.orbital_period}</p>
    //             </div>
    //         </div>
    //             <button type="button" className="btn btn-sm btn-outline-secondary detallePla" 
    //                     onClick={() => setatras(true)}>Volver
    //             </button>
    //     </div>
    // }
    // </>);
    // }