import BookDetails from '@/components/BookDetails';
import PageHeader from '@/components/PageHeader';

export default function About(props) {
    return (
        <>
            <PageHeader text="About the Developer" />
            <p>Welcome to my book application! I'm a web development student passionate about creating interactive applications using modern technologies like React and Next.js.</p>
            <p>Below you can see details about one of my favorite books from the Open Library API.</p>
            <BookDetails book={props.book} workId="OL453657W" showFavouriteBtn={false} />
        </>
    );
}

export async function getStaticProps() {
    const response = await fetch("https://openlibrary.org/works/OL453657W.json");
    const data = await response.json();

    return {
        props: {
            book: data
        }
    };
}