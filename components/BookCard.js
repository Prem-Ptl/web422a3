import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import useSWR from 'swr';
import Error from 'next/error';

export default function BookCard(props) {
    const { workId } = props;
    const { data, error } = useSWR(`https://openlibrary.org/works/${workId}.json`);

    if (error) return <Error statusCode={404} />;
    if (!data) return <div>Loading...</div>;

    return (
        <Card>
            <Card.Img 
                variant="top"
                onError={(event) => {
                    event.target.onerror = null;
                    event.target.src = "https://placehold.co/400x600?text=Cover+Not+Available";
                }}
                src={`https://covers.openlibrary.org/b/id/${data?.covers?.[0]}-M.jpg`}
                alt="Cover Image"
            />
            <Card.Body>
                <Card.Title>{data.title || ""}</Card.Title>
                <Card.Text>
                    {data.first_publish_date || "N/A"}
                </Card.Text>
                <Link href={`/works/${workId}`} passHref>
                    <Button variant="primary">View Details</Button>
                </Link>
            </Card.Body>
        </Card>
    );
}