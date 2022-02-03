import BlankLayout from '../../../components/BlankLayout';
import DataVizPageView from '../../../components/DataVizPageView';

export default function DataVizPage() {
  return <DataVizPageView embed />;
}

DataVizPage.getLayout = function getLayout(page: React.ReactChildren) {
  return <BlankLayout>{page}</BlankLayout>;
};
