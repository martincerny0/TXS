import InsightPage from "./InsightPage";

export const metadata = {
  title: "Insight | TXS ",
};

export default function Page({ params }: { params: { id: string } }) {
  return <InsightPage id={parseInt(params.id)} />;
}
