import Image from "next/image";
import styles from "./Episodes.module.scss";
import { getClient } from "@/lib/ApolloClient";
import { GETCHARACTERSDATA } from "@/app/queries/characters";
import { EpisodesType } from "@/app/models/custom-types";
import SelectEpisodes from "@/Components/SelectEpisodes/SelectEpisodes";
import EpisodeImage from "@/Components/EpisodeImage/EpisodeImage";

type searchParamsPropsType = {
  searchParams: {
    epi: string;
  };
};

const Episodes = async ({ searchParams: { epi } }: searchParamsPropsType) => {
  const { data } = await getClient().query<EpisodesType>({ query: GETCHARACTERSDATA, variables: { filter: { episode: epi } } });

  return (
    <div>
      <div className={styles.main}>
        <h3>Episodes</h3>
        <br />
        <SelectEpisodes />
        <br />
        <br />
        <div className={styles.data_table}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tr}>
                <th className={styles.th}>#</th>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>Featured Characters</th>
              </tr>
              {data.episodes.results.map((character, index) => {
                return (
                  <tr className={styles.tr} key={character.name}>
                    <td className={styles.td}>{index + 1}</td>
                    <td className={styles.td}>{character.name}</td>
                    <td className={styles.td}>
                      {character.characters.map((img) => {
                        // return <Image src={img.image} width={40} height={40} alt={character.name} priority />;
                        return <EpisodeImage image={img.image} charName={character.name} />;
                      })}
                    </td>
                  </tr>
                );
              })}
            </thead>
          </table>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default Episodes;
