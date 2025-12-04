import { Container, Row, Col, Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { addToFavourites, removeFromFavourites } from '@/lib/userData';
import { useState, useEffect } from 'react';

export default function BookDetails(props) {
    const { book, workId, showFavouriteBtn = true } = props;
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [showAdded, setShowAdded] = useState(false);

    useEffect(() => {
        setShowAdded(favouritesList?.includes(workId));
    }, [favouritesList, workId]);

    async function favouritesClicked() {
        if (showAdded) {
            const updatedList = await removeFromFavourites(workId);
            setFavouritesList(updatedList);
            setShowAdded(false);
        } else {
            const updatedList = await addToFavourites(workId);
            setFavouritesList(updatedList);
            setShowAdded(true);
        }
    }

    return (
        <Container>
            <Row>
                <Col lg={4}>
                    <img
                        onError={(event) => {
                            event.target.onerror = null;
                            event.target.src = "https://placehold.co/400x600?text=Cover+Not+Available";
                        }}
                        className="img-fluid w-100"
                        src={`https://covers.openlibrary.org/b/id/${book?.covers?.[0]}-L.jpg`}
                        alt="Cover Image"
                    />
                    <br />
                    <br />
                </Col>
                <Col lg={8}>
                    <h3>{book?.title}</h3>
                    
                    {book?.description && (
                        <p>
                            {typeof book.description === "string" ? book.description : book.description.value}
                        </p>
                    )}
                    
                    <br />
                    
                    {book?.subject_people && book.subject_people.length > 0 && (
                        <>
                            <h5>Characters</h5>
                            {book.subject_people.join(', ')}
                            <br /><br />
                        </>
                    )}
                    
                    {book?.subject_places && book.subject_places.length > 0 && (
                        <>
                            <h5>Settings</h5>
                            {book.subject_places.join(', ')}
                            <br /><br />
                        </>
                    )}
                    
                    {book?.links && book.links.length > 0 && (
                        <>
                            <h5>More Information</h5>
                            {book.links.map((link, index) => (
                                <span key={index}>
                                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                                        {link.title}
                                    </a>
                                    <br />
                                </span>
                            ))}
                            <br />
                        </>
                    )}

                    {showFavouriteBtn && (
                        <Button 
                            variant={showAdded ? "primary" : "outline-primary"}
                            onClick={favouritesClicked}
                        >
                            {showAdded ? "+ Favourite (added)" : "+ Favourite"}
                        </Button>
                    )}
                </Col>
            </Row>
        </Container>
    );
}