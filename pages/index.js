/*********************************************************
 * WEB422 -- Assignment 3
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 *
 * https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 * Name: ______Premkumar Patel_______ Student ID: ____169817236________ Date: ______4 Dec, 2025_________
 *
 * Vercel App (Deployed) Link: ___________https://web422a3-userapi-x6ik.vercel.app/____________________________
 *
 *********************************************************/

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import PageHeader from '@/components/PageHeader';

export default function Home() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();

    function submitForm(data) {
        router.push({
            pathname: '/books',
            query: Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== ''))
        });
    }

    return (
        <>
            <PageHeader 
                text="OpenLibrary Explorer" 
                subtext="Search for books in the OpenLibrary database" 
            />
            
            <Card>
                <Card.Body>
                    <Form onSubmit={handleSubmit(submitForm)}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Author</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter author name"
                                        {...register("author", { required: true })}
                                        className={errors.author ? "is-invalid" : ""}
                                    />
                                    {errors.author && (
                                        <div className="invalid-feedback">Author is required</div>
                                    )}
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter book title"
                                        {...register("title")}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter subject"
                                        {...register("subject")}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Language</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter language (e.g., eng, fre)"
                                        {...register("language")}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>First Publish Year</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        placeholder="Enter year"
                                        {...register("first_publish_year")}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        
                        <Button variant="primary" type="submit">Search</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
}
