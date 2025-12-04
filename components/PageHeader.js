import { Card } from 'react-bootstrap';

export default function PageHeader(props) {
    return (
        <>
            <Card className="bg-light">
                <Card.Body>
                    <strong>{props.text}</strong>
                    {props.subtext && (
                        <>
                            <br />
                            {props.subtext}
                        </>
                    )}
                </Card.Body>
            </Card>
            <br />
        </>
    );
}