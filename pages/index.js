import Layout from "components/Layout";
import ResourceHighlight from "components/ResourceHighlight";
import Newsletter from "components/Newsletter";
import ResourceList from "components/ResourceList";
import Footer from "components/Footer";

function Home({resources}) {
  
  return (
    <Layout>
      <ResourceHighlight
        resources={resources.slice(0, 2)}
      />
      <Newsletter />
      <ResourceList
        resources={resources.slice(2)}
      />
      <Footer />
    </Layout>
  )
}

// export async function getStaticProps() {

//   const respondData = await fetch("http://localhost:3000/api/resources");
//   const data = await respondData.json();

//   return {
//     props: {
//       resources: data
//     }
//   }
// }

export async function getServerSideProps() {

  const respondData = await fetch("http://localhost:3000/api/resources");
  const data = await respondData.json();

  return {
    props: {
      resources: data
    }
  }
}


export default Home;