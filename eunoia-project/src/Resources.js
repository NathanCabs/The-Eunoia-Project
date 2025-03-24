import './Login.scss';
import NavigationBar from './NavigationBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React, { useContext, useState } from 'react';
import { ResourceContext } from './ResourceContext';

function Resources() {
    const { resourceList } = useContext(ResourceContext);
    return(
        <div className="homeBackground" fluid>
            <NavigationBar />
            <Container style={{width:"100%", paddingTop:"1.5rem"}}>
                <Row>
                    <Col style={{paddingBottom:"1.5rem"}}>
                    <h2 className="text-center mb-4" style={{fontFamily:"font2"}}>Resources</h2>
                    </Col>
                </Row>
                <Row>
                    {resourceList.map((resource, index) => (
                        <Col key={index} md={6} lg={4} className="mb-4">
                            <Card className="h-100 shadow-sm">
                                <Card.Body>
                                    <Card.Title style={{fontFamily:"font2"}}>{resource.title}</Card.Title>
                                    <Button 
                                        variant="primary" 
                                        href={resource.mainLink} 
                                        target="_blank"
                                        style={{fontFamily:"font1", width:"auto", marginLeft:"8px", marginTop:"5px"}}
                                        className="button-19"
                                    >
                                        View Resource
                                    </Button>
                                    {resource.subLink && (
                                        <Button 
                                            variant="outline-secondary" 
                                            href={resource.subLink} 
                                            target="_blank" 
                                            className="ms-2 button-20"
                                            style={{fontFamily:"font1", width:"auto", marginTop:"5px"}}
                                        >
                                            More Info
                                        </Button>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
        /*  Show both articles/videos or even external links in this page
            Stuff should only appear based on the category of the user's disorder
        */
    )
}

export default Resources;