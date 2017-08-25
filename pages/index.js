import Link from 'next/link';
import Layout from '../components/layout';
import fetch from 'isomorphic-unfetch'

function PostLink(props) {
  return (
    <div>
      <li>
        <Link as={`/p/${props.show.id}`} href={`/post?id=${props.show.id}`}>
          <a>{props.show.name}</a>
        </Link>
      </li>
      <style jsx>{`
        li {
          list-style: none;
          margin: 5px 0;
        }

        a {
          text-decoration: none;
          color: blue;
          font-family: "Arial";
        }

        a:hover {
          opacity: 0.6;
        }
      `}
      </style>
  </div>
  );
}

function Index(props) {
  return (
    <div>
      <Layout>
        <h1>Batman TV Shows</h1>
        <ul>
          {
            props.data.map( showInfo => {
              let show = showInfo.show;
              return (<PostLink key={show.id} show={show} />);
            })
          }
        </ul>
        <style jsx>{`
          h1 {
            font-family: "Arial";
          }

          ul {
            padding: 0;
          }

        `}
        </style>
      </Layout>
    </div>
  );
}

Index.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return { data };
};

export default Index;
