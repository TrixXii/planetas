import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Col, ListGroup, Pagination, Row, Table } from "react-bootstrap";

export function Planets() {
    const [planets, setPlanets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const urlBase = "https://swapi.py4e.com/api/planets/?page=";
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

    return ( < > {
                verPla ? (verPla && < VerPlaneta planet = { selectedPlanet }
                    />
                ) : ( < div id = "pp" >
                    <
                    div id = "contPlanetas" >
                    <
                    Row xs = { 1 }
                    md = { 3 }
                    className = "g-4 m-2 text-start" > {
                        planets.map((planet) => ( <
                                Col key = { planet.name } >
                                <
                                Card className = "cajaBor text-bg-dark"
                                style = {
                                    { height: '250px' }
                                } >
                                <
                                Card.Body >
                                <
                                Card.Title > { planet.name } < /Card.Title>   <
                                Card.Text >
                                <
                                b > Clima: < /b> {planet.climate} <br/ >
                                <
                                b > Gravedad: < /b> {planet.gravity} <br/ >
                                <
                                b > Población: < /b> {planet.population}  < /
                                Card.Text > <
                                div className = "d-flex justify-content-between align-items-center" >
                                <
                                div className = "btn-group" >
                                <
                                button type = "button"
                                className = "btn btn-sm btn-outline-secondary detallePla"
                                onClick = {
                                    () => handleViewPlanet(planet)
                                } > View < /button> < /
                                div > <
                                small className = "text-body-secondary" > UwU < /small>  < /
                                div > <
                                /Card.Body>  < /
                                Card > <
                                /Col>))
                            } <
                            /Row>  < /
                            div > < Pagination className = "my-3" > <
                            Pagination.Prev onClick = { handlePrevPage }
                            disabled = { currentPage === 1 }
                            />  <
                            Pagination.Item active > { `Página ${currentPage}` } < /Pagination.Item>  <
                            Pagination.Next onClick = { handleNextPage }
                            disabled = { currentPage === 6 }
                            /> </Pagination >
                            <
                            /div>
                        )
                    } < />);
                }

                function VerPlaneta({ planet }) {
                    const [atras, setatras] = useState(false);
                    const [planetDetails, setPlanetDetails] = useState(null);
                    const [idResident, setIdResident] = useState(null);

                    useEffect(() => {
                        const xhr = new XMLHttpRequest();
                        xhr.addEventListener('readystatechange', () => {
                            if (xhr.readyState === 4 && xhr.status === 200) {
                                const data = JSON.parse(xhr.responseText);
                                const residentPromises = data.residents.map((residentUrl) =>
                                    fetch(residentUrl).then((res) => res.json())
                                );
                                Promise.all(residentPromises).then((residents) => {
                                    setPlanetDetails({...data, residents });
                                });
                            }
                        });
                        xhr.open('GET', planet.url);
                        xhr.send();
                    }, [planet]);

                    if (!planetDetails) {
                        return <div > Loading... < /div>;
                    }

                    const handleViewResi = (resiId) => {
                        setIdResident(resiId);
                    };
                    const { name, diameter, climate, population, residents, terrain } = planetDetails;

                    return ( <
                        >
                        {
                            atras ? (atras && < Planets / > ) : (idResident ? ( < VerResidente idResident = { idResident }
                                />) : ( <
                                div className = "vewPlantS" >
                                <
                                h2 > { name } < /h2> <
                                div className = "responsive" >
                                <
                                div className = " divCar" >
                                <
                                h2 > Caracteristicas: < /h2> <
                                Table striped hover variant = "dark"
                                className = "table" >
                                <
                                tbody >
                                <
                                tr >
                                <
                                th > Clima < /th> <
                                td > { climate } < /td> < /
                                tr > <
                                tr >
                                <
                                th > Gravedad < /th> <
                                td > { planet.gravity } < /td> < /
                                tr > <
                                tr >
                                <
                                th > Población < /th> <
                                td > { population } < /td> < /
                                tr > <
                                tr >
                                <
                                th > Diametro < /th> <
                                td > { diameter } < /td> < /
                                tr > <
                                tr >
                                <
                                th > Terreno < /th> <
                                td > { terrain } < /td> < /
                                tr > <
                                tr >
                                <
                                th > Superficie de agua < /th> <
                                td > { planet.surface_water } < /td> < /
                                tr > <
                                tr >
                                <
                                th > Periodo de rotación < /th> <
                                td > { planet.rotation_period } < /td> < /
                                tr > <
                                tr >
                                <
                                th > Periodo orbital < /th> <
                                td > { planet.orbital_period } < /td> < /
                                tr > <
                                /tbody> < /
                                Table > <
                                /div> <
                                div className = "divCar" >
                                <
                                h2 > Residents: < /h2> <
                                div className = "row justify-content-center " > {
                                    planet.residents.length === 0 ? ( <
                                        div className = "col-md-12" >
                                        <
                                        p > No hay residentes < /p> < /
                                        div >
                                    ) : (
                                        residents.map((resident) => ( <
                                            div className = "col-md-5 "
                                            key = { resident.name } >
                                            <
                                            ListGroup className = "listaResidents" >
                                            <
                                            ListGroup.Item className = "contRes"
                                            action variant = "dark"
                                            onClick = {
                                                () => handleViewResi(resident.url)
                                            } > { resident.name } < /ListGroup.Item> < /
                                            ListGroup > <
                                            /div>
                                        ))
                                    )
                                } <
                                /div> < /
                                div > <
                                /div> <
                                button type = "button"
                                className = "btn btn-sm btn-outline-secondary detallePla"
                                onClick = {
                                    () => setatras(true)
                                } > < i class = "fa fa-angle-left" > < /i> Volver</button >
                                <
                                /div>
                            ))
                        } <
                        />
                    );
                }

                function VerResidente({ idResident }) {
                    const [residentDetails, setResidentDetails] = useState(null);
                    const [planetDetails, setPlanetDetails] = useState(null);
                    const [atras, setatras] = useState(false);
                    const [selectedPlanet, setSelectedPlanet] = useState(null);


                    useEffect(() => {
                        fetch(`${idResident}`)
                            .then(response => response.json())
                            .then(data => setResidentDetails(data))
                            .catch(error => console.error(error));
                    }, [idResident]);

                    useEffect(() => {
                        if (residentDetails) {
                            fetch(residentDetails.homeworld)
                                .then(response => response.json())
                                .then(data => setPlanetDetails(data))
                                .catch(error => console.error(error));
                        }
                    }, [residentDetails]);

                    if (!residentDetails || !planetDetails) {
                        return <div > Loading... < /div>;
                    }
                    const handleViewPlanet = (planetId) => {
                        setSelectedPlanet(planetId);
                    };
                    const { name, height, mass, hair_color, gender, skin_color, eye_color, birth_year } = residentDetails;
                    const planetName = planetDetails.name;
                    const planetUrl = planetDetails;

                    return ( < > {
                            atras ? (atras && < Planets / > ) : (selectedPlanet ? ( < VerPlanetaConFetch planetFetch = { selectedPlanet }
                                />) : ( <
                                div >
                                <
                                h2 className = "mb-2" > { name } < /h2> <
                                div className = "responsive" >
                                <
                                div className = " divCar" >
                                <
                                h2 className = "mb-4" > Caracteristicas: < /h2> <
                                Table striped hover variant = "dark"
                                className = "table" >
                                <
                                tbody >
                                <
                                tr >
                                <
                                th > Altura < /th> <
                                td > { height } < /td> < /
                                tr > <
                                tr >
                                <
                                th > Mass < /th> <
                                td > { mass } < /td> < /
                                tr > <
                                tr >
                                <
                                th > Hair color < /th> <
                                td > { hair_color } < /td> < /
                                tr > <
                                tr >
                                <
                                th > Skin color < /th> <
                                td > { skin_color } < /td> < /
                                tr > <
                                tr >
                                <
                                th > Color de ojos < /th> <
                                td > { eye_color } < /td> < /
                                tr > <
                                tr >
                                <
                                th > Genero < /th> <
                                td > { gender } < /td> < /
                                tr > <
                                tr >
                                <
                                th > Birth year < /th> <
                                td > { birth_year } < /td> < /
                                tr > <
                                tr >
                                <
                                th className = "eresDelP" > Reside en el planeta < /th> <
                                td >
                                <
                                button className = "contRes"
                                onClick = {
                                    () => handleViewPlanet(planetUrl)
                                }
                                action variant = "dark" > { planetName } < /button> < /
                                td > <
                                /tr> < /
                                tbody > <
                                /Table> < /
                                div >

                                <
                                /div>

                                <
                                button type = "button"
                                className = "btn btn-sm btn-outline-secondary detallePla"
                                onClick = {
                                    () => setatras(true)
                                } > < i className = "fa fa-angle-left" > < /i> Volver</button >
                                <
                                /div>
                            ))
                        } <
                        />
                    );
                }

                function VerPlanetaConFetch({ planetFetch }) {
                    const [atras, setatras] = useState(false);
                    const [planetDetails, setPlanetDetails] = useState(null);
                    const [idResident, setIdResident] = useState(null);

                    useEffect(() => {
                        fetch(planetFetch.url)
                            .then((res) => res.json())
                            .then((data) => {
                                const residentPromises = data.residents.map((residentUrl) =>
                                    fetch(residentUrl).then((res) => res.json())
                                );
                                Promise.all(residentPromises).then((residents) => {
                                    setPlanetDetails({...data, residents });
                                });
                            })
                            .catch((err) => console.error(err));
                    }, [planetFetch]);

                    if (!planetDetails) {
                        return <div > Loading... < /div>;
                    }

                    const handleViewResi = (resiId) => {
                        setIdResident(resiId);
                    };
                    const { name, diameter, climate, population, residents, terrain } = planetDetails;

                    return ( <
                        >
                        {
                            atras ? (atras && < Planets / > ) : (idResident ? ( < VerResidente idResident = { idResident }
                                />) : ( <
                                div className = "vewPlantS" >
                                <
                                h2 > { name } < /h2> <
                                div className = "responsive" >
                                <
                                div className = " divCar" >
                                <
                                h2 > Caracteristicas: < /h2> <
                                Table striped hover variant = "dark"
                                className = "table" >
                                <
                                tbody >
                                <
                                tr >
                                <
                                th > Clima < /th> <
                                td > { climate } < /td> < /
                                tr > <
                                tr >
                                <
                                th > Gravedad < /th> <
                                td > { planetFetch.gravity } < /td> < /
                                tr > <
                                tr >
                                <
                                th > Población < /th> <
                                td > { population } < /td> < /
                                tr > <
                                tr >
                                <
                                th > Diametro < /th> <
                                td > { diameter } < /td> < /
                                tr > <
                                tr >
                                <
                                th > Terreno < /th> <
                                td > { terrain } < /td> < /
                                tr > <
                                tr >
                                <
                                th > Superficie de agua < /th> <
                                td > { planetFetch.surface_water } < /td> < /
                                tr > <
                                tr >
                                <
                                th > Periodo de rotación < /th> <
                                td > { planetFetch.rotation_period } < /td> < /
                                tr > <
                                tr >
                                <
                                th > Periodo orbital < /th> <
                                td > { planetFetch.orbital_period } < /td> < /
                                tr > <
                                /tbody> < /
                                Table > <
                                /div> <
                                div className = "divCar" >
                                <
                                h2 > Residents: < /h2> <
                                div className = "row justify-content-center " > {
                                    planetFetch.residents.length === 0 ? ( <
                                        div className = "col-md-12" >
                                        <
                                        p > No hay residentes < /p> < /
                                        div >
                                    ) : (
                                        residents.map((resident) => ( <
                                            div className = "col-md-5 "
                                            key = { resident.name } >
                                            <
                                            ListGroup className = "listaResidents" >
                                            <
                                            ListGroup.Item className = "contRes"
                                            action variant = "dark"
                                            onClick = {
                                                () => handleViewResi(resident.url)
                                            } > { resident.name } < /ListGroup.Item> < /
                                            ListGroup > <
                                            /div>
                                        ))
                                    )
                                } <
                                /div> < /
                                div > <
                                /div> <
                                button type = "button"
                                className = "btn btn-sm btn-outline-secondary detallePla"
                                onClick = {
                                    () => setatras(true)
                                } > < i class = "fa fa-angle-left" > < /i> Volver</button >
                                <
                                /div>
                            ))
                        } <
                        />
                    );
                }