import { Helmet } from 'react-helmet-async';

const PageTitle = ({ title, isAdmin = false }) => {
  const brandName = 'NabCoffeeShop';

  let fullTitle = '';
  if (isAdmin) {
    fullTitle = title ? `${title} | ${brandName} Admin` : `Admin | ${brandName}`;
  } else {
    fullTitle = title ? `${title} | ${brandName}` : brandName;
  }

  return (
    <Helmet>
      <title>{fullTitle}</title>
    </Helmet>
  );
};

export default PageTitle;
