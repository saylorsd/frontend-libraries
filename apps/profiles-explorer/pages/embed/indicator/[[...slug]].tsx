import BlankLayout from '../../../components/BlankLayout';
import IndicatorPageView from '../../../components/IndicatorPageView';

export default function IndicatorPage() {
  return <IndicatorPageView embed />;
}

IndicatorPage.getLayout = function getLayout(page: React.ReactChildren) {
  return <BlankLayout>{page}</BlankLayout>;
};
