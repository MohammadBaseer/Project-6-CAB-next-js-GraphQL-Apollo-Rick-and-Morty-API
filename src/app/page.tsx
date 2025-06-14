import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <br />
      <br />
      <h2>Homepage</h2>
      <div className={styles.text}>
        <br />
        <h3>I&apos;m learning about rendering styles in Next.js - this page was Statically Rendered by default.</h3>
        <br />
        <h3>The Client Side Characters page is rendered Client-Side and shows a list of Rick and Morty characters. From there, you can click each character to follow a Statically-Generated path, and visit Character page rendering with Static-Site-Generation. I&apos;ve fetched the data for these pages from a REST API.</h3>
        <br />
        <h3>The Server Side Characters page is rendered Server-Side and shows a list of Rick and Morty characters. From there, you can click each character to follow a Statically-Generated path, and visit Character page rendering with Static-Site-Generation. I&apos;ve fetched the data for these pages from a REST API.</h3>
        <br />
        <h3>The Episodes page is rendered Server-Side. I&apos;ve used a filtered GraphQL query to fetch the data. Here is a good article to help you use Graph QL together with the Fetch API.</h3>
        <br />
      </div>
    </main>
  );
}
