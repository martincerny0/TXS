import ChartPage from "./ChartPage";

export async function generateMetadata({ params } : { params: { id: string } }) {
  return { title: `Chart of [asset id = ${params.id} ]` };
}

export default function Page({ params }: { params: { id: string } }) {
  return <ChartPage />;
}
